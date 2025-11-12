# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow your frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict this later to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define what data we expect from the frontend
class CarSpecs(BaseModel):
    year: int
    mileage: float
    engine: float
    cylinders: int
    horsepower: float
    modifications: str
    topspeed: float
    weight: float

@app.post("/api/predict")
def predict_0_60(specs: CarSpecs):
    """
    simple dummy model just for testing that everything connects
    later you'll replace this with your trained ML model.
    """

    # mock calculation for demonstration
    base_time = 10.0
    time_adjustment = (
        (specs.horsepower / specs.weight) * 5
        + (2025 - specs.year) * 0.02
        - (specs.topspeed / 1000)
    )
    predicted = max(2.0, base_time - time_adjustment)

    return {"predicted_0_60_time": round(predicted, 2)}
