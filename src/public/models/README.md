# 3D Models Directory

Place your 3D model files here.

## 🚗 REQUIRED: Add Ferrari GLB Model

**File needed:** `ferrari.glb`

**Location:** `/public/models/ferrari.glb`

The CarViewer component is looking for this file. Until you add it, a placeholder red car geometry will display with a warning message.

## Where to Get Ferrari GLB Models

### Free Sources:
- **[Sketchfab](https://sketchfab.com/search?q=ferrari&type=models)** - Search "ferrari" and download free GLB models
- **[Poly Haven](https://polyhaven.com)** - Free high-quality 3D assets
- **[Free3D](https://free3d.com)** - Free car models (convert to GLB if needed)

### Paid Sources:
- **[TurboSquid](https://www.turbosquid.com)** - Professional Ferrari models
- **[CGTrader](https://www.cgtrader.com)** - Wide selection of car models

## Quick Setup Instructions

1. Download a Ferrari GLB model from one of the sources above
2. Rename it to `ferrari.glb` (exact name)
3. Place it in `/public/models/ferrari.glb`
4. Refresh your browser - the model will load automatically!

## Model Requirements

- **File name:** Exactly `ferrari.glb` (lowercase)
- **Format:** GLB (not separate GLTF + bin + textures)
- **Size:** Under 10MB recommended for fast loading
- **Polygon count:** 50k-200k triangles for good performance
- **Materials:** PBR materials preferred for realistic lighting

## Troubleshooting

**Error: 404 Not Found**
- Check file is named exactly `ferrari.glb`
- Check file is in `/public/models/` folder
- Clear browser cache and refresh

**Model too dark/bright**
- Adjust lighting in `/components/CarViewer.tsx` (lines 48-56)

**Model too big/small**
- The code auto-scales, but you can adjust camera position (line 37)
