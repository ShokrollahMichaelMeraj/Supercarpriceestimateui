# Backend - 0-60 Prediction API

FastAPI backend for the supercar 0-60 prediction tool.

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Server

```bash
uvicorn main:app --reload --port 8000
```

### 3. Test the API

Visit: `http://localhost:8000/docs`

Or use curl:

```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2020,
    "mileage": 20000,
    "engine": 4.0,
    "cylinders": 8,
    "horsepower": 500,
    "modifications": "stock",
    "topspeed": 280,
    "weight": 1500
  }'
```

## API Endpoint

### POST `/api/predict`

Predicts 0-60 time based on car specifications.

**Request Body:**
```json
{
  "year": 2020,
  "mileage": 20000.0,
  "engine": 4.0,
  "cylinders": 8,
  "horsepower": 500.0,
  "modifications": "stock",
  "topspeed": 280.0,
  "weight": 1500.0
}
```

**Response:**
```json
{
  "predicted_0_60_time": 3.45
}
```

## Current Implementation

The current `main.py` contains a **dummy model** that uses a simple formula:

```python
base_time = 10.0
time_adjustment = (
    (specs.horsepower / specs.weight) * 5
    + (2025 - specs.year) * 0.02
    - (specs.topspeed / 1000)
)
predicted = max(2.0, base_time - time_adjustment)
```

This is just for testing the connection. Replace it with your trained ML model.

## Integrating Your ML Model

### 1. Save Your Trained Model

```python
import pickle
# After training your model:
pickle.dump(model, open('model.pkl', 'wb'))
pickle.dump(scaler, open('scaler.pkl', 'wb'))  # if you use scaling
```

### 2. Load Model in main.py

```python
import pickle

# At the top of main.py, after imports
model = pickle.load(open('model.pkl', 'rb'))
scaler = pickle.load(open('scaler.pkl', 'rb'))  # if needed
```

### 3. Update the Prediction Function

```python
@app.post("/api/predict")
def predict_0_60(specs: CarSpecs):
    # Prepare features in the same order as training
    features = [[
        specs.year,
        specs.mileage,
        specs.engine,
        specs.cylinders,
        specs.horsepower,
        encode_modification(specs.modifications),  # if using encoding
        specs.topspeed,
        specs.weight
    ]]
    
    # Apply scaling if used during training
    # features_scaled = scaler.transform(features)
    
    # Make prediction
    prediction = model.predict(features)[0]
    
    return {"predicted_0_60_time": round(float(prediction), 2)}

def encode_modification(mod: str) -> int:
    """Convert modification string to numeric value"""
    encoding = {
        "stock": 0,
        "supercharged": 1,
        "turbocharged": 2,
        "vspec": 3,
        "track": 4,
        "nismo": 5
    }
    return encoding.get(mod, 0)
```

## Dependencies

- **fastapi** - Web framework for building APIs
- **uvicorn[standard]** - ASGI server to run FastAPI
- **pydantic** - Data validation using Python type annotations

For ML models, also install:
```bash
pip install scikit-learn numpy pandas
# or
pip install tensorflow
# or
pip install torch
```

## CORS Configuration

The backend is configured to allow all origins:

```python
allow_origins=["*"]
```

For production, change this to your specific domain:

```python
allow_origins=[
    "https://yourdomain.com",
    "https://www.yourdomain.com"
]
```

## Deployment

See `STARTUP_INSTRUCTIONS.md` for deployment options including:
- Heroku
- Railway
- Render
- AWS Lambda

## File Structure

```
backend/
├── main.py            # FastAPI application
├── requirements.txt   # Python dependencies
├── README.md         # This file
└── model.pkl         # Your trained ML model (add this later)
```

## Testing

### Interactive API Docs

Visit `http://localhost:8000/docs` for Swagger UI documentation where you can test the API interactively.

### Alternative Docs

Visit `http://localhost:8000/redoc` for ReDoc-style documentation.

## Environment Variables (Optional)

For production, you can use environment variables:

```python
import os

PORT = int(os.getenv("PORT", 8000))
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    ...
)
```

Then run with:
```bash
PORT=8000 ALLOWED_ORIGINS="https://yourdomain.com" uvicorn main:app
```

## Support

For more information, see:
- `BACKEND_INTEGRATION_GUIDE.md` - Full integration guide
- `STARTUP_INSTRUCTIONS.md` - Development workflow
- FastAPI docs: https://fastapi.tiangolo.com
