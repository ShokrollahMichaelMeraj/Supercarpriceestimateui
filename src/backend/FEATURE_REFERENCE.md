# 📊 Feature Reference Guide

## Features Used by the Model

This document describes the exact features used by the 0-60 prediction model.

### Feature List (In Order)

| # | Feature Name | Type | Description | Range | Unit |
|---|--------------|------|-------------|-------|------|
| 1 | `Year` | Numeric | Manufacturing year | 1980-2025 | - |
| 2 | `Horsepower` | Numeric | Engine horsepower | 100-1500 | HP |
| 3 | `Engine_Size` | Numeric | Engine displacement | 1.0-10.0 | L |
| 4 | `Torque` | Numeric | Engine torque | 100-1500 | Nm |
| 5 | `Power_Weight` | Numeric | Power-to-weight ratio | 0.05-1.5 | HP/kg |
| 6 | `Torque_Weight` | Numeric | Torque-to-weight ratio | 0.05-1.5 | Nm/kg |
| 7 | `Drivetrain_AWD` | Binary | All-wheel drive (one-hot) | 0 or 1 | - |
| 8 | `Drivetrain_RWD` | Binary | Rear-wheel drive (one-hot) | 0 or 1 | - |
| 9 | `Transmission_DCT` | Binary | Dual-clutch transmission (one-hot) | 0 or 1 | - |
| 10 | `Transmission_Auto` | Binary | Automatic transmission (one-hot) | 0 or 1 | - |

---

## Categorical Features (One-Hot Encoded)

### Drivetrain
The drivetrain is encoded using two binary columns:

| Drivetrain Type | `Drivetrain_AWD` | `Drivetrain_RWD` |
|-----------------|------------------|------------------|
| FWD (Front-Wheel Drive) | 0 | 0 |
| RWD (Rear-Wheel Drive) | 0 | 1 |
| AWD (All-Wheel Drive) | 1 | 0 |

**Note:** FWD is the baseline category (both columns = 0)

### Transmission
The transmission is encoded using two binary columns:

| Transmission Type | `Transmission_DCT` | `Transmission_Auto` |
|-------------------|---------------------|---------------------|
| Manual | 0 | 0 |
| Automatic | 0 | 1 |
| DCT (Dual-Clutch) | 1 | 0 |

**Note:** Manual is the baseline category (both columns = 0)

---

## UI to Backend Mapping

### Frontend Slider Values → Backend Features

```typescript
// Frontend sends:
{
  year: 2020,
  horsepower: 500,
  engine_size: 4.0,
  torque: 500,
  power_weight: 0.33,
  torque_weight: 0.33,
  drivetrain: "rwd",      // UI dropdown selection
  transmission: "dct"     // UI dropdown selection
}

// Backend receives (after one-hot encoding):
{
  year: 2020,
  horsepower: 500,
  engine_size: 4.0,
  torque: 500,
  power_weight: 0.33,
  torque_weight: 0.33,
  drivetrain_awd: 0,      // Converted from "rwd"
  drivetrain_rwd: 1,      // Converted from "rwd"
  transmission_dct: 1,    // Converted from "dct"
  transmission_auto: 0    // Converted from "dct"
}

// Model receives (NumPy array):
[[2020, 500, 4.0, 500, 0.33, 0.33, 0, 1, 1, 0]]
```

---

## Power/Weight and Torque/Weight Ratios

### How They're Calculated

If you need to calculate these ratios manually:

```python
# Power-to-Weight Ratio
power_weight = horsepower / weight_kg

# Example: 500 HP / 1500 kg = 0.33 HP/kg

# Torque-to-Weight Ratio
torque_weight = torque_nm / weight_kg

# Example: 500 Nm / 1500 kg = 0.33 Nm/kg
```

### Typical Values

| Vehicle Type | Power/Weight (HP/kg) | Torque/Weight (Nm/kg) |
|--------------|----------------------|------------------------|
| Economy Car | 0.05 - 0.10 | 0.08 - 0.15 |
| Sports Car | 0.15 - 0.35 | 0.20 - 0.45 |
| Supercar | 0.35 - 0.70 | 0.40 - 0.80 |
| Hypercar | 0.70 - 1.50 | 0.70 - 1.20 |

---

## Feature Engineering Notes

### Why Power/Weight Ratio Matters
- **High ratio** = Better acceleration (lighter car with more power)
- **Low ratio** = Slower acceleration (heavier car with less power)
- Most important feature for 0-60 prediction

### Why Drivetrain Matters
- **AWD**: Better traction, faster 0-60 times
- **RWD**: Power goes to rear wheels, can wheelspin
- **FWD**: Less efficient power transfer, slower acceleration

### Why Transmission Matters
- **DCT**: Fastest shifts, no power loss
- **Automatic**: Smooth but slower shifts
- **Manual**: Dependent on driver skill

---

## Example Inputs

### Example 1: Supercar (Fast)
```json
{
  "year": 2022,
  "horsepower": 700,
  "engine_size": 4.0,
  "torque": 850,
  "power_weight": 0.53,
  "torque_weight": 0.65,
  "drivetrain_awd": 1,
  "drivetrain_rwd": 0,
  "transmission_dct": 1,
  "transmission_auto": 0
}
```
**Expected 0-60**: ~2.5-3.0 seconds

### Example 2: Sports Car (Moderate)
```json
{
  "year": 2020,
  "horsepower": 400,
  "engine_size": 3.0,
  "torque": 500,
  "power_weight": 0.27,
  "torque_weight": 0.33,
  "drivetrain_awd": 0,
  "drivetrain_rwd": 1,
  "transmission_dct": 0,
  "transmission_auto": 1
}
```
**Expected 0-60**: ~4.0-4.5 seconds

### Example 3: Older Supercar (Slower)
```json
{
  "year": 2005,
  "horsepower": 500,
  "engine_size": 5.0,
  "torque": 600,
  "power_weight": 0.28,
  "torque_weight": 0.34,
  "drivetrain_awd": 0,
  "drivetrain_rwd": 1,
  "transmission_dct": 0,
  "transmission_auto": 0
}
```
**Expected 0-60**: ~4.5-5.0 seconds

---

## Training Your Model

### Feature Order (CRITICAL)

When training your model, ensure your features are in this exact order:

```python
import pandas as pd

# Your training dataframe should have columns in this order:
feature_columns = [
    'Year',
    'Horsepower',
    'Engine_Size',
    'Torque',
    'Power_Weight',
    'Torque_Weight',
    'Drivetrain_AWD',
    'Drivetrain_RWD',
    'Transmission_DCT',
    'Transmission_Auto'
]

X = df[feature_columns]
y = df['0-60_Time']  # or whatever your target column is named

# Train your model
model.fit(X, y)

# Save it
import pickle
pickle.dump(model, open('backend/model.pkl', 'wb'))
```

### One-Hot Encoding Example

If you need to create these binary columns from categorical data:

```python
# Example: Converting categorical to one-hot
df = pd.get_dummies(df, columns=['Drivetrain', 'Transmission'], drop_first=False)

# This creates columns like:
# - Drivetrain_FWD, Drivetrain_RWD, Drivetrain_AWD
# - Transmission_Manual, Transmission_Auto, Transmission_DCT

# Then drop the baseline categories (FWD and Manual):
df = df.drop(['Drivetrain_FWD', 'Transmission_Manual'], axis=1)
```

---

## Validation

### Check Feature Count
Your model should expect **exactly 10 features**.

```python
# After loading your model
print(f"Model expects {model.n_features_in_} features")  # Should be 10
```

### Check Feature Names
If your model was trained with a pandas DataFrame:

```python
print(model.feature_names_in_)
# Should output:
# ['Year', 'Horsepower', 'Engine_Size', 'Torque', 'Power_Weight', 
#  'Torque_Weight', 'Drivetrain_AWD', 'Drivetrain_RWD', 
#  'Transmission_DCT', 'Transmission_Auto']
```

---

## API Request Example

### Using cURL

```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2020,
    "horsepower": 500,
    "engine_size": 4.0,
    "torque": 500,
    "power_weight": 0.33,
    "torque_weight": 0.33,
    "drivetrain_awd": 0,
    "drivetrain_rwd": 1,
    "transmission_dct": 1,
    "transmission_auto": 0
  }'
```

### Expected Response

```json
{
  "predicted_0_60_time": 3.45
}
```

---

## Summary

✅ **10 total features**
✅ **6 numeric features** (continuous values)
✅ **4 binary features** (one-hot encoded categorical)
✅ **Feature order matters** - must match training data
✅ **UI handles encoding automatically** - users just select drivetrain and transmission

Your model is now ready to predict 0-60 times! 🏎️💨
