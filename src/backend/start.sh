#!/bin/bash

# Startup script for SuperCar 0-60 Predictor Backend
# This script sets up and starts the FastAPI server

echo "=========================================="
echo "SuperCar 0-60 Predictor - Backend Startup"
echo "=========================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✓ Python 3 found: $(python3 --version)"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo "✓ Virtual environment created"
else
    echo "✓ Virtual environment found"
fi
echo ""

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate
echo "✓ Virtual environment activated"
echo ""

# Install/update dependencies
echo "Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo "✓ Dependencies installed"
echo ""

# Check if model files exist
echo "Checking for model files..."
MODELS_FOUND=true

if [ ! -f "models/nn_zero_to_sixty.keras" ]; then
    echo "❌ nn_zero_to_sixty.keras not found"
    MODELS_FOUND=false
fi

if [ ! -f "models/nn_scaler.pkl" ]; then
    echo "❌ nn_scaler.pkl not found"
    MODELS_FOUND=false
fi

if [ ! -f "models/feature_names.pkl" ]; then
    echo "❌ feature_names.pkl not found"
    MODELS_FOUND=false
fi

if [ ! -f "models/feature_info.pkl" ]; then
    echo "❌ feature_info.pkl not found"
    MODELS_FOUND=false
fi

if [ "$MODELS_FOUND" = false ]; then
    echo ""
    echo "⚠️  Model files not found in /backend/models/"
    echo ""
    echo "Please do ONE of the following:"
    echo "  1. Run: python download_models.py (after updating GitHub URL)"
    echo "  2. Manually copy your model files to /backend/models/"
    echo ""
    echo "Required files:"
    echo "  - nn_zero_to_sixty.keras"
    echo "  - nn_scaler.pkl"
    echo "  - feature_names.pkl"
    echo "  - feature_info.pkl"
    echo ""
    read -p "Press Enter to exit..."
    exit 1
else
    echo "✓ All model files found"
fi

echo ""
echo "=========================================="
echo "Starting FastAPI Server..."
echo "=========================================="
echo ""
echo "API will be available at: http://localhost:8000"
echo "API documentation at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "TIP: After the server starts, open a new terminal and run:"
echo "     python test_api.py"
echo "     to verify everything is working correctly"
echo ""

# Start the server
python main.py