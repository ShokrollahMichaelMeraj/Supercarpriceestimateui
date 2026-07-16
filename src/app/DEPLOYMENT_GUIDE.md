# Deployment Guide: Connecting Your ML Models

## Overview
Your FastAPI backend is ready to use! Follow these steps to deploy your machine learning models and enable live predictions.

## Prerequisites
- Python 3.8+
- Your trained model files from GitHub

## Step 1: Set Up the Backend Environment

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install required dependencies
pip install -r requirements.txt
```

## Step 2: Add Your Model Files

Place the following files from your GitHub repository into `/backend/models/`:

1. **nn_zero_to_sixty.keras** - Your trained TensorFlow/Keras neural network
2. **nn_scaler.pkl** - StandardScaler for feature preprocessing
3. **feature_names.pkl** - List of feature names in correct order
4. **feature_info.pkl** - Dictionary with feature metadata

Your directory structure should look like:
```
backend/
├── models/
│   ├── nn_zero_to_sixty.keras
│   ├── nn_scaler.pkl
│   ├── feature_names.pkl
│   └── feature_info.pkl
├── main.py
└── requirements.txt
```

## Step 3: Start the FastAPI Server

```bash
# From the backend directory
python main.py

# Or use uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

You should see output like:
```
Loading model and preprocessing artifacts...
✓ Found models in: /path/to/backend/models
✓ Model loaded successfully
✓ Expected features: ['Year', 'Horsepower', 'Engine_Size', 'Torque', 'Power_Weight', 'Torque_Weight', 'Weight', 'Drivetrain_RWD', 'Transmission_DCT']
INFO:     Uvicorn running on http://0.0.0.0:8000
```

## Step 4: Test the API

### Test 1: Health Check
```bash
curl http://localhost:8000/
```

Expected response:
```json
{
  "status": "running",
  "message": "Car Acceleration Predictor API",
  "model_loaded": true,
  "expected_features": ["Year", "Horsepower", "Engine_Size", "Torque", "Power_Weight", "Torque_Weight", "Weight", "Drivetrain_RWD", "Transmission_DCT"]
}
```

### Test 2: Make a Prediction
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2020,
    "horsepower": 450,
    "engine_size": 3.0,
    "torque": 400,
    "weight": 3500,
    "drivetrain_rwd": 1,
    "transmission_dct": 1
  }'
```

Expected response:
```json
{
  "prediction": 3.45,
  "unit": "seconds (0-100 km/h)",
  "power_weight_ratio": 0.1286,
  "torque_weight_ratio": 0.1143,
  "estimated_weight": 3500,
  "features_used": {
    "year": 2020,
    "horsepower": 450,
    "engine_size": 3.0,
    "torque": 400,
    "weight": 3500,
    "weight_estimated": false,
    "power_weight": 0.1286,
    "torque_weight": 0.1143,
    "drivetrain_rwd": true,
    "transmission_dct": true
  }
}
```

### Test 3: Get Model Info
```bash
curl http://localhost:8000/model-info
```

## Step 5: Connect Frontend to Backend

The React frontend in this project is already configured to connect to the backend at `http://localhost:8000`. 

Once your backend is running:
1. Start the React application (if not already running)
2. Navigate to the home page
3. Scroll to "Configure Your Supercar" section
4. Adjust the sliders and click "Predict 0-100 km/h Time"
5. The prediction will appear below in the orange gradient card

## API Endpoints

### `GET /`
Health check endpoint. Returns API status and model information.

### `POST /predict`
Make a prediction for a car's 0-100 km/h time.

**Request Body:**
```json
{
  "year": 2020,           // Car year (1990-2025)
  "horsepower": 500,      // Horsepower (100-1500)
  "engine_size": 4.0,     // Engine size in liters (1.0-10.0)
  "torque": 500,          // Torque in lb-ft (100-1500)
  "weight": 3500,         // Weight in lbs (2000-7000) - REQUIRED
  "drivetrain_rwd": 1,    // 1 for RWD, 0 for FWD/AWD (default: 0)
  "transmission_dct": 1   // 1 for DCT, 0 for Auto (default: 0)
}
```

**Response:**
```json
{
  "prediction": 3.45,
  "unit": "seconds (0-100 km/h)",
  "power_weight_ratio": 0.1286,
  "torque_weight_ratio": 0.1143,
  "estimated_weight": 3500,
  "features_used": { ... }
}
```

### `GET /model-info`
Get detailed information about the loaded model and its features.

## Feature Calculation Details

The backend automatically calculates:
- **Power_Weight**: horsepower / weight
- **Torque_Weight**: torque / weight

These ratios are key features for the ML model but don't need to be provided by the frontend.

## Troubleshooting

### Error: "Could not find model files"
- Ensure all 4 model files are in `/backend/models/`
- Check file names match exactly (case-sensitive)

### Error: "Connection refused" in frontend
- Make sure the backend is running on port 8000
- Check that CORS is properly configured (already done in main.py)
- Verify the frontend is pointing to `http://localhost:8000`

### Error: "Prediction failed"
- Check that all required fields are provided
- Verify input values are within reasonable ranges
- Review backend logs for detailed error messages

## Production Deployment

For production deployment, you'll need to:

1. **Update CORS settings** in `/backend/main.py`:
   ```python
   allow_origins=["https://your-frontend-domain.com"]
   ```

2. **Use environment variables** for configuration
3. **Deploy backend** to a cloud service (AWS, GCP, Azure, Heroku, Railway, etc.)
4. **Update frontend API URL** in `/components/FeatureSlider.tsx`:
   ```typescript
   const response = await fetch("https://your-api-domain.com/predict", {
   ```

5. **Consider adding**:
   - API rate limiting
   - Authentication/API keys
   - Request validation
   - Monitoring and logging
   - Load balancing

## Next Steps

Once everything is working locally:
1. ✅ Test with various car configurations
2. ✅ Verify predictions match expectations
3. ✅ Plan production deployment strategy
4. ✅ Add monitoring and error tracking
5. ✅ Consider caching frequently requested predictions

## Support

For issues or questions:
- Email: mmeraj@sfu.ca
- Phone: +1 (604) 345-3598
- Location: Vancouver, British Columbia, Canada
