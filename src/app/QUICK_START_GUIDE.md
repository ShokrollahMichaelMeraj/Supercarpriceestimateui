# 🚀 Quick Start Guide - Supercar 0-60 Predictor

## 📋 Prerequisites Checklist

- [ ] Python 3.8+ installed
- [ ] Node.js/npm installed (for frontend - if not using Figma Make)
- [ ] Your trained model files ready:
  - `nn_zero_to_sixty.keras`
  - `nn_scaler.pkl`
  - `feature_names.pkl`
  - `feature_info.pkl`

## ⚡ 3-Step Setup

### 1️⃣ Place Model Files (30 seconds)

```bash
# Create models folder
mkdir backend/models

# Copy your 4 model files into it
cp /path/to/your/models/* backend/models/
```

**Expected structure:**
```
backend/
  models/
    ✓ nn_zero_to_sixty.keras
    ✓ nn_scaler.pkl
    ✓ feature_names.pkl
    ✓ feature_info.pkl
```

### 2️⃣ Install & Run Backend (2-3 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies (TensorFlow may take a few minutes)
pip install -r requirements.txt

# Start the server
python main.py
```

**You should see:**
```
✓ Found models in: /path/to/backend/models
✓ Model loaded successfully
✓ Expected features: ['Year', 'Horsepower', ...]
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 3️⃣ Use the Frontend (Ready!)

The frontend is already configured and ready to use. Just make sure the backend is running on `http://localhost:8000`.

## 🎯 Quick Test

### Test 1: Health Check
```bash
curl http://localhost:8000
```

**Expected:**
```json
{
  "status": "running",
  "message": "Car Acceleration Predictor API",
  "model_loaded": true,
  "expected_features": [...]
}
```

### Test 2: Make a Prediction
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2020,
    "horsepower": 640,
    "engine_size": 3.8,
    "torque": 590,
    "drivetrain_rwd": 1,
    "transmission_dct": 1
  }'
```

**Expected:**
```json
{
  "prediction": 2.87,
  "unit": "seconds (0-100 km/h)",
  "power_weight_ratio": 0.1695,
  "torque_weight_ratio": 0.1563,
  "estimated_weight": 3776.0,
  "features_used": {
    "weight_estimated": true,
    ...
  }
}
```

### Test 3: Use the UI

1. Open the frontend application
2. Adjust the sliders:
   - Year: 2020
   - Horsepower: 640
   - Engine Size: 3.8L
   - Torque: 590 lb-ft
   - Drivetrain: RWD
   - Transmission: DCT
3. Click "Predict 0-100 km/h Time"
4. See results with calculated ratios!

## 🎨 UI Features

### Optional Weight Input
- **By default:** Weight is auto-estimated from horsepower
- **To specify manually:** Click "Specify weight manually"
- **To auto-estimate again:** Click "Auto-estimate instead"

### Understanding Results

```
┌─────────────────────────────────────┐
│  Predicted 0-100 km/h Time          │
│         2.87 seconds                │
├─────────────────────────────────────┤
│ Power/Weight    │ Torque/Weight     │
│ 0.1695 hp/lb    │ 0.1563 lb-ft/lb   │
├─────────────────┼───────────────────┤
│ Estimated Wt    │ Configuration     │
│ 3,776 lbs ⓘ     │ RWD + DCT         │
└─────────────────────────────────────┘
```

**ⓘ Indicator meanings:**
- "Estimated Weight" = Weight was auto-calculated
- "Actual Weight" = Weight was provided by user

## 🔧 API Reference

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/predict` | Make prediction |
| GET | `/model-info` | Model details |
| GET | `/docs` | Interactive API docs |

### Request Format

**Minimal (auto-estimate weight):**
```json
{
  "year": 2020,
  "horsepower": 640,
  "engine_size": 3.8,
  "torque": 590,
  "drivetrain_rwd": 1,
  "transmission_dct": 1
}
```

**With weight specified:**
```json
{
  "year": 2020,
  "horsepower": 640,
  "engine_size": 3.8,
  "torque": 590,
  "weight": 3640,
  "drivetrain_rwd": 1,
  "transmission_dct": 1
}
```

### Response Format

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

## ❓ Troubleshooting

### Backend won't start

**Error:** `ModuleNotFoundError: No module named 'tensorflow'`
```bash
pip install tensorflow
```

**Error:** `Could not find model files`
```bash
# Check files are in correct location
ls backend/models/

# Should show:
# nn_zero_to_sixty.keras
# nn_scaler.pkl
# feature_names.pkl
# feature_info.pkl
```

### Frontend can't connect

**Check backend is running:**
```bash
curl http://localhost:8000
```

**Check CORS:** Already configured - should work out of the box

**Check URL:** Frontend expects `http://localhost:8000`

### Predictions seem wrong

1. **Check weight estimation:**
   - Current: `weight = horsepower * 5.9`
   - Based on training data stats
   - Adjust if your data has different ratio

2. **Verify feature order:**
   - Must match training order exactly
   - See `/backend/models/README.md`

3. **Check scaler:**
   - Only first 7 features should be scaled
   - Binary features (8-9) NOT scaled

## 📊 Example Cars

Try these example configurations:

### 2020 Porsche 911 Turbo S
```
Year: 2020
Horsepower: 640
Engine Size: 3.8
Torque: 590
Weight: 3640 (or leave blank)
Drivetrain: RWD
Transmission: DCT
```

### 2021 Tesla Model S Plaid
```
Year: 2021
Horsepower: 1020
Engine Size: 0
Torque: 1050
Weight: 4766 (or leave blank)
Drivetrain: FWD/AWD
Transmission: Auto
```

### 2019 Ferrari 488 Pista
```
Year: 2019
Horsepower: 710
Engine Size: 3.9
Torque: 568
Weight: 3053 (or leave blank)
Drivetrain: RWD
Transmission: DCT
```

## 📚 Documentation

- **Full Integration Guide:** `/INTEGRATION_SUCCESS.md`
- **Transfer Details:** `/TRANSFER_COMPLETE.md`
- **Backend Setup:** `/backend/SETUP_INSTRUCTIONS.md`
- **Model Files:** `/backend/models/README.md`

## 🎯 Success Checklist

- [ ] Backend starts without errors
- [ ] Health check returns status "running"
- [ ] Model loaded successfully
- [ ] Frontend displays all controls
- [ ] Can adjust sliders smoothly
- [ ] Can toggle weight on/off
- [ ] Predictions return in ~1 second
- [ ] Results display with ratios
- [ ] Weight estimation indicator shows
- [ ] No console errors

## 🚀 You're Ready!

If all checks pass, your supercar acceleration predictor is ready for use!

**Key Features:**
- ✅ Neural network predictions
- ✅ Optional weight with auto-estimation
- ✅ Real-time ratio calculations
- ✅ Rich results display
- ✅ Responsive UI
- ✅ F1-ready aesthetic

Happy predicting! 🏎️💨

---

**Need help?** Check the troubleshooting section or review the full documentation.
