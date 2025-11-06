# 3D Ferrari Viewer Setup Guide

This guide will help you set up the 3D Ferrari viewer with scroll-locked rotation animation.

## Installation Steps

### 1. Install Three.js

Add Three.js to your project by running:

```bash
npm install three
```

Or if you're using yarn:

```bash
yarn add three
```

### 2. Install Three.js Types (for TypeScript)

```bash
npm install --save-dev @types/three
```

### 3. Add the Ferrari GLB Model

1. Obtain a Ferrari F1 or Ferrari F40 GLB model from one of these sources:
   - [Sketchfab](https://sketchfab.com/search?q=ferrari&type=models) - Search for "Ferrari" and filter by downloadable models
   - [TurboSquid](https://www.turbosquid.com/Search/3D-Models/ferrari) - Professional models
   - [CGTrader](https://www.cgtrader.com/3d-models/car/sport/ferrari) - Various Ferrari models
   - [Poly Haven](https://polyhaven.com/models) - Free assets

2. Download the model in GLB format (not separate GLTF files)

3. Place the GLB file in: `/public/models/ferrarif1.glb`

### 4. Model Requirements

**File specifications:**
- **File name:** `ferrarif1.glb` (exact name, case-sensitive)
- **Format:** GLB (binary GLTF)
- **Location:** `/public/models/ferrarif1.glb`
- **Size:** Preferably under 10MB for fast loading
- **Polygon count:** 50k-200k triangles (for good balance of quality and performance)
- **Materials:** PBR materials recommended for realistic rendering
- **Orientation:** The model should face forward along the Z-axis

### 5. Verify Installation

After adding the model file, your directory structure should look like:

```
your-project/
├── public/
│   └── models/
│       └── ferrarif1.glb        ← Your 3D model here
├── components/
│   ├── Ferrari3DViewer.tsx      ← 3D viewer component
│   └── ...
└── ...
```

## How It Works

### Scroll-Locked Intro
1. When the page loads, the Ferrari model appears on a black background
2. Scrolling rotates the car 360 degrees (scroll-scrubbed animation)
3. A progress bar shows rotation completion
4. Background gradually lightens during rotation

### After Rotation Completes
1. Normal scrolling is enabled
2. Content fades in with a smooth transition
3. Background changes to light gray (#f5f5f5)
4. "Replay Intro" button appears to restart the animation

### Features
- **Smooth scroll-scrubbed rotation:** Car rotates based on scroll position
- **Realistic lighting:** Ambient, directional, and rim lights for depth
- **Camera parallax:** Subtle camera movement during rotation
- **Responsive:** Adapts to all screen sizes
- **Placeholder fallback:** Shows a red placeholder car if GLB fails to load
- **Shadow rendering:** Real-time shadows for realism

## Placeholder Mode

If you don't add a GLB file, the component will automatically display a placeholder red sports car made from Three.js primitives. This lets you:
- Test the scroll animation immediately
- Verify the lighting and shadows
- See the full rotation behavior
- Replace it later with the real model

## Performance Tips

1. **Optimize your GLB:**
   - Use [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) to compress
   - Remove unnecessary data
   - Optimize textures (use compressed formats like KTX2 or Basis)

2. **Model size:**
   - Keep under 10MB if possible
   - Consider using Draco compression

3. **Texture resolution:**
   - 2K textures are usually sufficient
   - Use power-of-2 dimensions (512, 1024, 2048, etc.)

## Customization

### Change Rotation Speed
In `/components/Ferrari3DViewer.tsx`, adjust the rotation threshold:

```typescript
const rotationThreshold = window.innerHeight * 2; // Change multiplier
```

### Adjust Camera Position
Modify the camera setup:

```typescript
camera.position.set(0, 1.5, 8); // [x, y, z]
```

### Change Background Colors
Update background transitions:

```typescript
new THREE.Color('#000000') // Start color (black)
new THREE.Color('#f5f5f5') // End color (light gray)
```

### Modify Lighting
Adjust light intensities and colors in the lighting setup section.

## Troubleshooting

### Model doesn't appear
- Check browser console for errors
- Verify file path: `/public/models/ferrarif1.glb`
- Ensure file name is exactly `ferrarif1.glb` (case-sensitive)
- Try the placeholder mode first to ensure Three.js is working

### Performance issues
- Reduce model polygon count
- Lower texture resolutions
- Disable shadows temporarily
- Check GPU usage in browser DevTools

### Model appears too small/large
The component auto-scales the model, but you can adjust the scale multiplier:

```typescript
const scale = 3 / maxSize; // Change the 3 to adjust size
```

## Browser Support

The 3D viewer requires:
- WebGL 2.0 support
- Modern browser (Chrome 56+, Firefox 51+, Safari 15+, Edge 79+)
- Hardware GPU acceleration enabled

## Credits

Built with:
- [Three.js](https://threejs.org/) - 3D graphics library
- [Motion](https://motion.dev/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
