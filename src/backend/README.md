# FastAPI Backend for SuperCar 0-60 Predictor

This is the backend API for the SuperCar 0-60 Predictor application. It uses a TensorFlow/Keras neural network to predict vehicle acceleration times.

## 🚀 Quick Start

### Option 1: Automated (Recommended)

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```bash
start.bat
```

### Option 2: Manual Setup

```bash
# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Start server
python main.py
```

## 📦 Required Model Files

Place these 4 files in the `models/` directory:

1. **nn_zero_to_sixty.keras** - Trained neural network model
2. **nn_scaler.pkl** - StandardScaler for preprocessing
3. **feature_names.pkl** - List of feature names
4. **feature_info.pkl** - Feature metadata

### Download from GitHub

```bash
# Edit download_models.py first to add your GitHub URL
python download_models.py
```

## 🌐 API Endpoints

Once running at `http://localhost:8000`:

### `GET /`
Health check - verify API is running

### `POST /predict`
Make a prediction

**Request:**
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

**Response:**
```json
{
  "prediction": 3.45,
  "unit": "seconds (0-100 km/h)",
  "power_weight_ratio": 0.1429,
  "torque_weight_ratio": 0.1429,
  "estimated_weight": 3500,
  "features_used": { ... }
}
```

### `GET /model-info`
Get model metadata and feature information

### `GET /health`
Detailed health check with contact information

### `GET /docs`
Interactive API documentation (Swagger UI)

## 🔧 Dependencies

- **FastAPI** - Modern web framework
- **Uvicorn** - ASGI server
- **TensorFlow** - Neural network model
- **Joblib** - Preprocessing artifacts
- **NumPy** - Numerical operations
- **Pydantic** - Data validation

## 📊 Model Features

The model expects these inputs:

| Feature | Type | Range | Required |
|---------|------|-------|----------|
| Year | float | 1990-2025 | ✅ |
| Horsepower | float | 100-1500 | ✅ |
| Engine_Size | float | 1.0-10.0 | ✅ |
| Torque | float | 100-1500 | ✅ |
| Weight | float | 2000-7000 | ✅ |
| Drivetrain_RWD | int | 0 or 1 | ✅ |
| Transmission_DCT | int | 0 or 1 | ✅ |

**Calculated Features:**
- Power_Weight = Horsepower / Weight
- Torque_Weight = Torque / Weight

## 🐛 Troubleshooting

### "Could not find model files"
Ensure all 4 files are in `/backend/models/` with correct names

### "Module not found"
Run: `pip install -r requirements.txt`

### Port 8000 already in use
Change port in `main.py`: `uvicorn.run(app, host="0.0.0.0", port=8001)`

### CORS errors
Update `allow_origins` in `main.py` to match your frontend URL

## 📁 Directory Structure

```
backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
├── start.sh            # Linux/Mac startup script
├── start.bat           # Windows startup script
├── download_models.py  # Model downloader
├── models/             # Model files go here
│   ├── nn_zero_to_sixty.keras
│   ├── nn_scaler.pkl
│   ├── feature_names.pkl
│   └── feature_info.pkl
└── README.md          # This file
```

## 🌍 Production Deployment

For production, consider:

1. Update CORS origins to your domain
2. Add authentication/API keys
3. Enable HTTPS
4. Add rate limiting
5. Set up monitoring
6. Use environment variables
7. Deploy to cloud platform (AWS, GCP, Azure, Railway, Render, etc.)

## 📧 Contact

- **Email**: mmeraj@sfu.ca
- **Phone**: +1 (604) 345-3598
- **Location**: Vancouver, British Columbia, Canada

## 📚 Additional Resources

- [QUICKSTART.md](../QUICKSTART.md) - Complete setup guide
- [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) - Detailed deployment instructions
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [TensorFlow Documentation](https://www.tensorflow.org/)

---

**Ready to predict? Start the server and visit http://localhost:8000/docs** 🏎️