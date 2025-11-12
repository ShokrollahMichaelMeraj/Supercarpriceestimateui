/**
 * ============================================================================
 * CarViewer Component - 3D Ferrari Model Viewer with Speed Effect
 * ============================================================================
 * 
 * This component renders an interactive 3D Ferrari model using Three.js with:
 * - Drag-to-rotate interaction (mouse and touch)
 * - Realistic lighting system
 * - Dynamic motion lights locked to the car
 * - Animated tunnel speed effect
 * - Responsive design for mobile and desktop
 * - Animated statistics display
 * 
 * ============================================================================
 * QUICK CUSTOMIZATION GUIDE
 * ============================================================================
 * 
 * 1. CHANGE THE 3D MODEL:
 *    - Line 128: const modelPath = "/models/ferrari.glb";
 *    - Replace "ferrari.glb" with your model filename
 *    - Model must be in .glb format in the /public/models/ folder
 * 
 * 2. ADJUST CAMERA VIEW:
 *    - Line 31: const fov = isMobile ? 60 : 45; (field of view)
 *    - Line 42: const cameraDistance = isMobile ? 2.2 : 1.6; (zoom level)
 *    - Line 43: camera.position.set(0, 0.09, cameraDistance); (camera position)
 *    - Higher distance = zoomed out, Lower = zoomed in
 * 
 * 3. MODIFY ROTATION SPEED:
 *    - Line 403: rotationRef.current.y += deltaX * 0.01;
 *    - Increase 0.01 to make rotation faster (e.g., 0.02)
 *    - Decrease to make it slower (e.g., 0.005)
 * 
 * 4. ADJUST MODEL SIZE:
 *    - Line 152: const baseScale = isMobile ? 1.5 : 2;
 *    - Increase numbers to make model larger
 *    - Decrease to make it smaller
 * 
 * 5. CHANGE TUNNEL SPEED EFFECT:
 *    - Line 101: const numLights = 12; (more lights = denser tunnel)
 *    - Line 102: const tunnelRadius = 2.5; (larger = wider tunnel)
 *    - Line 118: speed = 0.08 + Math.random() * 0.04; (faster/slower movement)
 *    - Line 347: const pulseSpeed = 0.05; (light pulsing speed)
 * 
 * 6. ADJUST OVERALL BRIGHTNESS:
 *    - Line 57: renderer.toneMappingExposure = 0.85; (0.5-2.0 range)
 *    - Lower = darker scene, Higher = brighter scene
 * 
 * 7. MODIFY LOCKED MOTION LIGHTS (attached to car):
 *    - Lines 167-172: Front spotlight (white light at front)
 *    - Lines 176-181: Side rim light (orange glow on sides)
 *    - Lines 185-190: Rear accent light (red glow at back)
 *    - Lines 194-195: Under glow (orange underglow)
 *    - Adjust position.set(x, y, z) to move lights
 *    - Change intensity (second parameter) to brighten/dim
 * 
 * 8. CHANGE INITIAL MODEL ROTATION:
 *    - Line 161: model.rotation.y = Math.PI / 2; (90 degrees)
 *    - Math.PI = 180 degrees, Math.PI * 2 = 360 degrees
 * 
 * ============================================================================
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { motion } from "motion/react";

export function CarViewer() {
  // ============================================================================
  // REFS - Store references to Three.js objects and interaction state
  // ============================================================================
  const containerRef = useRef<HTMLDivElement>(null); // DOM container for canvas
  const modelRef = useRef<THREE.Object3D | null>(null); // The 3D car model
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null); // Three.js renderer
  const isDraggingRef = useRef(false); // Track if user is dragging
  const previousMousePositionRef = useRef({ x: 0, y: 0 }); // Last mouse position
  const rotationRef = useRef({ y: Math.PI / -2 }); // Current rotation angle
  const tunnelLightsRef = useRef<THREE.PointLight[]>([]); // Animated tunnel lights

  const [loadingError, setLoadingError] = useState(false); // Track model loading errors

  // ============================================================================
  // MAIN EFFECT - Sets up Three.js scene, loads model, starts animation
  // ============================================================================
  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up any existing renderer
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(
        containerRef.current.firstChild,
      );
    }

    // ============================================================================
    // SCENE SETUP
    // ============================================================================
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // ============================================================================
    // CAMERA SETUP - Responsive for mobile and desktop
    // ============================================================================
    const isMobile = window.innerWidth < 768;
    const fov = isMobile ? 60 : 45; // Higher FOV for mobile (wider view)
    
    const camera = new THREE.PerspectiveCamera(
      fov, // Field of view
      containerRef.current.clientWidth / containerRef.current.clientHeight, // Aspect ratio
      0.1, // Near clipping plane
      10000, // Far clipping plane
    );
    
    // Position camera - adjust these values to change view angle
    const cameraDistance = isMobile ? 2.2 : 1.6; // Farther on mobile
    camera.position.set(0, 0.09, cameraDistance); // (x, y, z) coordinates

    // ============================================================================
    // RENDERER SETUP - High quality rendering with transparency
    // ============================================================================
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // Smooth edges
      alpha: true, // Transparent background
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setPixelRatio(window.devicePixelRatio); // Crisp on retina displays
    
    // Color and tone mapping for realistic materials
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85; // Overall brightness (0.5-2.0 range)
    
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ============================================================================
    // STATIC LIGHTING SETUP - These lights don't move, provide base illumination
    // ============================================================================

    // 1. Ambient Light - Soft fill light for overall visibility
    // Color: 0xffffff (white), Intensity: 0.25
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    // 2. Key Light - Main light source (simulates sun/studio light)
    // Color: 0xfff4e6 (warm white), Intensity: 1.2
    const keyLight = new THREE.DirectionalLight(0xfff4e6, 1.2);
    keyLight.position.set(5, 6, 4); // Top-front-right position
    keyLight.castShadow = true; // Enable shadows
    scene.add(keyLight);

    // 3. Fill Light - Softens shadows on the opposite side
    // Color: 0xc8e0f5 (cool blue), Intensity: 0.4
    const fillLight = new THREE.DirectionalLight(0xc8e0f5, 0.4);
    fillLight.position.set(-4, 3, -2); // Top-back-left position
    scene.add(fillLight);

    // 4. Rim Light - Creates edge highlights (separates car from background)
    // Color: 0xffffff (white), Intensity: 0.6
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(0, 2, -6); // Behind the camera
    scene.add(rimLight);

    // 5. Accent Light - Subtle Ferrari-brand red glow
    // Color: 0xff5533 (red-orange), Intensity: 0.3, Distance: 8
    const accentLight = new THREE.PointLight(0xff5533, 0.3, 8);
    accentLight.position.set(2, 0.3, 1.5); // Side of the car
    scene.add(accentLight);

    // 6. Hemisphere Light - Simulates ground reflection and sky light
    // Sky Color: 0xffffff (white), Ground Color: 0x666666 (gray), Intensity: 0.35
    const groundLight = new THREE.HemisphereLight(
      0xffffff,
      0x666666,
      0.35,
    );
    groundLight.position.set(0, -1, 0);
    scene.add(groundLight);

    // ============================================================================
    // TUNNEL SPEED LIGHTS - Animated lights that create motion effect
    // ============================================================================
    // These lights move past the car to create the illusion of speed
    const tunnelLights: THREE.PointLight[] = [];
    const numLights = 12; // Total number of tunnel lights (try 8-20)
    const tunnelRadius = 2.5; // Distance from center (try 2.0-4.0)
    
    for (let i = 0; i < numLights; i++) {
      // Distribute lights in a circle around the car
      const angle = (i / numLights) * Math.PI * 2; // Angle in radians
      const light = new THREE.PointLight(
        0xffffff, // Color (white)
        0.8, // Initial intensity
        4 // Distance the light reaches
      );
      
      // Calculate position on circle
      const x = Math.cos(angle) * tunnelRadius;
      const y = Math.sin(angle) * tunnelRadius;
      const z = (i / numLights) * 8 - 4; // Spread lights along the Z axis
      
      light.position.set(x, y, z);
      
      // Store custom properties for animation
      (light as any).initialZ = z; // Starting Z position
      (light as any).speed = 0.08 + Math.random() * 0.04; // Movement speed (0.08-0.12)
      
      scene.add(light);
      tunnelLights.push(light);
    }
    
    tunnelLightsRef.current = tunnelLights;

    // ============================================================================
    // 3D MODEL LOADING
    // ============================================================================
    const loader = new GLTFLoader();
    const modelPath = "/models/ferrari.glb"; // CHANGE THIS to use a different model

    loader.load(
      modelPath,
      // SUCCESS CALLBACK - Model loaded successfully
      (gltf: any) => {
        const model = gltf.scene;

        // ============================================================================
        // MATERIAL ENHANCEMENT - Make materials more realistic
        // ============================================================================
        model.traverse((child: any) => {
          if (child.isMesh) {
            if (child.material) {
              child.material.envMapIntensity = 0.9; // Reflection intensity (0.0-2.0)
              child.material.needsUpdate = true;
            }
          }
        });

        // ============================================================================
        // AUTO-SIZING AND CENTERING - Fits any model to screen
        // ============================================================================
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // Scale model to fit viewport (smaller on mobile)
        const isMobile = window.innerWidth < 768;
        const baseScale = isMobile ? 1.5 : 2; // ADJUST SIZE HERE
        const scale = baseScale / maxDim;
        model.scale.multiplyScalar(scale);
        
        // Center the model at origin
        model.position.set(
          -center.x * scale,
          -center.y * scale,
          -center.z * scale,
        );
        
        // Set initial rotation (side view)
        model.rotation.y = Math.PI / 2; // 90 degrees = side view
        
        // ============================================================================
        // LOCKED MOTION LIGHTS - These lights are attached to the model
        // and rotate with it, creating dynamic highlights
        // ============================================================================
        
        // Front Spotlight - Bright white light at front of car
        const frontSpotlight = new THREE.SpotLight(
          0xffffff, // Color (white)
          2.5 // Intensity
        );
        frontSpotlight.position.set(1.5, 0.5, 0.3); // Front-right position
        frontSpotlight.angle = Math.PI / 6; // Cone angle (30 degrees)
        frontSpotlight.penumbra = 0.3; // Soft edge (0.0 = sharp, 1.0 = soft)
        frontSpotlight.decay = 2; // How light fades with distance
        frontSpotlight.distance = 4; // Maximum reach
        model.add(frontSpotlight); // Attach to model
        
        // Side Rim Light - Orange glow on edges
        const sideRimLight = new THREE.SpotLight(0xff8844, 1.8);
        sideRimLight.position.set(0, 0.8, 1.2); // Top-side position
        sideRimLight.angle = Math.PI / 4; // 45 degrees
        sideRimLight.penumbra = 0.5;
        sideRimLight.decay = 2;
        sideRimLight.distance = 3;
        model.add(sideRimLight);
        
        // Rear Accent Light - Red glow at back
        const rearAccentLight = new THREE.SpotLight(0xff3333, 1.5);
        rearAccentLight.position.set(-1.5, 0.3, -0.2); // Back-left position
        rearAccentLight.angle = Math.PI / 5; // 36 degrees
        rearAccentLight.penumbra = 0.4;
        rearAccentLight.decay = 2;
        rearAccentLight.distance = 3;
        model.add(rearAccentLight);
        
        // Underglow - Orange light underneath car
        const underGlow = new THREE.PointLight(
          0xff6633, // Orange color
          1.2, // Intensity
          2.5 // Distance
        );
        underGlow.position.set(0, -0.3, 0); // Below center
        model.add(underGlow);
        
        scene.add(model);
        modelRef.current = model;
        setLoadingError(false);
      },
      
      // PROGRESS CALLBACK - Track loading progress
      (progress: any) => {
        console.log(
          "Loading:",
          ((progress.loaded / progress.total) * 100).toFixed(1) + "%",
        );
      },
      
      // ERROR CALLBACK - Model failed to load, show placeholder
      (error: any) => {
        console.error("Error loading model:", error);
        setLoadingError(true);

        // ============================================================================
        // PLACEHOLDER CAR - Simple geometric car when model doesn't load
        // ============================================================================
        const placeholderGroup = new THREE.Group();
        
        // Car body
        const bodyGeometry = new THREE.BoxGeometry(2, 0.4, 0.8);
        const bodyMaterial = new THREE.MeshStandardMaterial({
          color: 0xcc0000, // Ferrari red
          metalness: 0.8,
          roughness: 0.2,
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.2;
        placeholderGroup.add(body);

        // Roof
        const roofGeometry = new THREE.BoxGeometry(1.2, 0.35, 0.7);
        const roof = new THREE.Mesh(roofGeometry, bodyMaterial);
        roof.position.set(-0.2, 0.55, 0);
        placeholderGroup.add(roof);

        // Spoiler
        const spoilerGeometry = new THREE.BoxGeometry(0.3, 0.05, 1);
        const spoiler = new THREE.Mesh(spoilerGeometry, bodyMaterial);
        spoiler.position.set(1.1, 0.05, 0);
        placeholderGroup.add(spoiler);

        // Wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
        const wheelMaterial = new THREE.MeshStandardMaterial({
          color: 0x1a1a1a,
          metalness: 0.5,
          roughness: 0.5,
        });

        const wheelPositions = [
          [0.7, 0, 0.45],   // Front right
          [0.7, 0, -0.45],  // Front left
          [-0.6, 0, 0.45],  // Rear right
          [-0.6, 0, -0.45], // Rear left
        ];

        wheelPositions.forEach((pos) => {
          const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
          wheel.rotation.z = Math.PI / 2;
          wheel.position.set(pos[0], pos[1], pos[2]);
          placeholderGroup.add(wheel);
        });

        // Underglow effect
        const glowGeometry = new THREE.BoxGeometry(2.1, 0.05, 0.85);
        const glowMaterial = new THREE.MeshStandardMaterial({
          color: 0xff0000,
          emissive: 0xff0000,
          emissiveIntensity: 0.5,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.y = 0.05;
        placeholderGroup.add(glow);

        // Rotate placeholder to match real model orientation
        placeholderGroup.rotation.y = Math.PI / 2;
        
        // Add same motion lights to placeholder
        const frontSpotlight = new THREE.SpotLight(0xffffff, 2.5);
        frontSpotlight.position.set(1.5, 0.5, 0.3);
        frontSpotlight.angle = Math.PI / 6;
        frontSpotlight.penumbra = 0.3;
        frontSpotlight.decay = 2;
        frontSpotlight.distance = 4;
        placeholderGroup.add(frontSpotlight);
        
        const sideRimLight = new THREE.SpotLight(0xff8844, 1.8);
        sideRimLight.position.set(0, 0.8, 1.2);
        sideRimLight.angle = Math.PI / 4;
        sideRimLight.penumbra = 0.5;
        sideRimLight.decay = 2;
        sideRimLight.distance = 3;
        placeholderGroup.add(sideRimLight);
        
        const rearAccentLight = new THREE.SpotLight(0xff3333, 1.5);
        rearAccentLight.position.set(-1.5, 0.3, -0.2);
        rearAccentLight.angle = Math.PI / 5;
        rearAccentLight.penumbra = 0.4;
        rearAccentLight.decay = 2;
        rearAccentLight.distance = 3;
        placeholderGroup.add(rearAccentLight);
        
        const underGlow = new THREE.PointLight(0xff6633, 1.2, 2.5);
        underGlow.position.set(0, -0.3, 0);
        placeholderGroup.add(underGlow);
        
        scene.add(placeholderGroup);
        modelRef.current = placeholderGroup;
      },
    );

    // ============================================================================
    // ANIMATION LOOP - Runs continuously to update scene
    // ============================================================================
    const animate = () => {
      requestAnimationFrame(animate); // Schedule next frame

      // Update model rotation based on user drag
      if (modelRef.current) {
        modelRef.current.rotation.y = rotationRef.current.y;
      }

      // ============================================================================
      // TUNNEL LIGHT ANIMATION - Creates speeding effect
      // ============================================================================
      tunnelLightsRef.current.forEach((light) => {
        // Move lights backward (creating illusion of forward motion)
        light.position.z -= (light as any).speed;
        
        // Reset position when light passes behind camera (creates infinite loop)
        if (light.position.z < -5) {
          light.position.z = 5; // Move to front
        }
        
        // Pulsing effect - lights flicker as they pass
        const pulseSpeed = 0.05; // How fast they pulse (try 0.02-0.1)
        const time = Date.now() * 0.001; // Current time in seconds
        const baseBrightness = 0.8; // Base intensity (try 0.5-1.0)
        const pulseMagnitude = 0.3; // How much they pulse (try 0.1-0.5)
        
        // Calculate pulsing intensity using sine wave
        light.intensity = baseBrightness + 
          Math.sin(time * pulseSpeed + light.position.z) * pulseMagnitude;
      });

      // Render the scene
      renderer.render(scene, camera);
    };
    animate(); // Start animation loop

    // ============================================================================
    // WINDOW RESIZE HANDLER - Keep canvas responsive
    // ============================================================================
    const handleResize = () => {
      if (!containerRef.current) return;
      
      // Update camera aspect ratio
      camera.aspect =
        containerRef.current.clientWidth /
        containerRef.current.clientHeight;
      
      // Adjust FOV and distance for new screen size
      const isMobileNow = window.innerWidth < 768;
      camera.fov = isMobileNow ? 60 : 45;
      const newDistance = isMobileNow ? 2.2 : 1.6;
      camera.position.z = newDistance;
      
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
    };
    window.addEventListener("resize", handleResize);

    // ============================================================================
    // CLEANUP - Remove event listeners and dispose Three.js resources
    // ============================================================================
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // ============================================================================
  // MOUSE INTERACTION HANDLERS - Desktop drag-to-rotate
  // ============================================================================
  
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    // Calculate how far mouse moved
    const deltaX = e.clientX - previousMousePositionRef.current.x;

    // Update rotation (multiply by 0.01 to control sensitivity)
    // CHANGE 0.01 to adjust rotation speed (higher = faster)
    rotationRef.current.y += deltaX * 0.01;

    // Store current position for next frame
    previousMousePositionRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  // ============================================================================
  // TOUCH INTERACTION HANDLERS - Mobile drag-to-rotate
  // ============================================================================
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;

    // Same rotation calculation as mouse
    rotationRef.current.y += deltaX * 0.01;

    previousMousePositionRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // ============================================================================
  // ANIMATED STATISTICS - Performance metrics displayed above model
  // ============================================================================
  const stats = [
    { value: "99%", label: "ACCURACY" },
    { value: "10K+", label: "PREDICTIONS" },
    { value: "0.1s", label: "RESPONSE" }
  ];

  // ============================================================================
  // RENDER - Component UI
  // ============================================================================
  return (
    <div className="relative w-full py-8 sm:py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================================
            STATS SECTION - Animated statistics with letter-by-letter animation
            ============================================================================ */}
        <div className="flex justify-center gap-8 sm:gap-16 md:gap-24 mb-8 sm:mb-12 md:mb-16">
          {stats.map((stat, statIndex) => (
            <div key={statIndex} className="text-center">
              {/* Animated Value - Each character animates in sequence */}
              <div className="flex justify-center items-center mb-2">
                {stat.value.split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (statIndex * 0.3) + (charIndex * 0.08),
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    className="inline-block text-gray-900"
                    style={{
                      fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              {/* Animated Label - Fades in after value */}
              <div className="flex justify-center items-center">
                {stat.label.split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: (statIndex * 0.3) + (stat.value.length * 0.08) + (charIndex * 0.05),
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    className="inline-block text-gray-600"
                    style={{
                      fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)',
                      fontWeight: 600,
                      letterSpacing: '0.1em'
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================================
            ERROR MESSAGE - Shows when ferrari.glb is missing
            ============================================================================ */}
        {loadingError && (
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="bg-yellow-500 bg-opacity-90 text-black px-6 py-4 rounded-lg shadow-lg text-center">
              <p className="mb-2">
                ⚠️ Ferrari 3D Model Not Found
              </p>
              <p className="text-xs mb-2">
                Add <strong>ferrari.glb</strong> to{" "}
                <code>/public/models/</code> folder for the real 3D model.
              </p>
              <p className="text-xs opacity-75">
                Using placeholder geometry for now. See <code>/public/models/README.md</code> for download links.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================================
            3D VIEWER CONTAINER - Canvas is rendered inside this div
            ============================================================================ */}
        <div
          ref={containerRef}
          className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] cursor-grab active:cursor-grabbing rounded-lg overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        {/* Instruction text */}
        <p className="text-center mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
          Drag to rotate • Explore the Ferrari from every angle
        </p>
      </div>
    </div>
  );
}
