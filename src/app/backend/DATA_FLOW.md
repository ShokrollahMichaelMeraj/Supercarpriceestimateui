# 🔄 Data Flow Diagram

## User Input → Model Prediction Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                     (Frontend - React/TypeScript)               │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ User adjusts sliders
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      UI Controls (FeatureSlider.tsx)            │
├─────────────────────────────────────────────────────────────────┤
│  📊 Sliders:                                                    │
│    • Year: 2020                                                 │
│    • Horsepower: 700 HP                                         │
│    • Engine Size: 4.0 L                                         │
│    • Torque: 850 Nm                                             │
│    • Power/Weight: 0.53 HP/kg                                   │
│    • Torque/Weight: 0.65 Nm/kg                                  │
│                                                                  │
│  🔽 Dropdowns:                                                  │
│    • Drivetrain: "AWD"                                          │
│    • Transmission: "DCT"                                        │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ User clicks "Predict"
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FRONTEND PROCESSING                           │
│                 (One-Hot Encoding Conversion)                   │
├─────────────────────────────────────────────────────────────────┤
│  "AWD" → drivetrain_awd: 1, drivetrain_rwd: 0                  │
│  "DCT" → transmission_dct: 1, transmission_auto: 0             │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ POST Request
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      HTTP REQUEST                               │
│          POST http://localhost:8000/api/predict                 │
├─────────────────────────────────────────────────────────────────┤
│  {                                                              │
│    "year": 2020,                                                │
│    "horsepower": 700,                                           │
│    "engine_size": 4.0,                                          │
│    "torque": 850,                                               │
│    "power_weight": 0.53,                                        │
│    "torque_weight": 0.65,                                       │
│    "drivetrain_awd": 1,                                         │
│    "drivetrain_rwd": 0,                                         │
│    "transmission_dct": 1,                                       │
│    "transmission_auto": 0                                       │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ Network
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API                                │
│                   (FastAPI - Python)                            │
│                     /backend/main.py                            │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ Pydantic validation
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   DATA VALIDATION                               │
│                    (CarSpecs model)                             │
├─────────────────────────────────────────────────────────────────┤
│  ✓ year: int                                                    │
│  ✓ horsepower: float                                            │
│  ✓ engine_size: float                                           │
│  ✓ torque: float                                                │
│  ✓ power_weight: float                                          │
│  ✓ torque_weight: float                                         │
│  ✓ drivetrain_awd: int (0 or 1)                                │
│  ✓ drivetrain_rwd: int (0 or 1)                                │
│  ✓ transmission_dct: int (0 or 1)                              │
│  ✓ transmission_auto: int (0 or 1)                             │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ Create NumPy array
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FEATURE ARRAY CREATION                        │
├─────────────────────────────────────────────────────────────────┤
│  features = np.array([[                                         │
│    2020,    # Year                                              │
│    700,     # Horsepower                                        │
│    4.0,     # Engine_Size                                       │
│    850,     # Torque                                            │
│    0.53,    # Power_Weight                                      │
│    0.65,    # Torque_Weight                                     │
│    1,       # Drivetrain_AWD                                    │
│    0,       # Drivetrain_RWD                                    │
│    1,       # Transmission_DCT                                  │
│    0        # Transmission_Auto                                 │
│  ]])                                                            │
│                                                                  │
│  Shape: (1, 10)  ← 1 sample, 10 features                       │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ If scaler exists
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FEATURE SCALING (Optional)                    │
├─────────────────────────────────────────────────────────────────┤
│  if scaler is not None:                                         │
│      features = scaler.transform(features)                      │
│                                                                  │
│  # Standardizes features to same scale                          │
│  # Only if you used StandardScaler during training              │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ Make prediction
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ML MODEL                                   │
│                    (model.pkl)                                  │
├─────────────────────────────────────────────────────────────────┤
│  prediction = model.predict(features)[0]                        │
│                                                                  │
│  Input:  [2020, 700, 4.0, 850, 0.53, 0.65, 1, 0, 1, 0]        │
│  Output: 2.85                                                   │
│                                                                  │
│  Model Type: Your trained model (scikit-learn, etc.)            │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ Round result
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   RESPONSE FORMATTING                           │
├─────────────────────────────────────────────────────────────────┤
│  return {                                                       │
│    "predicted_0_60_time": round(2.85, 2)                       │
│  }                                                              │
│                                                                  │
│  → {"predicted_0_60_time": 2.85}                               │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ HTTP Response
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND RECEIVES                          │
├─────────────────────────────────────────────────────────────────┤
│  const data = await response.json();                            │
│  setPrediction(data.predicted_0_60_time);                       │
│                                                                  │
│  → prediction = 2.85                                            │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ Update UI
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DISPLAY RESULT                             │
│                     (Prediction Card)                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐    │
│  │       Predicted 0-60 Time                              │    │
│  │                                                         │    │
│  │            2.85 seconds                                │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1️⃣ Frontend Components

#### FeatureSlider.tsx
- **Responsibility**: UI controls and user input
- **Key Functions**:
  - `handleValueChange()` - Updates slider values
  - `handleSelectChange()` - Updates dropdown selections
  - `handlePredict()` - Sends API request
- **Output**: JSON payload with 10 features

#### Encoding Logic
```typescript
// Drivetrain encoding
const drivetrain_awd = values.drivetrain === 'awd' ? 1 : 0;
const drivetrain_rwd = values.drivetrain === 'rwd' ? 1 : 0;

// Transmission encoding
const transmission_dct = values.transmission === 'dct' ? 1 : 0;
const transmission_auto = values.transmission === 'auto' ? 1 : 0;
```

### 2️⃣ Backend Components

#### main.py - API Endpoint
- **Route**: `POST /api/predict`
- **Responsibility**: Receive request, validate, predict, respond
- **Key Steps**:
  1. Validate input with Pydantic
  2. Create NumPy feature array
  3. Apply scaling (if scaler exists)
  4. Make prediction
  5. Return formatted result

#### CarSpecs Model (Pydantic)
```python
class CarSpecs(BaseModel):
    year: int
    horsepower: float
    engine_size: float
    torque: float
    power_weight: float
    torque_weight: float
    drivetrain_awd: int
    drivetrain_rwd: int
    transmission_dct: int
    transmission_auto: int
```

### 3️⃣ ML Model

#### model.pkl
- **Loaded at startup**: `model = pickle.load(open('model.pkl', 'rb'))`
- **Input**: NumPy array shape (1, 10)
- **Output**: Single float value (predicted 0-60 time)
- **Method**: `model.predict(features)`

#### scaler.pkl (Optional)
- **Loaded at startup**: `scaler = pickle.load(open('scaler.pkl', 'rb'))`
- **Purpose**: Standardize features to same scale
- **Method**: `scaler.transform(features)`

---

## Error Handling Flow

```
User Input
    │
    ├─→ Invalid value? → Input validation (min/max clamping)
    │
    ▼
API Request
    │
    ├─→ Network error? → Display error message
    │
    ▼
Backend Validation
    │
    ├─→ Invalid data type? → Return 422 error
    │
    ▼
Model Prediction
    │
    ├─→ Model not found? → Use dummy model
    ├─→ Wrong feature count? → Return error
    │
    ▼
Response
    │
    └─→ Success! → Display prediction
```

---

## Timing Diagram

```
Frontend                    Backend                     Model
   │                          │                           │
   │  POST /api/predict       │                           │
   ├─────────────────────────>│                           │
   │                          │                           │
   │                          │  Validate input           │
   │                          ├──────────┐                │
   │                          │<─────────┘                │
   │                          │                           │
   │                          │  Create feature array     │
   │                          ├──────────┐                │
   │                          │<─────────┘                │
   │                          │                           │
   │                          │  Apply scaling (if any)   │
   │                          ├──────────┐                │
   │                          │<─────────┘                │
   │                          │                           │
   │                          │  model.predict()          │
   │                          ├──────────────────────────>│
   │                          │                           │
   │                          │   Prediction result       │
   │                          │<──────────────────────────┤
   │                          │                           │
   │                          │  Format response          │
   │                          ├──────────┐                │
   │                          │<─────────┘                │
   │                          │                           │
   │  JSON response           │                           │
   │<─────────────────────────┤                           │
   │                          │                           │
   │  Update UI               │                           │
   ├───────┐                  │                           │
   │<──────┘                  │                           │
   │                          │                           │
```

Typical response time: **50-200ms**

---

## State Management

### Frontend State (React)
```typescript
const [values, setValues] = useState({...})      // User inputs
const [prediction, setPrediction] = useState()   // Model result
const [isLoading, setIsLoading] = useState()     // Loading state
const [error, setError] = useState()             // Error state
```

### Backend State (FastAPI)
```python
model = None       # Loaded at startup
scaler = None      # Loaded at startup (optional)
```

---

## Example Complete Flow

```
User Action:
  1. Adjusts "Horsepower" slider to 700
  2. Selects "AWD" from drivetrain dropdown
  3. Clicks "Predict 0-60 Time" button

Frontend Processing:
  4. Collects all values: {year: 2020, horsepower: 700, ...}
  5. Encodes categories: drivetrain_awd = 1
  6. Sends POST request to localhost:8000/api/predict

Backend Processing:
  7. Receives JSON payload
  8. Validates with Pydantic (CarSpecs model)
  9. Creates NumPy array: [[2020, 700, 4.0, ...]]
  10. Applies scaling (if scaler exists)
  11. Calls model.predict(features)
  12. Gets result: 2.85
  13. Returns: {"predicted_0_60_time": 2.85}

Frontend Display:
  14. Receives response
  15. Updates state: setPrediction(2.85)
  16. Renders: "2.85 seconds"

Total time: ~100ms
```

---

## Summary

This data flow ensures:
✅ Type safety (Pydantic validation)
✅ Correct feature order (NumPy array)
✅ Proper encoding (one-hot categorical variables)
✅ Fast predictions (~100ms roundtrip)
✅ Error handling (network, validation, model errors)
✅ User-friendly UI (sliders + dropdowns)

Your model receives exactly what it expects, every time! 🎯
