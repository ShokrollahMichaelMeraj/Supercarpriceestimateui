"""
FastAPI backend for car acceleration predictions
Uses your trained neural network model
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import numpy as np
import joblib
from tensorflow import keras
import os

app = FastAPI(title="Car Acceleration Predictor API")

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure model paths
# Try multiple possible paths for model files
MODEL_PATHS = [
    './models',           # Same directory
    '../models',          # One level up
    '../../models',       # Two levels up
    './nn_zero_to_sixty.keras',  # Current directory
]

def find_model_files():
    """Find the models directory or files"""
    for base_path in MODEL_PATHS:
        if os.path.isdir(base_path):
            model_file = os.path.join(base_path, 'nn_zero_to_sixty.keras')
            if os.path.exists(model_file):
                return base_path
        elif os.path.exists(base_path):  # Direct file path
            return os.path.dirname(base_path) if os.path.dirname(base_path) else '.'
    return None

# Load model and preprocessing artifacts
print("Loading model and preprocessing artifacts...")
try:
    models_dir = find_model_files()
    
    if models_dir is None:
        raise FileNotFoundError(
            "Could not find model files. Please ensure your models are in one of:\n" +
            "\n".join(f"  - {path}" for path in MODEL_PATHS)
        )
    
    print(f"✓ Found models in: {os.path.abspath(models_dir)}")
    
    model = keras.models.load_model(os.path.join(models_dir, 'nn_zero_to_sixty.keras'))
    scaler = joblib.load(os.path.join(models_dir, 'nn_scaler.pkl'))
    feature_names = joblib.load(os.path.join(models_dir, 'feature_names.pkl'))
    feature_info = joblib.load(os.path.join(models_dir, 'feature_info.pkl'))
    
    print(f"✓ Model loaded successfully")
    print(f"✓ Expected features: {feature_names}")
except Exception as e:
    print(f"\n❌ ERROR: Could not load model artifacts")
    print(f"   {e}")
    print(f"\n📁 Current directory: {os.getcwd()}")
    print(f"\n💡 Solution: Create a 'models' folder in your current directory")
    print(f"   and place these files in it:")
    print(f"   - nn_zero_to_sixty.keras")
    print(f"   - nn_scaler.pkl")
    print(f"   - feature_names.pkl")
    print(f"   - feature_info.pkl")
    raise

class CarInput(BaseModel):
    """Input features for car acceleration prediction"""
    # Numerical features
    year: float = Field(..., description="Car year (e.g., 2020)")
    horsepower: float = Field(..., description="Horsepower (hp)")
    engine_size: float = Field(..., description="Engine size in liters")
    torque: float = Field(..., description="Torque (lb-ft)")
    weight: float = Field(..., description="Weight in lbs")
    
    # Binary features
    drivetrain_rwd: int = Field(0, description="1 if RWD, 0 otherwise")
    transmission_dct: int = Field(0, description="1 if DCT, 0 otherwise")
    
    class Config:
        json_schema_extra = {
            "example": {
                "year": 2020,
                "horsepower": 450,
                "engine_size": 3.0,
                "torque": 400,
                "weight": 3500,
                "drivetrain_rwd": 1,
                "transmission_dct": 1
            }
        }

class PredictionResponse(BaseModel):
    """Response with prediction and feature values"""
    prediction: float
    unit: str = "seconds"
    power_weight_ratio: float
    torque_weight_ratio: float
    estimated_weight: float
    features_used: dict

def preprocess_input(data: CarInput) -> np.ndarray:
    """
    Preprocess input data exactly as done during training:
    1. Use provided weight (required field)
    2. Calculate derived features (Power_Weight, Torque_Weight)
    3. Order features correctly
    4. Scale only numerical features
    5. Concatenate with binary features
    """
    # Use provided weight (always required)
    weight = data.weight
    
    # Calculate derived features
    power_weight = data.horsepower / weight
    torque_weight = data.torque / weight
    
    # Build feature array in correct order matching training
    # Order from saved model: Year, Horsepower, Engine_Size, Torque, Power_Weight, 
    #                         Torque_Weight, Weight, Drivetrain_RWD, Transmission_DCT
    
    numerical_features = np.array([
        data.year,
        data.horsepower,
        data.engine_size,
        data.torque,
        power_weight,
        torque_weight,
        weight  # Weight is LAST in the numerical features!
    ]).reshape(1, -1)
    
    binary_features = np.array([
        data.drivetrain_rwd,
        data.transmission_dct
    ]).reshape(1, -1)
    
    # Scale only numerical features
    numerical_scaled = scaler.transform(numerical_features)
    
    # Concatenate scaled numerical + binary
    features = np.concatenate([numerical_scaled, binary_features], axis=1)
    
    return features, power_weight, torque_weight, weight

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "running",
        "message": "Car Acceleration Predictor API",
        "model_loaded": model is not None,
        "expected_features": feature_names
    }

@app.post("/predict")
async def predict(car: CarInput):
    """
    Predict 0-100 km/h acceleration time for a car
    """
    try:
        # Preprocess input
        features, pw_ratio, tw_ratio, weight = preprocess_input(car)
        
        # Make prediction
        prediction = model.predict(features, verbose=0)[0][0]
        
        # Ensure prediction is positive and reasonable
        prediction = max(float(prediction), 0.5)
        
        return PredictionResponse(
            prediction=round(prediction, 2),
            unit="seconds (0-100 km/h)",
            power_weight_ratio=round(pw_ratio, 4),
            torque_weight_ratio=round(tw_ratio, 4),
            estimated_weight=round(weight, 0),
            features_used={
                "year": car.year,
                "horsepower": car.horsepower,
                "engine_size": car.engine_size,
                "torque": car.torque,
                "weight": round(weight, 0),
                "weight_estimated": False,
                "power_weight": round(pw_ratio, 4),
                "torque_weight": round(tw_ratio, 4),
                "drivetrain_rwd": bool(car.drivetrain_rwd),
                "transmission_dct": bool(car.transmission_dct)
            }
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )

@app.get("/model-info")
async def model_info():
    """Get information about the loaded model"""
    return {
        "model_type": "Neural Network (Keras Sequential)",
        "expected_features": feature_names,
        "feature_count": len(feature_names),
        "numerical_features": feature_info['numeric_features'],
        "binary_features": feature_info['binary_features'],
        "target": "Acceleration_0_100 (seconds)",
        "note": "All features including weight are required"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
