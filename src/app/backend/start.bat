@echo off
REM Startup script for SuperCar 0-60 Predictor Backend (Windows)
REM This script sets up and starts the FastAPI server

echo ==========================================
echo SuperCar 0-60 Predictor - Backend Startup
echo ==========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python 3 is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

echo [OK] Python found
echo.

REM Check if virtual environment exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    echo [OK] Virtual environment created
) else (
    echo [OK] Virtual environment found
)
echo.

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo [OK] Virtual environment activated
echo.

REM Install/update dependencies
echo Installing dependencies...
python -m pip install --quiet --upgrade pip
pip install --quiet -r requirements.txt
echo [OK] Dependencies installed
echo.

REM Check if model files exist
echo Checking for model files...
set MODELS_FOUND=true

if not exist "models\nn_zero_to_sixty.keras" (
    echo [X] nn_zero_to_sixty.keras not found
    set MODELS_FOUND=false
)

if not exist "models\nn_scaler.pkl" (
    echo [X] nn_scaler.pkl not found
    set MODELS_FOUND=false
)

if not exist "models\feature_names.pkl" (
    echo [X] feature_names.pkl not found
    set MODELS_FOUND=false
)

if not exist "models\feature_info.pkl" (
    echo [X] feature_info.pkl not found
    set MODELS_FOUND=false
)

if "%MODELS_FOUND%"=="false" (
    echo.
    echo [!] Model files not found in \backend\models\
    echo.
    echo Please do ONE of the following:
    echo   1. Run: python download_models.py ^(after updating GitHub URL^)
    echo   2. Manually copy your model files to \backend\models\
    echo.
    echo Required files:
    echo   - nn_zero_to_sixty.keras
    echo   - nn_scaler.pkl
    echo   - feature_names.pkl
    echo   - feature_info.pkl
    echo.
    pause
    exit /b 1
) else (
    echo [OK] All model files found
)

echo.
echo ==========================================
echo Starting FastAPI Server...
echo ==========================================
echo.
echo API will be available at: http://localhost:8000
echo API documentation at: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.
echo TIP: After the server starts, open a new terminal and run:
echo      python test_api.py
echo      to verify everything is working correctly
echo.

REM Start the server
python main.py