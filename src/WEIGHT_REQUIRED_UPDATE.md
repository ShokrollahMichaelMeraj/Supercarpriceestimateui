# ✅ Weight is Now Required

## What Changed

Weight is now a **required input** field, not optional.

### Backend Changes (`/backend/main.py`)

1. **Removed Optional from weight field:**
   ```python
   # Before:
   weight: Optional[float] = Field(None, description="...")
   
   # After:
   weight: float = Field(..., description="Weight in lbs")
   ```

2. **Removed weight estimation logic:**
   - No longer calculates `weight = horsepower * 5.9`
   - Always uses the user-provided weight value
   - Removed `estimated` flag from preprocessing

3. **Updated response:**
   - `weight_estimated` is always `False`
   - Weight displayed is always the user's input

### Frontend Changes (`/components/FeatureSlider.tsx`)

1. **Removed optional weight toggle:**
   - Removed "Specify weight manually" button
   - Removed "Auto-estimate instead" button
   - Removed weight estimation notice

2. **Weight is now a standard required slider:**
   - Always visible
   - Must be set by user
   - Range: 2000 - 7000 lbs
   - Default: 3500 lbs

3. **Updated results display:**
   - Changed "Estimated Weight" → "Weight"
   - Removed estimation indicator
   - Shows user-provided weight value

## API Changes

### Request Format (Now Required)

```json
{
  "year": 2020,
  "horsepower": 640,
  "engine_size": 3.8,
  "torque": 590,
  "weight": 3640,           // ← REQUIRED (was optional)
  "drivetrain_rwd": 1,
  "transmission_dct": 1
}
```

**Omitting weight will now return a 422 error.**

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
    "weight_estimated": false,    // ← Always false now
    "power_weight": 0.1758,
    "torque_weight": 0.1621,
    "drivetrain_rwd": true,
    "transmission_dct": true
  }
}
```

## UI Changes

### Before
```
┌─────────────────────────────────┐
│ Weight                          │
│ [Specify weight manually]       │
│                                 │
│ ℹ Weight will be auto-estimated │
│   from horsepower               │
└─────────────────────────────────┘
```

### After
```
┌─────────────────────────────────┐
│ Weight              3500 lbs    │
│ [═════════●═════════]           │
└─────────────────────────────────┘
```

## All Features Now Visible

The UI now shows all 5 sliders + 2 selects:

1. ✅ **Year** (slider: 1990-2025)
2. ✅ **Horsepower** (slider: 100-1500 HP)
3. ✅ **Engine Size** (slider: 1.0-10.0 L)
4. ✅ **Torque** (slider: 100-1500 lb-ft)
5. ✅ **Weight** (slider: 2000-7000 lbs) ← **Now always visible**
6. ✅ **Drivetrain** (select: FWD/AWD or RWD)
7. ✅ **Transmission** (select: Auto or DCT)

## Data Flow

```
User Input → Frontend
    ↓
    Year: 2020
    Horsepower: 640
    Engine_Size: 3.8
    Torque: 590
    Weight: 3640        ← Required from user
    Drivetrain: RWD
    Transmission: DCT
    ↓
Backend receives all 7 values
    ↓
Calculates:
    power_weight = 640 / 3640 = 0.1758
    torque_weight = 590 / 3640 = 0.1621
    ↓
Builds feature array:
    [2020, 640, 3.8, 590, 0.1758, 0.1621, 3640, 1, 1]
    ↓
Scales first 7 features
Concatenates with binary features
    ↓
Model predicts: 2.87 seconds
```

## Testing

### Valid Request
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

✅ **Success:** Returns prediction with ratios

### Invalid Request (Missing Weight)
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

❌ **Error 422:** Field required

## Summary

- ✅ Weight is now **required** in both frontend and backend
- ✅ No more weight estimation logic
- ✅ Cleaner UI - all sliders always visible
- ✅ Simpler data flow
- ✅ User must provide all 7 input values

The application now expects users to always provide the weight of their vehicle for accurate predictions.
