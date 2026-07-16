# 🚀 Start Here - Supercar 0-60 Predictor

## Quick Overview

This is a React + FastAPI application that predicts supercar 0-100 km/h acceleration times using a TensorFlow neural network.

## ✅ Current Status

- ✅ Frontend React app with 3D Ferrari viewer
- ✅ Backend FastAPI with TensorFlow/Keras model support
- ✅ **All 7 features REQUIRED** (including weight)
- ✅ Backend calculates power_weight and torque_weight ratios
- ✅ Rich prediction results with metadata

## 📋 Required Inputs

Users must provide **all 7 values**:

1. **Year** (1990-2025)
2. **Horsepower** (100-1500 HP)
3. **Engine Size** (1.0-10.0 L)
4. **Torque** (100-1500 lb-ft)
5. **Weight** (2000-7000 lbs) ← **REQUIRED**
6. **Drivetrain** (FWD/AWD or RWD)
7. **Transmission** (Auto or DCT)

## 🚀 Setup in 3 Steps

### 1. Add Your Model Files

Place these 4 files in `/backend/models/`:
```
backend/models/
├── nn_zero_to_sixty.keras
├── nn_scaler.pkl
├── feature_names.pkl
└── feature_info.pkl
```

### 2. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

**Dependencies:**
- fastapi
- uvicorn[standard]
- pydantic
- tensorflow
- joblib
- numpy

### 3. Start the Backend

```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --port 8000
```

**You should see:**
```
✓ Found models in: /path/to/backend/models
✓ Model loaded successfully
✓ Expected features: ['Year', 'Horsepower', ...]
INFO:     Uvicorn running on http://0.0.0.0:8000
```

## ✅ Verify It's Working

### 1. Health Check
```bash
curl http://localhost:8000
```

### 2. Make a Prediction
```bash
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
```

**Expected response:**
```json
{
  "prediction": 2.87,
  "unit": "seconds (0-100 km/h)",
  "power_weight_ratio": 0.1758,
  "torque_weight_ratio": 0.1621,
  "estimated_weight": 3640,
  "features_used": {...}
}
```

### 3. Use the UI
Open the frontend application and adjust the sliders to make predictions!

## 🎯 How It Works

```
Frontend (React)
    ↓
User adjusts 7 sliders
    ↓
Clicks "Predict 0-100 km/h Time"
    ↓
POST /predict with 7 values
    ↓
Backend (FastAPI)
    ↓
Validates input (Pydantic)
    ↓
Calculates ratios:
  • power_weight = hp / weight
  • torque_weight = torque / weight
    ↓
Builds feature array (9 features):
  [year, hp, eng, torque, pw, tw, weight, rwd, dct]
    ↓
Scales first 7 features (StandardScaler)
Keeps last 2 binary (no scaling)
    ↓
Neural Network predicts 0-100 time
    ↓
Returns result with ratios
    ↓
Frontend displays:
  • Prediction time
  • Power/Weight ratio
  • Torque/Weight ratio
  • Weight
  • Configuration
```

## 📊 Example Predictions

### Porsche 911 Turbo S (2020)
```
Year: 2020
Horsepower: 640
Engine Size: 3.8 L
Torque: 590 lb-ft
Weight: 3640 lbs
Drivetrain: RWD
Transmission: DCT

Expected: ~2.6-2.9 seconds
```

### Tesla Model S Plaid (2021)
```
Year: 2021
Horsepower: 1020
Engine Size: 0 L (electric)
Torque: 1050 lb-ft
Weight: 4766 lbs
Drivetrain: FWD/AWD
Transmission: Auto

Expected: ~2.0-2.3 seconds
```

### Ferrari 488 Pista (2019)
```
Year: 2019
Horsepower: 710
Engine Size: 3.9 L
Torque: 568 lb-ft
Weight: 3053 lbs
Drivetrain: RWD
Transmission: DCT

Expected: ~2.7-3.0 seconds
```

## 📚 Documentation

- **Main Integration Guide:** `/INTEGRATION_SUCCESS.md`
- **Backend Setup:** `/backend/SETUP_INSTRUCTIONS.md`
- **Weight Requirement:** `/WEIGHT_IS_REQUIRED.md`
- **Data Flow:** `/DATA_FLOW_DIAGRAM.md`
- **Quick Start:** `/QUICK_START_GUIDE.md`

## ⚠️ Important Notes

### Weight is REQUIRED
- Weight is **NOT optional** anymore
- Must be provided by user
- No auto-estimation from horsepower
- API will return 422 error if weight is missing

### Feature Order Matters
The model expects features in this **exact order**:
1. Year
2. Horsepower
3. Engine_Size
4. Torque
5. Power_Weight (calculated)
6. Torque_Weight (calculated)
7. Weight
8. Drivetrain_RWD (binary)
9. Transmission_DCT (binary)

### Scaling
- **First 7 features** (numerical) are scaled using StandardScaler
- **Last 2 features** (binary) are NOT scaled
- This must match your training process

## 🐛 Troubleshooting

### "Could not find model files"
**Solution:** Create `/backend/models/` and add all 4 model files

### "ModuleNotFoundError: tensorflow"
**Solution:** `pip install tensorflow`

### Frontend can't connect to backend
**Solution:** Ensure backend is running on `http://localhost:8000`

### Predictions seem incorrect
**Check:**
1. Model feature order matches training
2. Scaler only scales first 7 features
3. Binary features are NOT scaled

## 🎨 UI Features

- **3D Ferrari Viewer** with drag-to-rotate
- **Animated sliders** for all 7 inputs
- **Real-time validation**
- **Rich results** showing:
  - Predicted time
  - Power-to-weight ratio
  - Torque-to-weight ratio
  - Weight
  - Configuration summary
- **Responsive design** for all devices
- **Error handling** with clear messages

## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/predict` | Make prediction |
| GET | `/model-info` | Model details |
| GET | `/docs` | Interactive API docs |

## ✅ Success Checklist

- [ ] Model files in `/backend/models/`
- [ ] Dependencies installed
- [ ] Backend starts without errors
- [ ] Can access `http://localhost:8000`
- [ ] Frontend loads successfully
- [ ] All 7 sliders visible and working
- [ ] Predict button works
- [ ] Results display correctly
- [ ] Ratios calculate properly
- [ ] No console errors

## 🎯 What's Next?

1. **Test with your model** - Place your trained model files
2. **Verify predictions** - Compare with known car specs
3. **Fine-tune if needed** - Adjust feature order or scaling
4. **Customize UI** - Update styling for your brand
5. **Deploy** - Host on your preferred platform

## 🏎️ Ready to Race!

Once everything is set up:
1. ✅ Backend running on port 8000
2. ✅ Frontend displays all controls
3. ✅ Model making predictions
4. ✅ Results showing ratios and metadata

**You're ready to predict supercar acceleration times!** 🚀💨

---

**Need help?** Check the detailed documentation files or review the troubleshooting section.
