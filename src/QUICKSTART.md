# Quick Start Guide

## Getting Your SuperCar 0-60 Predictor Running

This guide will help you get the full application running with live ML predictions in just a few steps!

---

## 📋 What You Need

1. ✅ Python 3.8 or higher
2. ✅ Node.js (for the React frontend)
3. ✅ Your ML model files from GitHub:
   - `nn_zero_to_sixty.keras`
   - `nn_scaler.pkl`
   - `feature_names.pkl`
   - `feature_info.pkl`

---

## 🚀 Quick Setup (3 Easy Steps)

### Step 1: Add Your Model Files

Copy your 4 model files into the `/backend/models/` directory:

```
backend/
└── models/
    ├── nn_zero_to_sixty.keras
    ├── nn_scaler.pkl
    ├── feature_names.pkl
    └── feature_info.pkl
```

**Alternative:** Use the download script
```bash
cd backend
# First, edit download_models.py and update your GitHub repo URL
python download_models.py
```

### Step 2: Start the Backend

#### On macOS/Linux:
```bash
cd backend
chmod +x start.sh
./start.sh
```

#### On Windows:
```bash
cd backend
start.bat
```

#### Manual Start:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

You should see:
```
✓ Model loaded successfully
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 3: Start the Frontend

Open a new terminal and run your React app. The app will automatically connect to the backend at `http://localhost:8000`.

---

## ✅ Testing Your Setup

### 1. Test the API
Open your browser and visit: `http://localhost:8000`

You should see:
```json
{
  "status": "running",
  "message": "Car Acceleration Predictor API",
  "model_loaded": true
}
```

### 2. View API Documentation
Visit: `http://localhost:8000/docs`

You'll see interactive API documentation where you can test predictions directly!

### 3. Test from the Frontend
1. Navigate to your React app in the browser
2. Scroll to "Configure Your Supercar" section
3. Adjust the sliders:
   - Year: 2020
   - Horsepower: 500 HP
   - Engine Size: 4.0L
   - Torque: 500 lb-ft
   - Weight: 3500 lbs
   - Drivetrain: RWD
   - Transmission: DCT
4. Click "Predict 0-100 km/h Time"
5. See your prediction appear below! 🎉

---

## 📊 Understanding the Features

The ML model uses these inputs:

| Feature | Range | Description |
|---------|-------|-------------|
| Year | 1990-2025 | Manufacturing year |
| Horsepower | 100-1500 HP | Engine power output |
| Engine Size | 1.0-10.0L | Engine displacement |
| Torque | 100-1500 lb-ft | Torque output |
| Weight | 2000-7000 lbs | Vehicle weight (REQUIRED) |
| Drivetrain | RWD / FWD-AWD | Rear-wheel or front/all-wheel drive |
| Transmission | Auto / DCT | Automatic or dual-clutch transmission |

The backend automatically calculates:
- **Power-to-Weight Ratio**: HP / Weight
- **Torque-to-Weight Ratio**: Torque / Weight

---

## 🎯 What You Get

The prediction returns:
- **0-100 km/h time** in seconds
- **Power/Weight ratio**
- **Torque/Weight ratio**
- **Configuration details** (RWD, DCT, etc.)

Example response:
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

## 🔧 Troubleshooting

### Backend won't start
- ✅ Check Python version: `python --version` (need 3.8+)
- ✅ Ensure all 4 model files are in `/backend/models/`
- ✅ Try manual installation: `pip install -r requirements.txt`

### Frontend can't connect
- ✅ Verify backend is running on port 8000
- ✅ Check browser console for errors
- ✅ Ensure no firewall blocking localhost:8000

### Prediction errors
- ✅ Check all input values are within ranges
- ✅ Review backend terminal for error messages
- ✅ Verify weight is provided (required field)

### Model files missing
```bash
# Check if files exist
cd backend/models
ls -la  # On Windows: dir
```

---

## 📁 Project Structure

```
your-project/
├── App.tsx                    # Main React component
├── components/
│   ├── FeatureSlider.tsx     # ML prediction interface
│   ├── CarViewer.tsx         # 3D Ferrari viewer
│   ├── Header.tsx            # Navigation
│   └── Footer.tsx            # Contact info (updated!)
├── backend/
│   ├── main.py               # FastAPI server
│   ├── requirements.txt      # Python dependencies
│   ├── start.sh              # Linux/Mac startup
│   ├── start.bat             # Windows startup
│   ├── download_models.py    # GitHub model downloader
│   └── models/               # Place your .keras and .pkl files here
│       ├── nn_zero_to_sixty.keras
│       ├── nn_scaler.pkl
│       ├── feature_names.pkl
│       └── feature_info.pkl
├── DEPLOYMENT_GUIDE.md       # Detailed deployment instructions
└── QUICKSTART.md            # This file
```

---

## 🌟 Next Steps

1. **Test with different cars**: Try various configurations to see how the model performs
2. **Check accuracy**: Compare predictions with real-world 0-60 times
3. **Deploy to production**: See `DEPLOYMENT_GUIDE.md` for cloud deployment
4. **Add more features**: Consider adding more car specifications
5. **Monitor performance**: Track prediction accuracy and response times

---

## 📧 Contact & Support

- **Email**: mmeraj@sfu.ca
- **Phone**: +1 (604) 345-3598
- **Location**: Vancouver, British Columbia, Canada

---

## 🎓 Technical Details

For detailed information about:
- API endpoints and responses
- Feature engineering
- Model architecture
- Production deployment
- CORS configuration
- Error handling

See: [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md)

---

## ✨ Recent Updates

- ✅ Social media icons removed from footer
- ✅ Contact info updated to mmeraj@sfu.ca
- ✅ Phone number updated to +1 (604) 345-3598
- ✅ Address updated to Vancouver, British Columbia, Canada
- ✅ FastAPI backend ready for live predictions
- ✅ TensorFlow/Keras model integration complete
- ✅ Weight field now required (no estimation)
- ✅ Frontend/backend connection established

---

**Ready to predict some acceleration times? Let's go! 🏎️💨**
