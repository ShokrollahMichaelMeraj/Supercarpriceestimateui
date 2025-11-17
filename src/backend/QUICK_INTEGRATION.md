# 🚀 Quick Model Integration (TL;DR)

## 3 Simple Steps

### Step 1: Save & Copy Your Model

```python
# In your Jupyter notebook or training script:
import pickle

# Save the model
pickle.dump(model, open('model.pkl', 'wb'))

# If you used a scaler:
pickle.dump(scaler, open('scaler.pkl', 'wb'))
```

Then copy the file(s) to the backend folder:
```bash
cp model.pkl /path/to/your/project/backend/
cp scaler.pkl /path/to/your/project/backend/  # if you have one
```

### Step 2: Verify Feature Order

The `/backend/main.py` is already configured with the correct feature order:

```python
features = np.array([[
    specs.year,
    specs.horsepower,
    specs.engine_size,
    specs.torque,
    specs.power_weight,
    specs.torque_weight,
    specs.drivetrain_awd,    # 0 or 1
    specs.drivetrain_rwd,    # 0 or 1
    specs.transmission_dct,  # 0 or 1
    specs.transmission_auto  # 0 or 1
]])
```

⚠️ **IMPORTANT:** If your training data has a different column order, update this array to match!

### Step 3: Run It!

```bash
# Terminal 1: Start backend
cd backend
pip install -r requirements.txt  # first time only
uvicorn main:app --reload --port 8000

# Terminal 2: Start frontend
npm run dev
```

## ✅ Done!

Visit `http://localhost:5173` and test your predictions!

---

## 🎯 File Locations Quick Reference

```
your-project/
├── backend/
│   ├── model.pkl       ← PUT YOUR MODEL HERE
│   ├── scaler.pkl      ← PUT YOUR SCALER HERE (if any)
│   ├── main.py         ← ALREADY UPDATED ✅
│   └── requirements.txt ← ALREADY UPDATED ✅
├── components/
└── App.tsx
```

---

## 🆘 Quick Troubleshooting

| Error | Fix |
|-------|-----|
| "model.pkl not found" | Copy model.pkl to `/backend/` folder |
| "No module named sklearn" | Run `pip install -r requirements.txt` |
| "Wrong number of features" | Check feature order in main.py matches training |
| "Predictions are weird" | Make sure you're using scaler if you trained with one |

---

**That's it! Your model is now live.** 🎉

For detailed explanation, see `MODEL_INTEGRATION.md`.
