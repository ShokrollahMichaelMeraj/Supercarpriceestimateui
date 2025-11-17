# 🚀 Startup Instructions

## Quick Start (Development)

### 1. Install Backend Dependencies (First Time Only)

```bash
cd backend
pip install -r requirements.txt
```

This installs:
- FastAPI (web framework)
- Uvicorn (ASGI server)
- Pydantic (data validation)

### 2. Start the Backend (Terminal 1)

```bash
cd backend
uvicorn main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

**Keep this terminal running!**

### 3. Start the Frontend (Terminal 2)

Open a new terminal:

```bash
npm install  # First time only
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

### 4. Open in Browser

Go to: `http://localhost:5173`

---

## Testing the Prediction API

### Method 1: Use the Frontend

1. Navigate to the features section (scroll down)
2. Adjust the sliders (year, horsepower, weight, etc.)
3. Click "Predict 0-60 Time"
4. See the prediction appear in the red card

### Method 2: Test Backend Directly with Curl

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

### Method 3: Visit API Documentation

Open in browser: `http://localhost:8000/docs`

You'll see interactive FastAPI docs where you can test the API directly.

---

## Common Errors & Fixes

### ❌ Error: "Cannot connect to backend"

**Problem:** Backend server is not running

**Solution:**
1. Open a terminal
2. `cd backend`
3. `uvicorn main:app --reload --port 8000`
4. Refresh the frontend

### ❌ Error: "ModuleNotFoundError: No module named 'fastapi'"

**Problem:** Backend dependencies not installed

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### ❌ Error: "ferrari.glb 404 Not Found"

**Problem:** 3D model file is missing

**Solution:**
1. Download a Ferrari GLB model (see `/public/models/README.md`)
2. Place it in `/public/models/ferrari.glb`
3. Refresh browser

**Temporary workaround:** The app will show a placeholder red car until you add the real model.

### ❌ Port 8000 already in use

**Solution:** Find and kill the process:

**Mac/Linux:**
```bash
lsof -ti:8000 | xargs kill -9
```

**Windows:**
```bash
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F
```

### ❌ CORS errors

**Problem:** Backend not allowing frontend requests

**Solution:** Already configured in `backend/main.py` with `allow_origins=["*"]`

For production, change this to your specific domain.

---

## File Structure

```
├── backend/
│   ├── main.py              # FastAPI backend server
│   └── requirements.txt     # Python dependencies
├── components/
│   ├── CarViewer.tsx        # 3D Ferrari viewer
│   ├── FeatureSlider.tsx    # Input sliders + prediction
│   └── ...
├── public/
│   └── models/
│       └── ferrari.glb      # (You need to add this)
└── App.tsx                  # Main React app
```

---

## Development Workflow

### Normal Workflow (Both Frontend & Backend)

**Terminal 1:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

**Terminal 2:**
```bash
npm run dev
```

The `--reload` flag means the backend auto-restarts when you edit `main.py`.

### Frontend Only

Just run `npm run dev` - the prediction button will show an error, but everything else works.

### Backend Only

Start the backend and test with:
- Browser: `http://localhost:8000/docs`
- Curl: See "Method 2" above
- Postman or similar API testing tool

---

## Next Steps for ML Integration

### 1. Test the Dummy Model

The current `backend/main.py` has a simple formula that calculates 0-60 time based on horsepower/weight ratio. Test it first to ensure everything connects.

### 2. Train Your ML Model

Train your model using whatever framework you prefer:
- scikit-learn
- TensorFlow
- PyTorch
- XGBoost

Save it to a file (e.g., `model.pkl` or `model.h5`)

### 3. Load Your Model in Backend

Add to `backend/main.py`:

```python
import pickle

# Load model at startup
model = pickle.load(open('model.pkl', 'rb'))

@app.post("/api/predict")
def predict_0_60(specs: CarSpecs):
    # Prepare features
    features = [[
        specs.year,
        specs.mileage,
        specs.engine,
        specs.cylinders,
        specs.horsepower,
        # encode modifications...
        specs.topspeed,
        specs.weight
    ]]
    
    # Make prediction
    prediction = model.predict(features)[0]
    
    return {"predicted_0_60_time": round(prediction, 2)}
```

### 4. Handle Feature Encoding

If your model needs categorical encoding for "modifications":

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
    return encoding.get(mod, 0)
```

### 5. Add Preprocessing

If your model uses StandardScaler or MinMaxScaler:

```python
import pickle

model = pickle.load(open('model.pkl', 'rb'))
scaler = pickle.load(open('scaler.pkl', 'rb'))

@app.post("/api/predict")
def predict_0_60(specs: CarSpecs):
    features = [[...]]
    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)[0]
    return {"predicted_0_60_time": round(prediction, 2)}
```

---

## Production Deployment

### Backend Deployment

Deploy to one of these platforms:

1. **Heroku** (Easiest)
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

2. **Railway** (Free tier available)
   - Connect GitHub repo
   - Auto-deploys on push

3. **Render** (Free tier)
   - Connect GitHub repo
   - Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **AWS Lambda** (Serverless)
   - Use Mangum adapter for FastAPI
   - Deploy via SAM or Serverless Framework

### Frontend Deployment

1. Update the API URL in `/components/FeatureSlider.tsx`:

```typescript
const API_URL = 'https://your-backend.herokuapp.com';
const response = await fetch(`${API_URL}/api/predict`, {
  // ...
});
```

2. Build the frontend:

```bash
npm run build
```

3. Deploy the `dist/` folder to:
   - **Vercel** (recommended)
   - **Netlify**
   - **GitHub Pages**
   - **AWS S3 + CloudFront**

---

## Troubleshooting

### Check Backend is Running

Visit: `http://localhost:8000/docs`

If you see FastAPI documentation, the backend is working!

### Check Frontend API Call

Open browser console (F12), click "Predict 0-60 Time", and check:
- Network tab: Should see POST to `http://localhost:8000/api/predict`
- Response: Should see JSON with `predicted_0_60_time`
- Console: Check for any error messages

### Check Data Format

The frontend sends:
```json
{
  "year": 2020,
  "mileage": 20000.0,
  "engine": 4.0,
  "cylinders": 8,
  "horsepower": 500.0,
  "modifications": "stock",
  "topspeed": 280.0,
  "weight": 1500.0
}
```

Make sure your backend expects these exact field names and types.

---

## Additional Resources

- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Uvicorn Docs:** https://www.uvicorn.org
- **Three.js Docs:** https://threejs.org/docs
- **React Three Fiber:** https://docs.pmnd.rs/react-three-fiber

---

## Support

If you encounter issues:

1. ✅ Check both terminals are running
2. ✅ Check for error messages in terminals
3. ✅ Check browser console (F12) for errors
4. ✅ Test backend directly at `http://localhost:8000/docs`
5. ✅ Verify Python dependencies: `pip list | grep fastapi`
6. ✅ Try restarting both servers

Good luck with your ML model! 🏎️💨
