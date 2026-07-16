# Model Files Directory

Place your trained model files in this directory. The backend expects the following files:

## Required Files

1. **nn_zero_to_sixty.keras** - Your trained TensorFlow/Keras neural network model
2. **nn_scaler.pkl** - Joblib-saved StandardScaler used for preprocessing
3. **feature_names.pkl** - Joblib-saved list of feature names
4. **feature_info.pkl** - Joblib-saved dictionary with feature information

## Feature Order

The model expects features in this exact order:
1. Year
2. Horsepower  
3. Engine_Size
4. Torque
5. Power_Weight (calculated: horsepower / weight)
6. Torque_Weight (calculated: torque / weight)
7. Weight (estimated from horsepower if not provided)
8. Drivetrain_RWD (binary: 0 or 1)
9. Transmission_DCT (binary: 0 or 1)

## Weight Estimation

If weight is not provided by the user, it's estimated using:
```
weight = horsepower * 5.9
```

This is based on the training data statistics (mean: 5.88 lbs/hp, median: 5.44 lbs/hp).

## Notes

- Only the first 7 numerical features are scaled using the StandardScaler
- The 2 binary features (Drivetrain_RWD, Transmission_DCT) are NOT scaled
- The model predicts 0-100 km/h acceleration time in seconds
