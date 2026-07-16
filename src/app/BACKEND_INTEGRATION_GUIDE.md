# Backend Integration Guide

## Overview

This guide explains how to connect your machine learning model to the frontend application.

## Architecture

```
┌─────────────┐      HTTP POST      ┌─────────────┐      ML Model      ┌──────────────┐
│   Frontend  │  ────────────────►  │   Backend   │  ─────────────────► │  Prediction  │
│   (React)   │                     │   (API)     │                     │   (0-60 sec) │
└─────────────┘  ◄────────────────  └─────────────┘  ◄─────────────────  └──────────────┘
                   JSON Response
```

## Data Flow

### 1. User Input (Frontend)
User adjusts sliders and clicks "Predict 0-60 Time" button.

### 2. API Request (Frontend → Backend)
The frontend sends a POST request with the following JSON:

```json
{
  "year": 2020,
  "mileage": 20000,
  "engine": 4.0,
  "cylinders": 8,
  "horsepower": 500,
  "modifications": "stock",
  "topspeed": 280,
  "weight": 1500
}
```

### 3. ML Prediction (Backend)
Your backend receives the data, feeds it to your ML model, and gets a prediction.

### 4. API Response (Backend → Frontend)
The backend returns:

```json
{
  "predicted_0_60_time": 3.5,
  "unit": "seconds"
}
```

### 5. Display Result (Frontend)
The prediction is displayed in the red gradient card below the sliders.

---

## Backend Setup Options

### Option 1: Python with FastAPI (Recommended for ML)

**Install dependencies:**
```bash
cd backend
pip install -r requirements.txt
# For ML models, also install:
pip install scikit-learn numpy pandas
```

**Create `backend/main.py`:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle  # or joblib for loading your model

app = FastAPI()

# CORS - Allow frontend to make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Local development
        "https://yourdomain.com"  # Production domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your trained ML model
# model = pickle.load(open('model.pkl', 'rb'))

class CarSpecs(BaseModel):
    year: int
    mileage: int
    engine: float
    cylinders: int
    horsepower: int
    modifications: str
    topspeed: int
    weight: int

@app.post("/api/predict")
async def predict_0_60(specs: CarSpecs):
    """
    Endpoint to predict 0-60 time based on car specifications
    """
    
    # Prepare features for your model
    features = [
        specs.year,
        specs.mileage,
        specs.engine,
        specs.cylinders,
        specs.horsepower,
        # You may need to encode modifications (e.g., one-hot encoding)
        # Example: 0 for stock, 1 for supercharged, etc.
        encode_modification(specs.modifications),
        specs.topspeed,
        specs.weight
    ]
    
    # Make prediction using your trained model
    # prediction = model.predict([features])[0]
    
    # For testing, return a mock value
    prediction = 3.5  # Replace with: prediction = model.predict([features])[0]
    
    return {
        "predicted_0_60_time": float(prediction),
        "unit": "seconds"
    }

def encode_modification(mod: str) -> int:
    """
    Convert modification string to numeric value for ML model
    Adjust this based on how you trained your model
    """
    encoding = {
        "stock": 0,
        "supercharged": 1,
        "turbocharged": 2,
        "vspec": 3,
        "track": 4,
        "nismo": 5
    }
    return encoding.get(mod, 0)

@app.get("/")
async def root():
    return {"message": "0-60 Prediction API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

**Run the backend:**
```bash
uvicorn main:app --reload --port 8000
```

### Option 2: Python with Flask

**Install dependencies:**
```bash
pip install flask flask-cors scikit-learn numpy pandas
```

**Create `backend/app.py`:**
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load your model
# model = pickle.load(open('model.pkl', 'rb'))

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # Extract features
    features = [
        data['year'],
        data['mileage'],
        data['engine'],
        data['cylinders'],
        data['horsepower'],
        encode_modification(data['modifications']),
        data['topspeed'],
        data['weight']
    ]
    
    # Make prediction
    # prediction = model.predict([features])[0]
    prediction = 3.5  # Mock value for testing
    
    return jsonify({
        'predicted_0_60_time': float(prediction),
        'unit': 'seconds'
    })

def encode_modification(mod):
    encoding = {
        'stock': 0,
        'supercharged': 1,
        'turbocharged': 2,
        'vspec': 3,
        'track': 4,
        'nismo': 5
    }
    return encoding.get(mod, 0)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
```

**Run the backend:**
```bash
python app.py
```

### Option 3: Node.js with Express

**Install dependencies:**
```bash
npm install express cors body-parser
```

**Create `backend/server.js`:**
```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// You would integrate your ML model here
// For Python models in Node.js, consider using child_process to call Python script

app.post('/api/predict', async (req, res) => {
  const {
    year,
    mileage,
    engine,
    cylinders,
    horsepower,
    modifications,
    topspeed,
    weight
  } = req.body;

  // Call your ML model here
  // For now, return a mock prediction
  const prediction = 3.5;

  res.json({
    predicted_0_60_time: prediction,
    unit: 'seconds'
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
```

**Run the backend:**
```bash
node server.js
```

---

## Frontend Configuration

### Update API Endpoint URL

The frontend is currently configured to call:
```
http://localhost:8000/api/predict
```

To change this, edit `/components/FeatureSlider.tsx` at line ~70:

```typescript
const response = await fetch('http://localhost:8000/api/predict', {
  // Change the URL above to your backend URL
```

### For Production

Create an environment variable:

**`.env`:**
```
VITE_API_URL=https://your-backend-domain.com
```

**Update FeatureSlider.tsx:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const response = await fetch(`${API_URL}/api/predict`, {
  // ...
});
```

---

## Testing the Integration

### 1. Test Backend Independently

**Test with curl:**
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

Expected response:
```json
{
  "predicted_0_60_time": 3.5,
  "unit": "seconds"
}
```

### 2. Test with Frontend

1. Start your backend server
2. Start your frontend: `npm run dev`
3. Open the app in browser
4. Adjust the sliders
5. Click "Predict 0-60 Time"
6. The prediction should appear in the red card below

---

## Common Issues & Solutions

### Issue: CORS Error

**Error:** "Access to fetch at 'http://localhost:8000/api/predict' from origin 'http://localhost:5173' has been blocked by CORS policy"

**Solution:** Make sure your backend has CORS enabled (see backend examples above).

### Issue: Connection Refused

**Error:** "Failed to fetch" or "Connection refused"

**Solution:** 
- Ensure backend is running
- Check the port number matches (default: 8000)
- Verify the URL in FeatureSlider.tsx

### Issue: 404 Not Found

**Error:** "POST http://localhost:8000/api/predict 404 (Not Found)"

**Solution:**
- Check the endpoint path in your backend code
- Ensure the route is `/api/predict` exactly

---

## Deployment

### Backend Deployment Options

1. **Heroku** (easiest for Python)
   - Push your backend code to Heroku
   - Update frontend API URL to Heroku domain

2. **AWS Lambda + API Gateway** (serverless)
   - Deploy ML model as Lambda function
   - Use API Gateway for HTTP endpoint

3. **Google Cloud Run** (containerized)
   - Containerize your backend with Docker
   - Deploy to Cloud Run

4. **Railway / Render** (simple deployment)
   - Connect your GitHub repo
   - Auto-deploy on push

### Update Frontend for Production

1. Set production API URL in `.env`:
   ```
   VITE_API_URL=https://your-backend.herokuapp.com
   ```

2. Rebuild frontend:
   ```bash
   npm run build
   ```

---

## ML Model Considerations

### Feature Engineering

Make sure your model expects features in this order:
1. year (int)
2. mileage (int, in km)
3. engine (float, in liters)
4. cylinders (int)
5. horsepower (int)
6. modifications (encoded as int)
7. topspeed (int, in km/h)
8. weight (int, in kg)

### Modifications Encoding

You'll need to encode the modification type. Example:
- stock → 0
- supercharged → 1
- turbocharged → 2
- vspec → 3
- track → 4
- nismo → 5

Or use one-hot encoding if that's how you trained your model.

### Preprocessing

If your model requires feature scaling (StandardScaler, MinMaxScaler, etc.), make sure to apply the same preprocessing in your backend before prediction.

---

## Next Steps

1. ✅ Train your ML model
2. ✅ Save the model (pickle/joblib)
3. ✅ Create backend API (FastAPI/Flask)
4. ✅ Test API with curl or Postman
5. ✅ Frontend is already configured
6. ✅ Test end-to-end integration
7. ✅ Deploy backend to cloud
8. ✅ Update frontend with production URL
9. ✅ Deploy frontend

---

## Support

If you encounter issues:
- Check browser console for frontend errors
- Check backend logs for server errors
- Verify CORS is enabled
- Test API endpoint with curl/Postman first
- Ensure model file is loaded correctly

Good luck with your ML model! 🚀
