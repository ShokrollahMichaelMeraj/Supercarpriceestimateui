# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np

app = FastAPI()

# Load your trained model when the server starts
try:
    model = pickle.load(open('model.pkl', 'rb'))
    print("✅ Model loaded successfully!")
except FileNotFoundError:
    print("⚠️  WARNING: model.pkl not found. Using dummy model.")
    model = None

# Load scaler if you used one (optional)
try:
    scaler = pickle.load(open('scaler.pkl', 'rb'))
    print("✅ Scaler loaded successfully!")
except FileNotFoundError:
    print("ℹ️  No scaler.pkl found (this is fine if you didn't use scaling)")
    scaler = None

# Allow your frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict this later to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define what data we expect from the frontend
class CarSpecs(BaseModel):
    year: int
    horsepower: float
    engine_size: float
    torque: float
    power_weight: float
    torque_weight: float
    drivetrain_awd: int  # 0 or 1
    drivetrain_rwd: int  # 0 or 1
    transmission_dct: int  # 0 or 1
    transmission_auto: int  # 0 or 1

@app.post("/api/predict")
def predict_0_60(specs: CarSpecs):
    """
    Predicts 0-60 time using the trained ML model
    """
    
    if model is None:
        # Fallback to dummy model if real model not found
        # Simple physics-based estimation
        power_to_weight = specs.power_weight
        base_time = 15.0
        
        # Better power-to-weight ratio = faster acceleration
        time_adjustment = power_to_weight * 12
        
        # AWD typically accelerates faster
        if specs.drivetrain_awd == 1:
            time_adjustment += 0.5
        
        # DCT shifts faster than manual
        if specs.transmission_dct == 1:
            time_adjustment += 0.3
        
        predicted = max(2.0, base_time - time_adjustment)
        return {"predicted_0_60_time": round(predicted, 2)}
    
    # Prepare features in the EXACT ORDER as your training data
    # ⚠️ CRITICAL: This order must match your model's training feature order!
    features = np.array([[
        specs.year,
        specs.horsepower,
        specs.engine_size,
        specs.torque,
        specs.power_weight,
        specs.torque_weight,
        specs.drivetrain_awd,
        specs.drivetrain_rwd,
        specs.transmission_dct,
        specs.transmission_auto
    ]])
    
    # Apply scaling if you used it during training
    if scaler is not None:
        features = scaler.transform(features)
    
    # Make prediction
    prediction = model.predict(features)[0]
    
    # Return result
    return {"predicted_0_60_time": round(float(prediction), 2)}

@app.get("/")
def read_root():
    """Health check endpoint"""
    return {
        "status": "running",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None,
        "message": "Supercar 0-60 Prediction API"
    }
