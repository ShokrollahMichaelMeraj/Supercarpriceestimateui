#!/usr/bin/env python3
"""
Test script for the SuperCar 0-60 Predictor API
Run this after starting the backend to verify everything works
"""

import requests
import json
import sys

BASE_URL = "http://localhost:8000"

def print_header(title):
    """Print a formatted header"""
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60)

def test_health_check():
    """Test the basic health check endpoint"""
    print_header("Test 1: Health Check")
    try:
        response = requests.get(f"{BASE_URL}/")
        response.raise_for_status()
        data = response.json()
        
        print("✓ API is running")
        print(f"  Status: {data.get('status')}")
        print(f"  Model Loaded: {data.get('model_loaded')}")
        print(f"  Expected Features: {len(data.get('expected_features', []))} features")
        return True
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to API")
        print(f"  Make sure the backend is running at {BASE_URL}")
        return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def test_detailed_health():
    """Test the detailed health endpoint"""
    print_header("Test 2: Detailed Health Check")
    try:
        response = requests.get(f"{BASE_URL}/health")
        response.raise_for_status()
        data = response.json()
        
        print("✓ Detailed health check successful")
        print(f"  API Version: {data.get('api_version')}")
        print(f"  Model Loaded: {data.get('model_loaded')}")
        print(f"  Scaler Loaded: {data.get('scaler_loaded')}")
        print("\n  Contact Info:")
        contact = data.get('contact', {})
        print(f"    Email: {contact.get('email')}")
        print(f"    Phone: {contact.get('phone')}")
        print(f"    Location: {contact.get('location')}")
        return True
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def test_model_info():
    """Test the model info endpoint"""
    print_header("Test 3: Model Information")
    try:
        response = requests.get(f"{BASE_URL}/model-info")
        response.raise_for_status()
        data = response.json()
        
        print("✓ Model info retrieved")
        print(f"  Model Type: {data.get('model_type')}")
        print(f"  Feature Count: {data.get('feature_count')}")
        print(f"  Target: {data.get('target')}")
        print(f"  Note: {data.get('note')}")
        return True
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def test_prediction():
    """Test the prediction endpoint with sample data"""
    print_header("Test 4: Prediction")
    
    # Sample car data
    test_car = {
        "year": 2020,
        "horsepower": 500,
        "engine_size": 4.0,
        "torque": 500,
        "weight": 3500,
        "drivetrain_rwd": 1,
        "transmission_dct": 1
    }
    
    print("Testing with Ferrari-like specs:")
    print(f"  Year: {test_car['year']}")
    print(f"  Horsepower: {test_car['horsepower']} HP")
    print(f"  Engine Size: {test_car['engine_size']}L")
    print(f"  Torque: {test_car['torque']} lb-ft")
    print(f"  Weight: {test_car['weight']} lbs")
    print(f"  Drivetrain: {'RWD' if test_car['drivetrain_rwd'] else 'FWD/AWD'}")
    print(f"  Transmission: {'DCT' if test_car['transmission_dct'] else 'Auto'}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/predict",
            json=test_car,
            headers={"Content-Type": "application/json"}
        )
        response.raise_for_status()
        data = response.json()
        
        print("\n✓ Prediction successful!")
        print(f"\n  🏎️  Predicted 0-100 km/h: {data.get('prediction')} {data.get('unit')}")
        print(f"\n  📊 Additional Metrics:")
        print(f"    Power/Weight: {data.get('power_weight_ratio')} hp/lb")
        print(f"    Torque/Weight: {data.get('torque_weight_ratio')} lb-ft/lb")
        print(f"    Weight Used: {data.get('estimated_weight')} lbs")
        
        features = data.get('features_used', {})
        print(f"\n  ⚙️  Configuration:")
        print(f"    Drivetrain: {'RWD' if features.get('drivetrain_rwd') else 'FWD/AWD'}")
        print(f"    Transmission: {'DCT' if features.get('transmission_dct') else 'Auto'}")
        
        return True
    except requests.exceptions.HTTPError as e:
        print(f"\n✗ HTTP Error: {e}")
        if e.response is not None:
            try:
                error_detail = e.response.json()
                print(f"  Detail: {error_detail.get('detail')}")
            except:
                print(f"  Response: {e.response.text}")
        return False
    except Exception as e:
        print(f"\n✗ Error: {e}")
        return False

def test_multiple_predictions():
    """Test predictions with different car configurations"""
    print_header("Test 5: Multiple Car Configurations")
    
    test_cars = [
        {
            "name": "Supercar (High HP, Light)",
            "data": {
                "year": 2022,
                "horsepower": 700,
                "engine_size": 4.0,
                "torque": 550,
                "weight": 3200,
                "drivetrain_rwd": 1,
                "transmission_dct": 1
            }
        },
        {
            "name": "Sports Car (Moderate)",
            "data": {
                "year": 2020,
                "horsepower": 400,
                "engine_size": 3.0,
                "torque": 350,
                "weight": 3400,
                "drivetrain_rwd": 1,
                "transmission_dct": 0
            }
        },
        {
            "name": "Hypercar (Extreme)",
            "data": {
                "year": 2024,
                "horsepower": 1000,
                "engine_size": 6.5,
                "torque": 800,
                "weight": 3000,
                "drivetrain_rwd": 0,
                "transmission_dct": 1
            }
        }
    ]
    
    results = []
    
    for car in test_cars:
        try:
            response = requests.post(
                f"{BASE_URL}/predict",
                json=car["data"],
                headers={"Content-Type": "application/json"}
            )
            response.raise_for_status()
            data = response.json()
            results.append({
                "name": car["name"],
                "prediction": data.get("prediction"),
                "hp": car["data"]["horsepower"],
                "weight": car["data"]["weight"]
            })
            print(f"\n✓ {car['name']}")
            print(f"  {car['data']['horsepower']} HP / {car['data']['weight']} lbs")
            print(f"  → {data.get('prediction')} seconds (0-100 km/h)")
        except Exception as e:
            print(f"\n✗ {car['name']}: {e}")
    
    if results:
        print("\n📈 Summary:")
        for r in sorted(results, key=lambda x: x["prediction"]):
            print(f"  {r['prediction']:>5.2f}s - {r['name']}")
    
    return len(results) == len(test_cars)

def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("  SuperCar 0-60 Predictor API Test Suite")
    print("="*60)
    print(f"\nTesting API at: {BASE_URL}")
    
    tests = [
        ("Health Check", test_health_check),
        ("Detailed Health", test_detailed_health),
        ("Model Info", test_model_info),
        ("Single Prediction", test_prediction),
        ("Multiple Predictions", test_multiple_predictions)
    ]
    
    results = []
    for name, test_func in tests:
        result = test_func()
        results.append((name, result))
    
    # Summary
    print_header("Test Summary")
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✓ PASS" if result else "✗ FAIL"
        print(f"  {status} - {name}")
    
    print(f"\n  Total: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed! Your API is ready to use!")
        print("\nNext steps:")
        print("  1. Start your React frontend")
        print("  2. Navigate to 'Configure Your Supercar'")
        print("  3. Make live predictions!")
    else:
        print("\n⚠️  Some tests failed. Check the output above for details.")
        sys.exit(1)
    
    print("\n" + "="*60 + "\n")

if __name__ == "__main__":
    main()
