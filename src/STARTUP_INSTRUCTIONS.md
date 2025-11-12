# 🚀 Startup Instructions

## Quick Start (Development)

### 1. Start the Backend (Terminal 1)

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

**Keep this terminal running!**

### 2. Start the Frontend (Terminal 2)

Open a new terminal:

```bash
npm install
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

### 3. Open in Browser

Go to: `http://localhost:5173`

---

## Common Errors & Fixes

### ❌ Error: "Cannot connect to backend"

**Problem:** Backend server is not running

**Solution:**
1. Open a terminal
2. `cd backend`
3. `uvicorn main:app --reload --port 8000`
4. Refresh the frontend

### ❌ Error: "ferrari.glb 404 Not Found"

**Problem:** 3D model file is missing

**Solution:**
1. Download a Ferrari GLB model (see `/public/models/README.md`)
2. Place it in `/public/models/ferrari.glb`
3. Refresh browser

**Temporary workaround:** The app will show a placeholder red car until you add the real model.

### ❌ Warning: "Multiple instances of Three.js"

**Problem:** Fixed! This was due to incorrect import path.

**If you still see this:** Clear your node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

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

---

## Production Deployment

### Backend

Deploy to Heroku, Railway, or AWS Lambda. Update the API URL in `/components/FeatureSlider.tsx`:

```typescript
const response = await fetch('https://your-backend.herokuapp.com/api/predict', {
```

### Frontend

Build and deploy:

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or GitHub Pages.

---

## File Checklist

✅ **Required Files:**
- `/backend/main.py` - Backend API (exists)
- `/public/models/ferrari.glb` - 3D car model (YOU NEED TO ADD THIS)

✅ **Optional:**
- `.env` - Environment variables for production API URL

---

## Testing the Integration

1. **Backend is running** ✓
   - Visit: `http://localhost:8000/docs` 
   - You should see FastAPI documentation

2. **Frontend is running** ✓
   - Visit: `http://localhost:5173`
   - You should see the website

3. **API connection works** ✓
   - Adjust the sliders
   - Click "Predict 0-60 Time"
   - You should see a prediction appear

---

## Development Workflow

**Normal workflow:**

1. Start backend: `cd backend && uvicorn main:app --reload --port 8000`
2. Start frontend: `npm run dev` (in root directory)
3. Make changes to your ML model in `backend/main.py`
4. Changes auto-reload thanks to `--reload` flag

**Working on frontend only:**

Just run `npm run dev` - the prediction button will show an error, but everything else works.

**Working on backend only:**

Test with curl or Postman:

```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"year":2020,"mileage":20000,"engine":4.0,"cylinders":8,"horsepower":500,"modifications":"stock","topspeed":280,"weight":1500}'
```

---

## Next Steps

1. ✅ Get both servers running
2. ✅ Test the dummy prediction
3. ⏳ Add ferrari.glb model (optional but recommended)
4. ⏳ Train your ML model
5. ⏳ Replace the dummy prediction logic in `backend/main.py`
6. ⏳ Deploy to production

---

## Help

If you're still having issues:

1. Check both terminals are running
2. Check for error messages in the terminal
3. Check browser console (F12) for errors
4. Ensure you're using `http://localhost:5173` not a Figma preview URL
5. Try restarting both servers

Happy coding! 🏎️💨
