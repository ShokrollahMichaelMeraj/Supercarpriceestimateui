# 🏎️ SuperCar 0-60 Predictor - Complete Setup Guide

Welcome! This is your all-in-one guide to get your SuperCar 0-60 Predictor with ML predictions up and running.

---

## 🎯 What This Application Does

A full-stack web application featuring:
- **3D Ferrari Model Viewer** with drag-and-rotate functionality
- **Live ML Predictions** using TensorFlow/Keras neural networks
- **Interactive Configuration Sliders** for car specifications
- **Professional UI** with modern design and animations
- **FastAPI Backend** for real-time predictions

---

## 📋 Prerequisites

- **Python 3.8+** for the backend
- **Node.js** for the React frontend
- **Your ML Model Files** (4 files from your GitHub repo)

---

## 🚀 Quick Start (5 Minutes)

### 1️⃣ Add Your Model Files

Copy these 4 files to `/backend/models/`:
```
backend/models/
├── nn_zero_to_sixty.keras
├── nn_scaler.pkl
├── feature_names.pkl
└── feature_info.pkl
```

### 2️⃣ Start the Backend

```bash
cd backend

# macOS/Linux
./start.sh

# Windows  
start.bat
```

### 3️⃣ Test the API (Optional but Recommended)

In a new terminal:
```bash
cd backend
python test_api.py
```

### 4️⃣ Start the Frontend

Start your React app as usual. The frontend will automatically connect to `http://localhost:8000`.

### 5️⃣ Make Predictions!

1. Open your app in the browser
2. Scroll to "Configure Your Supercar"
3. Adjust the sliders
4. Click "Predict 0-100 km/h Time"
5. See your prediction! 🎉

---

## 📚 Documentation Guide

Choose the guide that fits your needs:

### 🏃 For Quick Setup
- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 3 steps
- **[MODEL_CONNECTION_COMPLETE.md](MODEL_CONNECTION_COMPLETE.md)** - Summary of all changes

### 🔧 For Backend Setup
- **[backend/README.md](backend/README.md)** - Backend-specific guide
- **[backend/start.sh](backend/start.sh)** - Automated startup (macOS/Linux)
- **[backend/start.bat](backend/start.bat)** - Automated startup (Windows)

### 📖 For Detailed Information
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[backend/download_models.py](backend/download_models.py)** - Download models from GitHub

### 🧪 For Testing
- **[backend/test_api.py](backend/test_api.py)** - Test all API endpoints
- **[backend/check_setup.py](backend/check_setup.py)** - Verify your setup

---

## 🛠️ Utility Scripts

### Check Your Setup
```bash
cd backend
python check_setup.py
```
Verifies Python version, packages, and model files.

### Test the API
```bash
cd backend
python test_api.py
```
Runs comprehensive API tests with sample predictions.

### Download Models from GitHub
```bash
cd backend
# Edit download_models.py to add your GitHub URL
python download_models.py
```
Automatically downloads all 4 model files.

---

## 📁 Project Structure

```
supercar-predictor/
│
├── App.tsx                          # Main React component
├── components/
│   ├── FeatureSlider.tsx           # ML prediction interface ⭐
│   ├── CarViewer.tsx               # 3D Ferrari viewer
│   ├── Header.tsx                  # Navigation
│   ├── Footer.tsx                  # Contact info (updated)
│   └── pages/
│       └── HomePage.tsx            # Main landing page
│
├── backend/
│   ├── main.py                     # FastAPI server ⭐
│   ├── requirements.txt            # Python dependencies
│   ├── start.sh                    # Startup script (Linux/Mac)
│   ├── start.bat                   # Startup script (Windows)
│   ├── test_api.py                 # API test suite
│   ├── check_setup.py              # Setup verification
│   ├── download_models.py          # Model downloader
│   └── models/                     # Place your models here ⭐
│       ├── nn_zero_to_sixty.keras
│       ├── nn_scaler.pkl
│       ├── feature_names.pkl
│       └── feature_info.pkl
│
├── QUICKSTART.md                   # Quick setup guide
├── DEPLOYMENT_GUIDE.md             # Detailed deployment
├── MODEL_CONNECTION_COMPLETE.md    # Changes summary
└── README_SETUP.md                 # This file
```

---

## 🔌 How It Works

### Frontend → Backend Flow

```
User adjusts sliders
    ↓
Frontend sends to: http://localhost:8000/predict
    ↓
Payload: {year, horsepower, engine_size, torque, weight, drivetrain_rwd, transmission_dct}
    ↓
Backend calculates: power_weight, torque_weight ratios
    ↓
Features scaled using nn_scaler.pkl
    ↓
Neural network predicts: 0-100 km/h time
    ↓
Backend returns: {prediction, power_weight_ratio, torque_weight_ratio, features_used}
    ↓
Frontend displays in orange gradient card
```

### Model Features (10 total)

**User Provides (7):**
1. Year (1990-2025)
2. Horsepower (100-1500 HP)
3. Engine Size (1.0-10.0L)
4. Torque (100-1500 lb-ft)
5. Weight (2000-7000 lbs) - REQUIRED
6. Drivetrain RWD (binary 0/1)
7. Transmission DCT (binary 0/1)

**Backend Calculates (2):**
8. Power/Weight Ratio
9. Torque/Weight Ratio

**Plus one more binary feature as per your model**

---

## ✅ Testing Checklist

After setup, verify everything works:

- [ ] Backend starts without errors
- [ ] Visit http://localhost:8000 shows API status
- [ ] Visit http://localhost:8000/docs shows interactive docs
- [ ] Run `python test_api.py` passes all tests
- [ ] Frontend connects to backend
- [ ] Predictions work in the UI
- [ ] Results display in the orange card

---

## 🎨 Recent Updates

### Contact Information (Footer)
- ✅ Removed all social media icons
- ✅ Email: mmeraj@sfu.ca
- ✅ Phone: +1 (604) 345-3598
- ✅ Address: Vancouver, British Columbia, Canada

### Backend Features
- ✅ FastAPI with TensorFlow/Keras
- ✅ Weight is required field (no estimation)
- ✅ Auto-calculates power/weight ratios
- ✅ CORS enabled for frontend
- ✅ Interactive API docs
- ✅ Comprehensive error handling
- ✅ Health check endpoints

---

## 🚨 Troubleshooting

### Backend won't start
```bash
cd backend
python check_setup.py
```
This will identify the issue.

### Model files missing
- Ensure all 4 files are in `/backend/models/`
- Check file names are exact matches
- Try: `python download_models.py` (after updating GitHub URL)

### Frontend can't connect
- Backend must be running on port 8000
- Check backend terminal for errors
- Verify: `curl http://localhost:8000`

### Prediction errors
- Check all inputs are within valid ranges
- Review backend terminal for detailed errors
- Ensure weight is provided (required)

### Port already in use
Edit `/backend/main.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=8001)  # Change port
```
Then update frontend URL in `/components/FeatureSlider.tsx`

---

## 🌐 Production Deployment

Ready for production? Here's the checklist:

### Backend
- [ ] Update CORS to your domain
- [ ] Set up environment variables
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up monitoring
- [ ] Deploy to cloud (AWS, GCP, Railway, Render)

### Frontend
- [ ] Update API URL to production backend
- [ ] Build production bundle
- [ ] Deploy to hosting (Vercel, Netlify, etc.)
- [ ] Test end-to-end

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for details.

---

## 📊 Example Usage

### Sample Request
```json
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

### Sample Response
```json
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
    "drivetrain_rwd": true,
    "transmission_dct": true
  }
}
```

---

## 🎓 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Basic health check |
| `/health` | GET | Detailed status + contact info |
| `/model-info` | GET | Model metadata |
| `/predict` | POST | Make a prediction |
| `/docs` | GET | Interactive API docs |

---

## 📞 Contact & Support

**Email:** mmeraj@sfu.ca  
**Phone:** +1 (604) 345-3598  
**Location:** Vancouver, British Columbia, Canada

---

## 🎉 You're All Set!

Your SuperCar 0-60 Predictor is ready to go! Just:

1. ✅ Add model files to `/backend/models/`
2. ✅ Run `./start.sh` or `start.bat`
3. ✅ Test with `python test_api.py`
4. ✅ Start making predictions!

**Happy predicting! 🏎️💨**

---

## 🔗 Quick Links

- [Quick Start Guide](QUICKSTART.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Backend README](backend/README.md)
- [API Test Suite](backend/test_api.py)
- [Setup Checker](backend/check_setup.py)

---

*Last Updated: December 2024*
