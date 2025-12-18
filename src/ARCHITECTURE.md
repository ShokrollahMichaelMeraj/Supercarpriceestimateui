# 🏗️ SuperCar 0-60 Predictor - System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER                              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │           React Frontend Application                 │  │
│  │                                                       │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │  │   Header    │  │  CarViewer   │  │   Footer   │ │  │
│  │  │ Navigation  │  │  3D Ferrari  │  │  Contact   │ │  │
│  │  └─────────────┘  └──────────────┘  └────────────┘ │  │
│  │                                                       │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │         FeatureSlider Component              │   │  │
│  │  │  ┌────────────────────────────────────────┐  │   │  │
│  │  │  │  Year Slider        [2020]            │  │   │  │
│  │  │  │  Horsepower Slider  [500 HP]          │  │   │  │
│  │  │  │  Engine Size Slider [4.0L]            │  │   │  │
│  │  │  │  Torque Slider      [500 lb-ft]       │  │   │  │
│  │  │  │  Weight Slider      [3500 lbs]        │  │   │  │
│  │  │  │  Drivetrain Select  [RWD]             │  │   │  │
│  │  │  │  Transmission Select[DCT]             │  │   │  │
│  │  │  └────────────────────────────────────────┘  │   │  │
│  │  │                                              │   │  │
│  │  │  [ Predict 0-100 km/h Time ]  [ Reset ]     │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │                         │                            │  │
│  │                         │ HTTP POST                  │  │
│  │                         ▼                            │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │         Prediction Display Card              │   │  │
│  │  │                                              │   │  │
│  │  │     Predicted 0-100 km/h Time                │   │  │
│  │  │           3.45 seconds                       │   │  │
│  │  │                                              │   │  │
│  │  │  Power/Weight | Torque/Weight | Config      │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ HTTP Request
                       │ localhost:8000/predict
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND SERVER                              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              FastAPI Application                      │  │
│  │                  (main.py)                            │  │
│  │                                                       │  │
│  │  Endpoints:                                           │  │
│  │  • GET  /          → Health check                    │  │
│  │  • GET  /health    → Detailed status                 │  │
│  │  • GET  /model-info→ Model metadata                  │  │
│  │  • POST /predict   → Make prediction ⭐              │  │
│  │  • GET  /docs      → Interactive docs                │  │
│  │                                                       │  │
│  └──────────────────────┬────────────────────────────────┘  │
│                         │                                   │
│                         │ Receives JSON                     │
│                         ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Data Preprocessing                            │  │
│  │                                                       │  │
│  │  Input: {year, hp, engine, torque, weight,           │  │
│  │         drivetrain_rwd, transmission_dct}            │  │
│  │                                                       │  │
│  │  Calculate:                                           │  │
│  │    power_weight = hp / weight                        │  │
│  │    torque_weight = torque / weight                   │  │
│  │                                                       │  │
│  │  Scale numerical features (nn_scaler.pkl)            │  │
│  │  Keep binary features unscaled                       │  │
│  │                                                       │  │
│  └──────────────────────┬────────────────────────────────┘  │
│                         │                                   │
│                         │ Feature array [1, 10]             │
│                         ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Neural Network Model                          │  │
│  │         (nn_zero_to_sixty.keras)                      │  │
│  │                                                       │  │
│  │     Input Layer (10 features)                         │  │
│  │           ↓                                           │  │
│  │     Hidden Layers (Dense + Activation)                │  │
│  │           ↓                                           │  │
│  │     Output Layer (1 value)                            │  │
│  │                                                       │  │
│  │     → Predicted acceleration time                     │  │
│  │                                                       │  │
│  └──────────────────────┬────────────────────────────────┘  │
│                         │                                   │
│                         │ Prediction result                 │
│                         ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Response Formatter                            │  │
│  │                                                       │  │
│  │  Build JSON response:                                 │  │
│  │  {                                                    │  │
│  │    prediction: 3.45,                                  │  │
│  │    unit: "seconds (0-100 km/h)",                      │  │
│  │    power_weight_ratio: 0.1429,                        │  │
│  │    torque_weight_ratio: 0.1429,                       │  │
│  │    features_used: {...}                               │  │
│  │  }                                                    │  │
│  │                                                       │  │
│  └──────────────────────┬────────────────────────────────┘  │
│                         │                                   │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          │ HTTP Response (JSON)
                          │
                          ▼
                   Frontend displays result
```

---

## Data Flow Diagram

### User Input → Prediction

```
┌──────────────┐
│ User Input   │
│              │
│ Year: 2020   │
│ HP: 500      │
│ Engine: 4.0  │
│ Torque: 500  │
│ Weight: 3500 │
│ RWD: Yes     │
│ DCT: Yes     │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Frontend         │
│ (FeatureSlider)  │
│                  │
│ Formats payload  │
│ as JSON          │
└──────┬───────────┘
       │
       ▼ HTTP POST to /predict
┌──────────────────┐
│ Backend          │
│ (FastAPI)        │
│                  │
│ 1. Validate      │
│ 2. Calculate     │
│    ratios        │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Preprocessing    │
│                  │
│ Features:        │
│ [2020, 500, 4.0, │
│  500, 0.143,     │
│  0.143, 3500,    │
│  1, 1]           │
└──────┬───────────┘
       │
       ▼ Scale numerical features
┌──────────────────┐
│ StandardScaler   │
│ (nn_scaler.pkl)  │
│                  │
│ Scaled features: │
│ [1, 9] + [0, 1]  │
└──────┬───────────┘
       │
       ▼ Feed to model
┌──────────────────┐
│ Neural Network   │
│ (Keras)          │
│                  │
│ Forward pass     │
│ through layers   │
└──────┬───────────┘
       │
       ▼ Output: 3.45
┌──────────────────┐
│ Response         │
│ Formatting       │
│                  │
│ Add metadata     │
└──────┬───────────┘
       │
       ▼ JSON response
┌──────────────────┐
│ Frontend         │
│ Display          │
│                  │
│ Shows: 3.45s     │
└──────────────────┘
```

---

## File Dependencies

### Frontend
```
App.tsx
 ├── Header.tsx
 ├── Footer.tsx (updated with new contact info)
 ├── WaveBackground.tsx
 └── pages/HomePage.tsx
      ├── HeroSection.tsx
      ├── CarViewer.tsx (3D Ferrari)
      ├── FeatureSlider.tsx ⭐ (Prediction UI)
      └── AboutSection.tsx
```

### Backend
```
main.py ⭐
 ├── models/nn_zero_to_sixty.keras
 ├── models/nn_scaler.pkl
 ├── models/feature_names.pkl
 └── models/feature_info.pkl
```

### Supporting Files
```
backend/
 ├── requirements.txt (dependencies)
 ├── start.sh (startup script)
 ├── start.bat (Windows startup)
 ├── test_api.py (test suite)
 ├── check_setup.py (setup checker)
 └── download_models.py (model downloader)
```

---

## Feature Engineering Pipeline

```
Raw Inputs (from user)
│
├── Year (1990-2025)
├── Horsepower (100-1500)
├── Engine_Size (1.0-10.0)
├── Torque (100-1500)
├── Weight (2000-7000) ⭐ REQUIRED
├── Drivetrain_RWD (0 or 1)
└── Transmission_DCT (0 or 1)
        │
        ▼
Calculated Features (backend)
│
├── Power_Weight = HP / Weight
└── Torque_Weight = Torque / Weight
        │
        ▼
Feature Array [10 features]
│
[Year, HP, Engine, Torque, PW, TW, Weight, RWD, DCT, ?]
        │
        ▼
Scaling (StandardScaler)
│
First 7 features → SCALED
Last 2+ features → UNSCALED (binary)
        │
        ▼
Neural Network Input
│
Shape: (1, 10)
        │
        ▼
Neural Network Layers
│
Input → Dense → Activation → ... → Output
        │
        ▼
Prediction
│
0-100 km/h time (seconds)
```

---

## API Request/Response Cycle

### Request Format
```http
POST /predict HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "year": 2020,
  "horsepower": 500,
  "engine_size": 4.0,
  "torque": 500,
  "weight": 3500,
  "drivetrain_rwd": 1,
  "transmission_dct": 1
}
```

### Response Format
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "prediction": 3.45,
  "unit": "seconds (0-100 km/h)",
  "power_weight_ratio": 0.1429,
  "torque_weight_ratio": 0.1429,
  "estimated_weight": 3500,
  "features_used": {
    "year": 2020,
    "horsepower": 500,
    "engine_size": 4.0,
    "torque": 500,
    "weight": 3500,
    "weight_estimated": false,
    "power_weight": 0.1429,
    "torque_weight": 0.1429,
    "drivetrain_rwd": true,
    "transmission_dct": true
  }
}
```

---

## Technology Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Motion** (Framer Motion) - Animations
- **Three.js** - 3D Ferrari viewer

### Backend
- **Python 3.8+** - Programming language
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **TensorFlow/Keras** - Neural network
- **Joblib** - Model serialization
- **NumPy** - Numerical operations
- **Pydantic** - Data validation

### ML Model
- **Architecture**: Sequential Neural Network
- **Framework**: TensorFlow/Keras
- **Input**: 10 features
- **Output**: 1 value (acceleration time)
- **Preprocessing**: StandardScaler (sklearn)

---

## Deployment Architecture (Production)

```
┌─────────────────────┐
│   Users (Browsers)  │
└──────────┬──────────┘
           │ HTTPS
           ▼
┌─────────────────────┐
│  Frontend Hosting   │
│  (Vercel/Netlify)   │
│                     │
│  React App          │
│  Static Assets      │
└──────────┬──────────┘
           │ HTTPS/REST
           ▼
┌─────────────────────┐
│  Backend Hosting    │
│  (AWS/Railway)      │
│                     │
│  FastAPI Server     │
│  + Model Files      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Monitoring/Logs    │
│  (CloudWatch/etc)   │
└─────────────────────┘
```

---

## Security Considerations

### Current (Development)
- ✅ CORS: Allow all origins (`*`)
- ✅ No authentication required
- ✅ HTTP allowed

### Production (Recommended)
- 🔒 CORS: Specific domain only
- 🔒 API key authentication
- 🔒 HTTPS only
- 🔒 Rate limiting
- 🔒 Input validation
- 🔒 Error sanitization
- 🔒 Logging and monitoring

---

## Performance Metrics

### Expected Performance
- **Prediction Time**: < 100ms
- **Model Loading**: ~ 2-3 seconds (startup)
- **API Response**: < 200ms
- **Frontend Rendering**: < 50ms

### Optimization Opportunities
- Cache frequent predictions
- Batch prediction support
- Model quantization
- CDN for frontend assets
- Database for prediction history

---

## Contact

**Email:** mmeraj@sfu.ca  
**Phone:** +1 (604) 345-3598  
**Location:** Vancouver, British Columbia, Canada

---

*Architecture Documentation - December 2024*
