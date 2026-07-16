"""
Helper script to download model files from GitHub repository.
Update the GITHUB_REPO_URL with your actual repository URL.
"""

import os
import urllib.request
import sys

# Update this with your GitHub repository information
GITHUB_REPO_URL = "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/models/"

# Files to download
MODEL_FILES = [
    "nn_zero_to_sixty.keras",
    "nn_scaler.pkl",
    "feature_names.pkl",
    "feature_info.pkl"
]

# Target directory
MODELS_DIR = "models"

def download_file(url, destination):
    """Download a file from URL to destination"""
    try:
        print(f"Downloading {os.path.basename(destination)}...")
        urllib.request.urlretrieve(url, destination)
        print(f"✓ Downloaded {os.path.basename(destination)}")
        return True
    except Exception as e:
        print(f"✗ Failed to download {os.path.basename(destination)}: {e}")
        return False

def main():
    """Main function to download all model files"""
    # Check if GITHUB_REPO_URL has been updated
    if "YOUR_USERNAME" in GITHUB_REPO_URL or "YOUR_REPO" in GITHUB_REPO_URL:
        print("⚠️  ERROR: Please update GITHUB_REPO_URL in this script first!")
        print("   Replace YOUR_USERNAME and YOUR_REPO with your actual GitHub details.")
        print("\n   Example:")
        print('   GITHUB_REPO_URL = "https://raw.githubusercontent.com/mmeraj/supercar-predictor/main/models/"')
        sys.exit(1)
    
    # Create models directory if it doesn't exist
    if not os.path.exists(MODELS_DIR):
        os.makedirs(MODELS_DIR)
        print(f"✓ Created {MODELS_DIR} directory")
    
    # Download each file
    print(f"\nDownloading model files from GitHub...\n")
    success_count = 0
    
    for filename in MODEL_FILES:
        url = GITHUB_REPO_URL + filename
        destination = os.path.join(MODELS_DIR, filename)
        
        if download_file(url, destination):
            success_count += 1
    
    # Summary
    print(f"\n{'='*50}")
    print(f"Downloaded {success_count}/{len(MODEL_FILES)} files successfully")
    
    if success_count == len(MODEL_FILES):
        print("\n✓ All model files downloaded successfully!")
        print("  You can now run: python main.py")
    else:
        print("\n⚠️  Some files failed to download.")
        print("   Please check your GitHub URL and ensure files exist.")
        print("   Or manually place the files in the 'models' directory.")
    print(f"{'='*50}\n")

if __name__ == "__main__":
    main()
