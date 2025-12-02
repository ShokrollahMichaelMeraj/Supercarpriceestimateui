# Backend Setup Instructions

## Quick Start

### 1. Place Your Model Files

Create a `models` folder in the `/backend` directory and add your trained model files:

```
backend/
├── models/
│   ├── nn_zero_to_sixty.keras    # Your trained Keras model
│   ├── nn_scaler.pkl              # StandardScaler for preprocessing
│   ├── feature_names.pkl          # List of feature names
│   └── feature_info.pkl           # Feature metadata
├── main.py
└── requirements.txt
```

### 2. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

**Dependencies:**
- `fastapi` - Web framework
- `uvicorn[standard]` - ASGI server
- `pydantic` - Data validation
- `tensorflow` - For loading Keras models
- `joblib` - For loading pickle files
- `numpy` - Numerical operations

**Note:** TensorFlow is a large package (~500MB) and may take several minutes to install.

### 3. Start the Server

**Option A: Direct Python**
```bash
python main.py
```

**Option B: Uvicorn (recommended for development)**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The `--reload` flag enables auto-reload when you modify code.

### 4. Verify It's Working

Open your browser and navigate to:
- **Health check:** http://localhost:8000
- **API docs:** http://localhost:8000/docs (interactive Swagger UI)
- **Model info:** http://localhost:8000/model-info

You should see console output like:
```
✓ Found models in: /path/to/backend/models
✓ Model loaded successfully
✓ Expected features: ['Year', 'Horsepower', 'Engine_Size', ...]
INFO:     Uvicorn running on http://0.0.0.0:8000
```

## API Endpoints

### `GET /`
Health check endpoint. Returns server status and model info.

### `POST /predict`
Main prediction endpoint.

**Request body:**
```json
{
  "year": 2020,
  "horsepower": 640,
  "engine_size": 3.8,
  "torque": 590,
  "weight": 3640,           // Optional - omit to auto-estimate
  "drivetrain_rwd": 1,
  "transmission_dct": 1
}
```

**Response:**
```json
{
  "prediction": 2.87,
  "unit": "seconds (0-100 km/h)",
  "power_weight_ratio": 0.1758,
  "torque_weight_ratio": 0.1621,
  "estimated_weight": 3640,
  "features_used": {
    "year": 2020,
    "horsepower": 640,
    "engine_size": 3.8,
    "torque": 590,
    "weight": 3640,
    "weight_estimated": false,
    "power_weight": 0.1758,
    "torque_weight": 0.1621,
    "drivetrain_rwd": true,
    "transmission_dct": true
  }
}
```

### `GET /model-info`
Returns detailed information about the loaded model and expected features.

## Testing the API

### Using curl

```bash
# Health check
curl http://localhost:8000

# Make a prediction with weight
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2020,
    "horsepower": 640,
    "engine_size": 3.8,
    "torque": 590,
    "weight": 3640,
    "drivetrain_rwd": 1,
    "transmission_dct": 1
  }'

# Make a prediction without weight (auto-estimate)
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2021,
    "horsepower": 1020,
    "engine_size": 0,
    "torque": 1050,
    "drivetrain_rwd": 0,
    "transmission_dct": 0
  }'
```

### Using Python

```python
import requests

# Prediction with weight
response = requests.post(
    "http://localhost:8000/predict",
    json={
        "year": 2020,
        "horsepower": 640,
        "engine_size": 3.8,
        "torque": 590,
        "weight": 3640,
        "drivetrain_rwd": 1,
        "transmission_dct": 1
    }
)
print(response.json())

# Prediction without weight
response = requests.post(
    "http://localhost:8000/predict",
    json={
        "year": 2021,
        "horsepower": 1020,
        "engine_size": 0,
        "torque": 1050,
        "drivetrain_rwd": 0,
        "transmission_dct": 0
    }
)
print(response.json())
```

### Using the Interactive Docs

Visit http://localhost:8000/docs for Swagger UI where you can test the API interactively.

## Model Requirements

### File Structure
The backend looks for model files in these locations (in order):
1. `./models/` (in the same directory as main.py)
2. `../models/` (one level up)
3. `../../models/` (two levels up)

### Required Files

1. **nn_zero_to_sixty.keras** - Trained TensorFlow/Keras model
2. **nn_scaler.pkl** - StandardScaler fitted on training data
3. **feature_names.pkl** - List of feature names (for validation)
4. **feature_info.pkl** - Dictionary with:
   - `numeric_features`: List of numerical feature names
   - `binary_features`: List of binary feature names

### Feature Order (Critical!)

The model MUST expect features in this exact order:
1. Year
2. Horsepower
3. Engine_Size
4. Torque
5. Power_Weight (calculated: horsepower / weight)
6. Torque_Weight (calculated: torque / weight)
7. Weight (estimated if not provided)
8. Drivetrain_RWD (binary: 0 or 1)
9. Transmission_DCT (binary: 0 or 1)

**Preprocessing:**
- Features 1-7 are scaled using StandardScaler
- Features 8-9 are NOT scaled (binary values)

## Weight Estimation

If the user doesn't provide a weight, it's estimated using:

```python
weight = horsepower * 5.9  # lbs per hp
```

This ratio is based on training data statistics:
- Mean: 5.88 lbs/hp
- Median: 5.44 lbs/hp

## Troubleshooting

### Error: "Could not find model files"

**Solution:** Create a `models` folder in `/backend/` and place all 4 required files there.

### Error: "No module named 'tensorflow'"

**Solution:**
```bash
pip install tensorflow
```

### Error: "CORS policy blocked"

**Solution:** The backend already has CORS enabled for all origins. If you're still seeing this error:
1. Make sure the backend is running
2. Check that you're using the correct URL: `http://localhost:8000`
3. Clear browser cache

### Predictions seem incorrect

**Possible causes:**
1. Model wasn't trained with the same feature order
2. Wrong scaler applied (should only scale first 7 features)
3. Weight estimation ratio doesn't match training data

**Solution:** Verify your model training code matches the preprocessing in `preprocess_input()`.

### Server won't start on port 8000

**Solution:** Port might be in use. Try a different port:
```bash
uvicorn main:app --reload --port 8001
```

Then update the frontend API URL in `/components/FeatureSlider.tsx`.

## Production Deployment

For production, you'll want to:

1. **Restrict CORS origins:**
   ```python
   allow_origins=["https://yourdomain.com"]
   ```

2. **Use environment variables:**
   ```python
   import os
   PORT = int(os.getenv("PORT", 8000))
   ```

3. **Add proper logging:**
   ```python
   import logging
   logging.basicConfig(level=logging.INFO)
   ```

4. **Use production ASGI server:**
   ```bash
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

5. **Add rate limiting and authentication** as needed

## Support

If you encounter issues:
1. Check that all 4 model files are present and named correctly
2. Verify Python version (3.8+ recommended)
3. Check console output for detailed error messages
4. Visit http://localhost:8000/docs for interactive API testing

Happy predicting! 🏎️💨
