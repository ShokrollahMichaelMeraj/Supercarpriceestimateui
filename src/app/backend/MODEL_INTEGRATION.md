# 🤖 ML Model Integration Guide

## Step-by-Step: Adding Your Trained Model

### 1. ✅ Save Your Model Files

After training your model, save it to the backend directory:

```python
import pickle

# Save the model
pickle.dump(model, open('backend/model.pkl', 'wb'))

# If you used StandardScaler or MinMaxScaler:
pickle.dump(scaler, open('backend/scaler.pkl', 'wb'))

# If you used LabelEncoder or OneHotEncoder:
pickle.dump(encoder, open('backend/encoder.pkl', 'wb'))
```

### 2. 📁 Place Files in Backend Folder

Your backend folder should look like this:

```
backend/
├── model.pkl          ← Your trained model
├── scaler.pkl         ← (Optional) Your scaler
├── main.py            ← Already updated!
├── requirements.txt   ← Already updated!
└── README.md
```

### 3. ⚙️ Update Feature Order (CRITICAL!)

Edit `/backend/main.py` line 62-69 to match YOUR training data column order:

```python
features = np.array([[
    specs.year,           # Column 0 in your training data
    specs.mileage,        # Column 1
    specs.engine,         # Column 2
    specs.cylinders,      # Column 3
    specs.horsepower,     # Column 4
    encode_modification(specs.modifications),  # Column 5
    specs.topspeed,       # Column 6
    specs.weight          # Column 7
]])
```

**⚠️ IMPORTANT:** The order MUST match exactly how you trained the model!

### 4. 🔧 Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

This installs:
- fastapi
- uvicorn[standard]
- pydantic
- scikit-learn
- numpy
- pandas

### 5. 🚀 Start the Server

```bash
cd backend
uvicorn main:app --reload --port 8000
```

You should see:
```
✅ Model loaded successfully!
✅ Scaler loaded successfully!
INFO:     Uvicorn running on http://127.0.0.1:8000
```

If you see warnings, that's okay! The server will use the dummy model as fallback.

### 6. 🧪 Test Your Model

**Option 1: Use the Frontend**
1. Start frontend: `npm run dev`
2. Open `http://localhost:5173`
3. Scroll to Features section
4. Adjust sliders and click "Predict 0-60 Time"

**Option 2: Use API Docs**
1. Visit `http://localhost:8000/docs`
2. Click "POST /api/predict"
3. Click "Try it out"
4. Enter test data
5. Click "Execute"

**Option 3: Use Curl**
```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2020,
    "mileage": 20000,
    "engine": 4.0,
    "cylinders": 8,
    "horsepower": 500,
    "modifications": "stock",
    "topspeed": 280,
    "weight": 1500
  }'
```

Expected response:
```json
{"predicted_0_60_time": 3.45}
```

---

## 🔍 Troubleshooting

### Error: "FileNotFoundError: model.pkl"

**Problem:** Model file not in the right location

**Solution:**
```bash
# Make sure you're in the project root
ls backend/

# You should see model.pkl
# If not, copy it there:
cp /path/to/your/model.pkl backend/model.pkl
```

### Error: "ValueError: X has Y features but model expects Z"

**Problem:** Feature order or count mismatch

**Solution:** Check that the features array in `main.py` matches your training data exactly.

### Error: "ModuleNotFoundError: No module named 'sklearn'"

**Problem:** Dependencies not installed

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### Predictions are way off

**Problem:** Feature scaling or encoding mismatch

**Checklist:**
- [ ] Did you use scaling during training? If yes, make sure `scaler.pkl` is loaded
- [ ] Are categorical variables encoded the same way?
- [ ] Is the feature order exactly the same?
- [ ] Are you using the same preprocessing steps?

---

## 📊 Common Model Formats

### Scikit-Learn (Pickle)
```python
# Save
import pickle
pickle.dump(model, open('backend/model.pkl', 'wb'))

# Load (already in main.py)
model = pickle.load(open('model.pkl', 'rb'))
```

### Scikit-Learn (Joblib) - Recommended for large models
```python
# Save
import joblib
joblib.dump(model, 'backend/model.joblib')

# Load (update main.py)
import joblib
model = joblib.load('model.joblib')
```

### TensorFlow/Keras
```python
# Save
model.save('backend/model.h5')

# Load (update main.py)
from tensorflow import keras
model = keras.models.load_model('model.h5')
```

### PyTorch
```python
# Save
torch.save(model.state_dict(), 'backend/model.pt')

# Load (update main.py)
import torch
model = YourModelClass()
model.load_state_dict(torch.load('model.pt'))
model.eval()
```

---

## 🎯 Feature Encoding Examples

### If you used Label Encoding:
```python
# During training
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['modifications_encoded'] = le.fit_transform(df['modifications'])
pickle.dump(le, open('backend/encoder.pkl', 'wb'))

# In main.py
encoder = pickle.load(open('encoder.pkl', 'rb'))
encoded_mod = encoder.transform([specs.modifications])[0]
```

### If you used One-Hot Encoding:
```python
# During training
df_encoded = pd.get_dummies(df, columns=['modifications'])
# Remember to save the column order!

# In main.py - you'll need to create the same dummy variables
```

### If you used Custom Encoding (like in the current code):
```python
def encode_modification(mod: str) -> int:
    encoding = {
        "stock": 0,
        "supercharged": 1,
        "turbocharged": 2,
        "vspec": 3,
        "track": 4,
        "nismo": 5
    }
    return encoding.get(mod.lower(), 0)
```

---

## 📝 Checklist Before Testing

- [ ] Model file (`model.pkl`) is in `/backend/` directory
- [ ] Scaler file (`scaler.pkl`) is in `/backend/` if you used scaling
- [ ] Dependencies installed: `pip install -r requirements.txt`
- [ ] Feature order in `main.py` matches training data
- [ ] Categorical encoding matches training process
- [ ] Backend server is running: `uvicorn main:app --reload --port 8000`
- [ ] No errors in terminal output
- [ ] Frontend is running: `npm run dev`
- [ ] Test prediction returns reasonable values (2-15 seconds for 0-60)

---

## 🎓 Model Performance Tips

### Add Confidence Intervals
```python
# For models that support it (e.g., scikit-learn with predict_proba)
prediction = model.predict(features)[0]
# Some models support prediction intervals

return {
    "predicted_0_60_time": round(float(prediction), 2),
    "confidence": "high"  # You can add your own logic
}
```

### Add Model Metrics
```python
# Return additional info
return {
    "predicted_0_60_time": round(float(prediction), 2),
    "model_version": "v1.0",
    "last_trained": "2024-11-17"
}
```

### Input Validation
```python
# Add validation before prediction
if specs.horsepower < 100 or specs.horsepower > 1000:
    raise HTTPException(status_code=400, detail="Horsepower out of valid range")
```

---

## 🚀 You're All Set!

Your model is now integrated! The updated `main.py` will:
1. ✅ Load your model on server startup
2. ✅ Load your scaler (if present)
3. ✅ Prepare features in the correct order
4. ✅ Apply scaling (if scaler exists)
5. ✅ Make predictions using your real model
6. ✅ Return formatted results to the frontend

**Next Steps:**
1. Copy your `model.pkl` to `/backend/`
2. Start the server
3. Test predictions
4. Deploy to production when ready!

Good luck! 🏎️💨
