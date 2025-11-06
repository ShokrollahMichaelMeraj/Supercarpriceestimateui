# Quick Start - 3D Ferrari Viewer

## Step 1: Install Three.js

Add this to your existing `package.json` dependencies:

```json
{
  "dependencies": {
    "three": "^0.170.0"
  },
  "devDependencies": {
    "@types/three": "^0.170.0"
  }
}
```

Then run:
```bash
npm install
```

## Step 2: Add the Ferrari Model

**Option A: Use a free Ferrari model**

1. Go to [Sketchfab](https://sketchfab.com/3d-models/ferrari-f40-6646e10d468e4378838b2be3f73e9f13)
2. Download the model (you may need a free account)
3. Convert to GLB if needed (use [gltf.report](https://gltf.report/))
4. Place it at: `/public/models/ferrarif1.glb`

**Option B: Start with placeholder**

The viewer includes a built-in placeholder red sports car. Just run the app and the placeholder will display automatically until you add a real model.

## Step 3: Run Your App

```bash
npm run dev
```

## What to Expect

### Initial Load
- Black screen with Ferrari model centered
- "Scroll to explore" hint at bottom

### Scroll Behavior
- Scroll down to rotate the car 360°
- Progress bar shows completion (0-100%)
- Background gradually lightens
- Camera adds subtle parallax movement

### After Full Rotation
- Content fades in below the car
- "Replay Intro" button appears (bottom-right)
- Normal scrolling resumes

## Quick Customization

### Change scroll distance for full rotation
Edit `/components/Ferrari3DViewer.tsx`:

```typescript
// Line ~183
const rotationThreshold = window.innerHeight * 2; // Change "2" to "3" for longer scroll
```

### Change camera distance
```typescript
// Line ~40
camera.position.set(0, 1.5, 8); // Increase "8" to zoom out
```

### Disable intro (skip to content)
Set `introComplete` to `true` by default:

```typescript
const [introComplete, setIntroComplete] = useState(true); // Changed from false
```

## Browser Requirements

- Modern browser with WebGL 2.0
- Hardware acceleration enabled
- JavaScript enabled

## Still Need Help?

See the full setup guide: `SETUP_3D_VIEWER.md`

## Dependencies Already Included

The component uses these packages that you already have:
- ✅ `motion/react` (Framer Motion) - for animations
- ✅ `lucide-react` - for the replay icon
- ✅ `react` - base framework

You only need to add **Three.js**!
