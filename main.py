from fastapi import FastAPI, Form, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid
import os
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

babysitters_db = []
parents_db = []
payments_db = []

def save_file(file: UploadFile | None):
    if not file:
        return ""
    file_id = f"{uuid.uuid4()}_{file.filename}"
    path = os.path.join(UPLOAD_DIR, file_id)
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return path

@app.get("/api/health")
def health():
    return {"ok": True}

@app.get("/api/babysitters")
def list_babysitters():
    approved = [b for b in babysitters_db if b.get("approval_status") == "approved"]
    return approved

@app.get("/api/admin/payments")
def list_payments():
    return payments_db

@app.post("/api/signup/start-payment")
async def signup(
    role: str = Form(...),
    amount: int = Form(...),
    currency: str = Form(...),
    paymentStatus: str = Form(...),
    fullName: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    parish: str = Form(...),
    agree: str = Form(...),
    experience: str | None = Form(None),
    serviceType: str | None = Form(None),
    availability: str | None = Form(None),
    hours: str | None = Form(None),
    preferredAgeGroup: str | None = Form(None),
    hourlyRate: str | None = Form(None),
    bio: str | None = Form(None),
    governmentId: UploadFile | None = File(None),
    policeRecord: UploadFile | None = File(None)
):
    user_id = str(uuid.uuid4())

    if role == "babysitter":
        babysitters_db.append({
            "id": user_id,
            "role": "babysitter",
            "full_name": fullName,
            "phone": phone,
            "email": email,
            "parish": parish,
            "experience": experience or "",
            "service_type": serviceType or "",
            "availability": availability or "",
            "hours": hours or "",
            "preferred_age_group": preferredAgeGroup or "",
            "hourly_rate": hourlyRate or "",
            "bio": bio or "",
            "government_id": save_file(governmentId),
            "police_record": save_file(policeRecord),
            "payment_status": "pending_payment",
            "approval_status": "pending_payment",
        })
    elif role == "parent":
        parents_db.append({
            "id": user_id,
            "role": "parent",
            "full_name": fullName,
            "phone": phone,
            "email": email,
            "parish": parish,
            "payment_status": "pending_payment",
            "access_status": "pending_payment",
        })
    else:
        raise HTTPException(status_code=400, detail="Invalid role.")

    payment_url = f"http://localhost:3000/payment?ref={user_id}&role={role}"

    return {
        "paymentUrl": payment_url
    }

@app.post("/api/payments/submit-proof")
async def submit_payment_proof(
    reference: str = Form(...),
    role: str = Form(...),
    payerName: str = Form(...),
    transactionId: str = Form(...),
    datePaid: str = Form(...),
    proofImage: UploadFile | None = File(None)
):
    proof_path = save_file(proofImage)

    payments_db.append({
        "id": str(uuid.uuid4()),
        "reference": reference,
        "role": role,
        "payer_name": payerName,
        "transaction_id": transactionId,
        "date_paid": datePaid,
        "proof_image": proof_path,
        "status": "submitted",
    })

    if role == "babysitter":
        for b in babysitters_db:
            if b["id"] == reference:
                b["payment_status"] = "payment_submitted"
                b["approval_status"] = "payment_submitted"
                break

    elif role == "parent":
        for p in parents_db:
            if p["id"] == reference:
                p["payment_status"] = "payment_submitted"
                p["access_status"] = "payment_submitted"
                break

    return {"ok": True, "message": "Proof of payment submitted."}

@app.post("/api/admin/confirm-payment/{reference}")
def confirm_payment(reference: str):
    payment = next((p for p in payments_db if p["reference"] == reference), None)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found.")

    payment["status"] = "verified"

    if payment["role"] == "babysitter":
        for b in babysitters_db:
            if b["id"] == reference:
                b["payment_status"] = "verified"
                b["approval_status"] = "approved"
                return {"ok": True, "message": "Babysitter payment confirmed and approved."}

    elif payment["role"] == "parent":
        for p in parents_db:
            if p["id"] == reference:
                p["payment_status"] = "verified"
                p["access_status"] = "active"
                return {"ok": True, "message": "Parent payment confirmed and access activated."}

    raise HTTPException(status_code=404, detail="User record not found.")