# Quick Start - Supercar 0-60 Prediction Tool

## Step 1: Install Dependencies

### Frontend
```bash
npm install
```

### Backend
```bash
cd backend
pip install -r requirements.txt
cd ..
```

## Step 2: Start Backend Server

**Terminal 1:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

Keep this running! You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

## Step 3: Start Frontend

**Terminal 2:**
```bash
npm run dev
```

You should see:
```
Local: http://localhost:5173/
```

## Step 4: Open in Browser

Navigate to: **http://localhost:5173**

## Step 5: (Optional) Add Ferrari 3D Model

**Option A: Use a free Ferrari model**

1. Go to [Sketchfab](https://sketchfab.com/search?q=ferrari&type=models)
2. Download a free GLB model
3. Rename to `ferrari.glb`
4. Place at: `/public/models/ferrari.glb`
5. Refresh browser

**Option B: Start with placeholder**

The viewer includes a built-in placeholder red Ferrari. Just run the app and the placeholder will display automatically until you add a real model.

## What You'll See

### Home Page
- Animated hero section with racing aesthetic
- Interactive 3D Ferrari model (drag to rotate)
- Dynamic tunnel lighting effect
- Animated statistics above the car

### Features Section
- 8 customizable sliders (year, horsepower, mileage, etc.)
- Modifications dropdown (stock, supercharged, etc.)
- "Predict 0-60 Time" button
- Real-time prediction results

### Testing the Prediction

1. Scroll to Features section
2. Adjust sliders to configure car specs
3. Click "Predict 0-60 Time"
4. See prediction in red gradient card

**Example result:** `3.45 seconds`

## Quick Customization

### Change 3D viewer settings
Edit `/components/CarViewer.tsx`:

```typescript
// Camera zoom (line 42)
const cameraDistance = isMobile ? 2.2 : 1.6;

// Model size (line 152)
const baseScale = isMobile ? 1.5 : 2;

// Rotation speed (line 522)
rotationRef.current.y += deltaX * 0.01; // Increase for faster rotation
```

See comprehensive comments in the file for all customization options.

### Change API endpoint
Edit `/components/FeatureSlider.tsx` (line 74):

```typescript
const response = await fetch('http://localhost:8000/api/predict', {
  // Change URL here for production
```

## Testing the Backend API

### Option 1: Interactive Docs
Visit: **http://localhost:8000/docs**

### Option 2: Curl
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

## Common Issues

### ❌ "Cannot connect to backend"
**Solution:** Make sure backend is running:
```bash
cd backend
uvicorn main:app --reload --port 8000
```

### ❌ "ModuleNotFoundError: No module named 'fastapi'"
**Solution:** Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### ❌ "ferrari.glb 404"
**Solution:** Either add the model (see Step 5) or ignore - placeholder works fine!

## Next Steps

1. ✅ Test the dummy prediction model
2. ⏳ Train your ML model
3. ⏳ Replace dummy logic in `backend/main.py`
4. ⏳ Deploy to production

## Need More Help?

- **Full startup guide:** `STARTUP_INSTRUCTIONS.md`
- **ML integration:** `BACKEND_INTEGRATION_GUIDE.md`
- **Backend docs:** `backend/README.md`
- **3D model setup:** `public/models/README.md`

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS + Three.js
- **Backend:** FastAPI + Python
- **ML:** Your choice (scikit-learn, TensorFlow, PyTorch, etc.)
