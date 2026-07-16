# 🔄 Data Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
│                  /components/FeatureSlider.tsx               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User Adjusts Sliders:                                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Year: 2020 │  │ HP: 640    │  │ Engine:3.8L│            │
│  └────────────┘  └────────────┘  └────────────┘            │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Torque:590 │  │ Weight: ✗  │  │ RWD ☑      │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                     (optional)                               │
│                                                              │
│  Clicks: "Predict 0-100 km/h Time"                          │
│                                                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ POST /predict
                       │ {
                       │   "year": 2020,
                       │   "horsepower": 640,
                       │   "engine_size": 3.8,
                       │   "torque": 590,
                       │   // weight omitted
                       │   "drivetrain_rwd": 1,
                       │   "transmission_dct": 1
                       │ }
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (FastAPI)                         │
│                    /backend/main.py                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: Validate Input (Pydantic)                          │
│  ┌──────────────────────────────────────┐                   │
│  │ ✓ year: float (required)             │                   │
│  │ ✓ horsepower: float (required)       │                   │
│  │ ✓ engine_size: float (required)      │                   │
│  │ ✓ torque: float (required)           │                   │
│  │ ✓ weight: Optional[float]            │                   │
│  │ ✓ drivetrain_rwd: int (0 or 1)       │                   │
│  │ ✓ transmission_dct: int (0 or 1)     │                   │
│  └──────────────────────────────────────┘                   │
│                                                              │
│  Step 2: Estimate Weight (if not provided)                  │
│  ┌──────────────────────────────────────┐                   │
│  │ if weight is None:                   │                   │
│  │   weight = horsepower * 5.9          │                   │
│  │   weight = 640 * 5.9 = 3,776 lbs     │                   │
│  │   estimated = True                   │                   │
│  └──────────────────────────────────────┘                   │
│                                                              │
│  Step 3: Calculate Derived Features                         │
│  ┌──────────────────────────────────────┐                   │
│  │ power_weight = 640 / 3776 = 0.1695   │                   │
│  │ torque_weight = 590 / 3776 = 0.1563  │                   │
│  └──────────────────────────────────────┘                   │
│                                                              │
│  Step 4: Build Feature Array (EXACT ORDER!)                 │
│  ┌──────────────────────────────────────────────────┐       │
│  │ numerical_features = [                           │       │
│  │   2020,      # Year                              │       │
│  │   640,       # Horsepower                        │       │
│  │   3.8,       # Engine_Size                       │       │
│  │   590,       # Torque                            │       │
│  │   0.1695,    # Power_Weight (calculated)         │       │
│  │   0.1563,    # Torque_Weight (calculated)        │       │
│  │   3776       # Weight (estimated)                │       │
│  │ ]                                                │       │
│  │                                                  │       │
│  │ binary_features = [                              │       │
│  │   1,         # Drivetrain_RWD                    │       │
│  │   1          # Transmission_DCT                  │       │
│  │ ]                                                │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  Step 5: Scale Numerical Features ONLY                      │
│  ┌──────────────────────────────────────┐                   │
│  │ scaled = scaler.transform(           │                   │
│  │   numerical_features                 │                   │
│  │ )                                    │                   │
│  │                                      │                   │
│  │ // StandardScaler applied to first   │                   │
│  │ // 7 features only                   │                   │
│  └──────────────────────────────────────┘                   │
│                                                              │
│  Step 6: Concatenate Features                               │
│  ┌──────────────────────────────────────┐                   │
│  │ final_features = np.concatenate([    │                   │
│  │   scaled,              # 7 features  │                   │
│  │   binary_features      # 2 features  │                   │
│  │ ])                                   │                   │
│  │                                      │                   │
│  │ // Shape: (1, 9)                     │                   │
│  └──────────────────────────────────────┘                   │
│                                                              │
│  Step 7: Make Prediction                                    │
│  ┌──────────────────────────────────────┐                   │
│  │ prediction = model.predict(          │                   │
│  │   final_features,                    │                   │
│  │   verbose=0                          │                   │
│  │ )[0][0]                              │                   │
│  │                                      │                   │
│  │ prediction = max(float(pred), 0.5)   │                   │
│  │ prediction = 2.87                    │                   │
│  └──────────────────────────────────────┘                   │
│                                                              │
│  Step 8: Build Response                                     │
│  ┌──────────────────────────────────────────────────┐       │
│  │ {                                                │       │
│  │   "prediction": 2.87,                            │       │
│  │   "unit": "seconds (0-100 km/h)",                │       │
│  │   "power_weight_ratio": 0.1695,                  │       │
│  │   "torque_weight_ratio": 0.1563,                 │       │
│  │   "estimated_weight": 3776,                      │       │
│  │   "features_used": {                             │       │
│  │     "year": 2020,                                │       │
│  │     "horsepower": 640,                           │       │
│  │     "engine_size": 3.8,                          │       │
│  │     "torque": 590,                               │       │
│  │     "weight": 3776,                              │       │
│  │     "weight_estimated": true,                    │       │
│  │     "power_weight": 0.1695,                      │       │
│  │     "torque_weight": 0.1563,                     │       │
│  │     "drivetrain_rwd": true,                      │       │
│  │     "transmission_dct": true                     │       │
│  │   }                                              │       │
│  │ }                                                │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Response
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│              Display Results to User                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ╔═══════════════════════════════════════════════╗          │
│  ║     Predicted 0-100 km/h Time                 ║          │
│  ║            2.87 seconds                       ║          │
│  ╠═══════════════════════════════════════════════╣          │
│  ║                                               ║          │
│  ║  ┌──────────────┐    ┌──────────────┐        ║          │
│  ║  │Power/Weight  │    │Torque/Weight │        ║          │
│  ║  │0.1695 hp/lb  │    │0.1563 lb-ft/lb│       ║          │
│  ║  └──────────────┘    └──────────────┘        ║          │
│  ║                                               ║          │
│  ║  ┌──────────────┐    ┌──────────────┐        ║          │
│  ║  │Estimated Wt  │    │Configuration │        ║          │
│  ║  │3,776 lbs ⓘ   │    │RWD + DCT     │        ║          │
│  ║  └──────────────┘    └──────────────┘        ║          │
│  ║                                               ║          │
│  ╚═══════════════════════════════════════════════╝          │
│                                                              │
│  ⓘ = Weight was estimated (not user-provided)               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Model File Structure

```
backend/models/
│
├── nn_zero_to_sixty.keras
│   │
│   └── TensorFlow/Keras Sequential Model
│       ├── Input Layer: 9 features
│       ├── Hidden Layers: Neural network architecture
│       └── Output Layer: 1 value (0-100 km/h time)
│
├── nn_scaler.pkl
│   │
│   └── StandardScaler (fitted on training data)
│       ├── Transforms ONLY first 7 numerical features
│       ├── mean_ : [mean_year, mean_hp, ...]
│       └── scale_: [std_year, std_hp, ...]
│
├── feature_names.pkl
│   │
│   └── List: ['Year', 'Horsepower', 'Engine_Size',
│                'Torque', 'Power_Weight', 'Torque_Weight',
│                'Weight', 'Drivetrain_RWD', 'Transmission_DCT']
│
└── feature_info.pkl
    │
    └── Dict: {
          'numeric_features': [first 7 features],
          'binary_features': [last 2 features]
        }
```

## Feature Flow Detail

```
USER INPUT (Frontend)          BACKEND PROCESSING              MODEL INPUT
─────────────────────         ────────────────────            ───────────

Year: 2020          ──────►   Year: 2020          ──scale──►  [scaled_year]
Horsepower: 640     ──────►   Horsepower: 640     ──scale──►  [scaled_hp]
Engine Size: 3.8    ──────►   Engine_Size: 3.8    ──scale──►  [scaled_eng]
Torque: 590         ──────►   Torque: 590         ──scale──►  [scaled_trq]
                               ↓ Calculate
Weight: (none)      ──────►   Weight: 3776        ──scale──►  [scaled_wt]
                               ↓ Calculate                     
                               Power_Weight: 0.1695 ──scale──► [scaled_pw]
                               Torque_Weight: 0.1563──scale──► [scaled_tw]

Drivetrain: RWD     ──────►   Drivetrain_RWD: 1   ───────►    [1]
Transmission: DCT   ──────►   Transmission_DCT: 1 ───────►    [1]

                                                              ──────────
                                                              Final: (1,9)
                                                                 ↓
                                                              MODEL
                                                                 ↓
                                                              2.87 sec
```

## Weight Estimation Logic

```
┌─────────────────────────────────────┐
│   Weight Provided by User?          │
└──────────┬────────────┬─────────────┘
           │            │
          YES          NO
           │            │
           ▼            ▼
    ┌──────────┐  ┌──────────────┐
    │Use User  │  │Estimate from │
    │Weight    │  │Horsepower    │
    │          │  │              │
    │weight =  │  │weight =      │
    │user_input│  │hp * 5.9      │
    │          │  │              │
    │estimated │  │estimated     │
    │= False   │  │= True        │
    └────┬─────┘  └─────┬────────┘
         │              │
         └──────┬───────┘
                ▼
         ┌─────────────┐
         │Calculate    │
         │Ratios:      │
         │             │
         │PW = HP / Wt │
         │TW = Tq / Wt │
         └─────────────┘
```

## Why This Architecture?

### Frontend Simplicity
- User only provides **6 inputs** (+ optional weight)
- No need to calculate ratios manually
- Cleaner UI with fewer sliders

### Backend Intelligence
- Centralized calculation logic
- Consistent ratio calculations
- Easy to update estimation formula
- Single source of truth

### Accurate Predictions
- Feature order matches training exactly
- Proper scaling (numerical only)
- Weight estimation based on training stats
- Model receives expected input format

## Data Types Throughout Flow

```
┌──────────────┬─────────────┬──────────────┬────────────┐
│   Stage      │   Type      │   Shape      │   Example  │
├──────────────┼─────────────┼──────────────┼────────────┤
│ User Input   │ Number      │ Single value │ 640        │
│ API Request  │ JSON        │ Object       │ {"hp":640} │
│ Pydantic     │ CarInput    │ Object       │ CarInput() │
│ Numpy Array  │ ndarray     │ (1, 7)       │ [[2020,..]]│
│ Scaled       │ ndarray     │ (1, 7)       │ [[-0.5,..]]│
│ Final Input  │ ndarray     │ (1, 9)       │ [[...,1,1]]│
│ Prediction   │ ndarray     │ (1, 1)       │ [[2.87]]   │
│ Response     │ float       │ Single value │ 2.87       │
│ JSON Output  │ JSON        │ Object       │ {"pred":..}│
│ UI Display   │ String      │ Formatted    │ "2.87 sec" │
└──────────────┴─────────────┴──────────────┴────────────┘
```

## Error Handling Flow

```
┌─────────────────┐
│ User Clicks     │
│ "Predict"       │
└────────┬────────┘
         │
         ▼
┌──────────────────┐
│ Frontend         │     ┌────────────────┐
│ Validates        │────►│ Show Error     │
│ (Basic check)    │     │ "Fill all..."  │
└────────┬─────────┘     └────────────────┘
         │
         │ POST /predict
         ▼
┌──────────────────┐
│ Backend          │     ┌────────────────┐
│ Pydantic         │────►│ 422 Response   │
│ Validation       │     │ "Invalid type" │
└────────┬─────────┘     └────────────────┘
         │
         ▼
┌──────────────────┐
│ Preprocessing    │     ┌────────────────┐
│ (Calculate,      │────►│ 500 Response   │
│  Scale, etc.)    │     │ "Calc error"   │
└────────┬─────────┘     └────────────────┘
         │
         ▼
┌──────────────────┐
│ Model Predict    │     ┌────────────────┐
│ (Neural Net)     │────►│ 500 Response   │
│                  │     │ "Predict fail" │
└────────┬─────────┘     └────────────────┘
         │
         ▼
┌──────────────────┐
│ Success!         │
│ Return JSON      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Frontend         │
│ Display Results  │
└──────────────────┘
```

## Performance Characteristics

```
┌──────────────────────┬──────────────┬─────────────┐
│   Operation          │   Time       │   Notes     │
├──────────────────────┼──────────────┼─────────────┤
│ User Input           │ Instant      │ React state │
│ Slider Update        │ < 1ms        │ Smooth      │
│ API Call (network)   │ 5-50ms       │ Local       │
│ Backend Validation   │ < 1ms        │ Pydantic    │
│ Weight Estimation    │ < 1ms        │ Simple math │
│ Feature Scaling      │ < 1ms        │ Numpy       │
│ Model Prediction     │ 10-50ms      │ Neural Net  │
│ Response Build       │ < 1ms        │ JSON        │
│ Frontend Display     │ < 10ms       │ React       │
├──────────────────────┼──────────────┼─────────────┤
│ TOTAL (typical)      │ 50-150ms     │ < 0.2 sec   │
└──────────────────────┴──────────────┴─────────────┘
```

---

**This diagram shows the complete data flow from user input to prediction display!**
