# 🏎️ Supercar 0-60 Prediction Tool

A full-stack web application featuring an interactive 3D Ferrari model viewer and machine learning-powered 0-60 mph acceleration time predictions.

Built with **React**, **Three.js**, **FastAPI**, and designed for F1/automotive internship applications.

![Preview](https://img.shields.io/badge/status-prototype-orange) ![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

### 🎨 Frontend
- **Interactive 3D Ferrari Model** with drag-to-rotate functionality
- **Dynamic Lighting System** - Motion lights locked to the car + animated tunnel speed effect
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Animated Statistics** - Letter-by-letter stat animations
- **Feature Sliders** - Configure car specs (year, horsepower, mileage, etc.)
- **Real-time Predictions** - Live 0-60 time predictions from ML model

### ⚙️ Backend
- **FastAPI REST API** - High-performance Python backend
- **ML Model Integration** - Easily plug in your trained model
- **CORS Enabled** - Ready for cross-origin requests
- **Interactive API Docs** - Auto-generated Swagger UI

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd supercar-prediction-tool
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 4. Start Backend Server

**Terminal 1:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

### 5. Start Frontend Development Server

**Terminal 2:**
```bash
npm run dev
```

### 6. Open in Browser

Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
├── backend/
│   ├── main.py              # FastAPI backend
│   ├── requirements.txt     # Python dependencies
│   └── README.md            # Backend documentation
├── components/
│   ├── CarViewer.tsx        # 3D Ferrari viewer
│   ├── FeatureSlider.tsx    # Input sliders + prediction
│   ├── Header.tsx           # Navigation header
│   ├── HeroSection.tsx      # Landing section
│   ├── pages/               # Page components
│   └── ui/                  # UI components
├── public/
│   └── models/
│       └── ferrari.glb      # 3D car model (you need to add this)
├── styles/
│   └── globals.css          # Global styles
├── App.tsx                  # Main React app
└── README.md                # This file
```

---

## 🎮 Usage

### Making Predictions

1. Scroll to the **Features** section
2. Adjust the sliders:
   - **Year** (2000-2025)
   - **Mileage** (0-200,000 km)
   - **Engine Size** (1.0-8.0L)
   - **Cylinders** (3-16)
   - **Horsepower** (100-1000 HP)
   - **Modifications** (Stock, Supercharged, Turbocharged, etc.)
   - **Top Speed** (150-400 km/h)
   - **Weight** (800-2500 kg)
3. Click **"Predict 0-60 Time"**
4. View the prediction in the red gradient card

### Testing the API

Visit the interactive API docs at:
```
http://localhost:8000/docs
```

Or test with curl:
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

---

## 🤖 Integrating Your ML Model

The current backend uses a **dummy model** for testing. Here's how to integrate your trained model:

### 1. Train and Save Your Model

```python
import pickle
from sklearn.ensemble import RandomForestRegressor

# Train your model
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Save it
pickle.dump(model, open('backend/model.pkl', 'wb'))
```

### 2. Load Model in Backend

Edit `backend/main.py`:

```python
import pickle

# Load your model
model = pickle.load(open('model.pkl', 'rb'))

@app.post("/api/predict")
def predict_0_60(specs: CarSpecs):
    features = [[
        specs.year,
        specs.mileage,
        specs.engine,
        specs.cylinders,
        specs.horsepower,
        # encode modifications if needed
        specs.topspeed,
        specs.weight
    ]]
    
    prediction = model.predict(features)[0]
    return {"predicted_0_60_time": round(float(prediction), 2)}
```

See `BACKEND_INTEGRATION_GUIDE.md` for full details.

---

## 🎨 3D Model Setup

The app requires a Ferrari GLB model file.

### Option 1: Download Free Model

1. Visit [Sketchfab](https://sketchfab.com/search?q=ferrari&type=models)
2. Download a free Ferrari GLB model
3. Rename it to `ferrari.glb`
4. Place it in `/public/models/ferrari.glb`

### Option 2: Use Placeholder

The app will display a placeholder red car geometry if `ferrari.glb` is missing.

See `/public/models/README.md` for more details.

---

## 🛠️ Customization

### Adjust 3D Viewer Settings

Edit `/components/CarViewer.tsx`:

```typescript
// Camera zoom (line 42)
const cameraDistance = isMobile ? 2.2 : 1.6;

// Model size (line 152)
const baseScale = isMobile ? 1.5 : 2;

// Rotation speed (line 403)
rotationRef.current.y += deltaX * 0.01; // Increase 0.01 for faster rotation

// Tunnel effect speed (line 118)
speed = 0.08 + Math.random() * 0.04;
```

See comprehensive customization guide in the file comments.

### Change API Endpoint

Edit `/components/FeatureSlider.tsx` (line 74):

```typescript
const response = await fetch('http://localhost:8000/api/predict', {
  // Change URL for production
```

---

## 📦 Deployment

### Backend

**Heroku:**
```bash
cd backend
heroku create your-app-name
git push heroku main
```

**Railway:**
1. Connect GitHub repo
2. Auto-deploys on push

**Render:**
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend

**Vercel (Recommended):**
```bash
npm run build
vercel --prod
```

**Netlify:**
```bash
npm run build
# Deploy the dist/ folder
```

Update the API URL in `FeatureSlider.tsx` to your production backend URL.

---

## 🐛 Troubleshooting

### Backend not connecting

**Error:** "Cannot connect to backend"

**Solution:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

### Missing dependencies

**Error:** "ModuleNotFoundError: No module named 'fastapi'"

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### 3D model not loading

**Error:** "ferrari.glb 404"

**Solution:** Add the GLB file to `/public/models/ferrari.glb` (see above)

### Port already in use

**Mac/Linux:**
```bash
lsof -ti:8000 | xargs kill -9
```

**Windows:**
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

---

## 📚 Documentation

- **[STARTUP_INSTRUCTIONS.md](./STARTUP_INSTRUCTIONS.md)** - Detailed startup guide
- **[BACKEND_INTEGRATION_GUIDE.md](./BACKEND_INTEGRATION_GUIDE.md)** - ML model integration
- **[backend/README.md](./backend/README.md)** - Backend API documentation
- **[public/models/README.md](./public/models/README.md)** - 3D model setup

---

## 🧰 Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Three.js** - 3D graphics
- **Motion** (Framer Motion) - Animations
- **Vite** - Build tool

### Backend
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Python** - Backend language

### ML (Your Choice)
- **scikit-learn** - Traditional ML
- **TensorFlow** - Deep learning
- **PyTorch** - Deep learning
- **XGBoost** - Gradient boosting

---

## 🎯 Use Cases

- **Portfolio Project** - Showcase full-stack + ML skills
- **Internship Applications** - F1 teams, automotive companies
- **Learning Project** - Practice React, Three.js, FastAPI
- **Hackathon Project** - Impressive tech demo
- **Research Tool** - Car performance analysis

---

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Authors

Built by computer science students as a 2025 prototype project.

---

## 🙏 Acknowledgments

- **Three.js** - 3D graphics library
- **FastAPI** - Modern Python web framework
- **Sketchfab** - 3D model resources
- **Tailwind CSS** - Utility-first CSS framework

---

## 📞 Support

For issues or questions:
1. Check the documentation files listed above
2. Review the troubleshooting section
3. Open a GitHub issue
4. Check browser console (F12) for errors

---

**Happy coding! 🏎️💨**
