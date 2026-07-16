#!/usr/bin/env python3
"""
Setup checker for SuperCar 0-60 Predictor Backend
Run this to verify your environment is ready
"""

import sys
import os
from pathlib import Path

def print_status(message, status):
    """Print a formatted status message"""
    symbol = "✓" if status else "✗"
    print(f"  {symbol} {message}")
    return status

def check_python_version():
    """Check if Python version is 3.8+"""
    version = sys.version_info
    is_valid = version.major == 3 and version.minor >= 8
    print_status(
        f"Python {version.major}.{version.minor}.{version.micro} (need 3.8+)",
        is_valid
    )
    return is_valid

def check_venv():
    """Check if virtual environment exists"""
    venv_exists = Path("venv").is_dir()
    print_status("Virtual environment (venv)", venv_exists)
    return venv_exists

def check_requirements():
    """Check if required packages are installed"""
    packages = {
        "fastapi": "FastAPI",
        "uvicorn": "Uvicorn",
        "tensorflow": "TensorFlow",
        "joblib": "Joblib",
        "numpy": "NumPy",
        "pydantic": "Pydantic"
    }
    
    all_installed = True
    for package, name in packages.items():
        try:
            __import__(package)
            print_status(f"{name} installed", True)
        except ImportError:
            print_status(f"{name} installed", False)
            all_installed = False
    
    return all_installed

def check_model_files():
    """Check if all required model files exist"""
    required_files = [
        "models/nn_zero_to_sixty.keras",
        "models/nn_scaler.pkl",
        "models/feature_names.pkl",
        "models/feature_info.pkl"
    ]
    
    all_found = True
    for file_path in required_files:
        exists = Path(file_path).is_file()
        print_status(f"{os.path.basename(file_path)}", exists)
        if not exists:
            all_found = False
    
    return all_found

def check_models_directory():
    """Check if models directory exists"""
    models_dir = Path("models")
    exists = models_dir.is_dir()
    print_status("models/ directory", exists)
    return exists

def main():
    """Run all checks"""
    print("\n" + "="*60)
    print("  SuperCar 0-60 Predictor - Setup Checker")
    print("="*60)
    
    # Python Version
    print("\n📦 Python Environment:")
    python_ok = check_python_version()
    venv_ok = check_venv()
    
    # Dependencies
    print("\n📚 Python Packages:")
    packages_ok = check_requirements()
    
    # Models
    print("\n🤖 Model Files:")
    models_dir_ok = check_models_directory()
    if models_dir_ok:
        models_ok = check_model_files()
    else:
        models_ok = False
        print("  (Create models/ directory first)")
    
    # Summary
    print("\n" + "="*60)
    print("  Summary")
    print("="*60)
    
    checks = {
        "Python Environment": python_ok and venv_ok,
        "Python Packages": packages_ok,
        "Model Files": models_ok
    }
    
    all_ok = all(checks.values())
    
    for check_name, status in checks.items():
        symbol = "✓" if status else "✗"
        print(f"  {symbol} {check_name}")
    
    # Recommendations
    print("\n" + "="*60)
    if all_ok:
        print("  ✓ All checks passed! You're ready to go!")
        print("="*60)
        print("\nNext steps:")
        print("  1. Start the backend:")
        print("     ./start.sh  (macOS/Linux)")
        print("     start.bat   (Windows)")
        print("\n  2. Test the API:")
        print("     python test_api.py")
        print("\n  3. Open API docs:")
        print("     http://localhost:8000/docs")
    else:
        print("  ⚠️  Some checks failed")
        print("="*60)
        print("\nRecommended actions:")
        
        if not (python_ok and venv_ok):
            print("\n  Python Environment:")
            if not python_ok:
                print("    • Install Python 3.8 or higher")
            if not venv_ok:
                print("    • Create virtual environment:")
                print("      python -m venv venv")
        
        if not packages_ok:
            print("\n  Python Packages:")
            print("    • Install dependencies:")
            print("      pip install -r requirements.txt")
        
        if not models_ok:
            print("\n  Model Files:")
            if not models_dir_ok:
                print("    • Create models directory:")
                print("      mkdir models")
            print("    • Add your model files to models/:")
            print("      - nn_zero_to_sixty.keras")
            print("      - nn_scaler.pkl")
            print("      - feature_names.pkl")
            print("      - feature_info.pkl")
            print("\n    • Or download from GitHub:")
            print("      python download_models.py")
            print("      (update GitHub URL in download_models.py first)")
        
        sys.exit(1)
    
    print("\n" + "="*60 + "\n")

if __name__ == "__main__":
    # Change to backend directory if running from root
    if Path("backend").is_dir() and not Path("models").exists():
        os.chdir("backend")
        print("Changed to backend directory")
    
    main()
