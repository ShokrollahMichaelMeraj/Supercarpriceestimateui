import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateRightIcon } from 'lucide-react';

export function Ferrari3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const [showReplayButton, setShowReplayButton] = useState(false);
  
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    model: THREE.Group | null;
    animationId: number | null;
  } | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 8);
    camera.lookAt(0, 0.5, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight('#ffffff', 1.5);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight('#4a9eff', 0.5);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#ff6b35', 0.8);
    rimLight.position.set(0, 2, -5);
    scene.add(rimLight);

    // Add ground plane for shadows (optional)
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Load GLB model
    const loader = new GLTFLoader();
    let modelGroup: THREE.Group | null = null;

    // Placeholder: Create a simple car-like geometry until GLB is loaded
    const createPlaceholderCar = () => {
      const carGroup = new THREE.Group();

      // Car body
      const bodyGeometry = new THREE.BoxGeometry(2, 0.6, 4);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: '#cc0000',
        metalness: 0.9,
        roughness: 0.2,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0.5;
      body.castShadow = true;
      carGroup.add(body);

      // Car cabin
      const cabinGeometry = new THREE.BoxGeometry(1.6, 0.5, 2);
      const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial);
      cabin.position.set(0, 1, -0.3);
      cabin.castShadow = true;
      carGroup.add(cabin);

      // Wheels
      const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
      const wheelMaterial = new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        metalness: 0.8,
        roughness: 0.3,
      });

      const wheelPositions = [
        [-0.9, 0.3, 1.2],
        [0.9, 0.3, 1.2],
        [-0.9, 0.3, -1.2],
        [0.9, 0.3, -1.2],
      ];

      wheelPositions.forEach(([x, y, z]) => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, y, z);
        wheel.castShadow = true;
        carGroup.add(wheel);
      });

      return carGroup;
    };

    // Try to load the GLB model, fallback to placeholder
    loader.load(
      '/models/ferrarif1.glb',
      (gltf) => {
        modelGroup = gltf.scene;
        
        // Setup model
        modelGroup.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Scale and position model
        const box = new THREE.Box3().setFromObject(modelGroup);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxSize = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxSize;
        modelGroup.scale.multiplyScalar(scale);
        
        modelGroup.position.sub(center.multiplyScalar(scale));
        modelGroup.position.y = 0;

        scene.add(modelGroup);
      },
      undefined,
      (error) => {
        console.warn('Could not load Ferrari model, using placeholder:', error);
        // Use placeholder
        modelGroup = createPlaceholderCar();
        scene.add(modelGroup);
      }
    );

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Store refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      model: modelGroup,
      animationId,
    };

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Handle scroll rotation
  useEffect(() => {
    const handleScroll = () => {
      if (introComplete) return;

      const scrollTop = window.scrollY;
      const rotationThreshold = window.innerHeight * 2; // 2 viewport heights for full rotation
      const progress = Math.min(scrollTop / rotationThreshold, 1);
      
      setScrollProgress(progress);

      // Update model rotation
      if (sceneRef.current?.model) {
        sceneRef.current.model.rotation.y = progress * Math.PI * 2;
      }

      // Update background fade
      if (sceneRef.current?.scene) {
        const bgColor = new THREE.Color().lerpColors(
          new THREE.Color('#000000'),
          new THREE.Color('#1a1a1a'),
          progress
        );
        sceneRef.current.scene.background = bgColor;
      }

      // Add subtle camera parallax
      if (sceneRef.current?.camera) {
        const parallaxAmount = 0.1;
        sceneRef.current.camera.position.y = 1.5 + Math.sin(progress * Math.PI) * parallaxAmount;
        sceneRef.current.camera.lookAt(0, 0.5, 0);
      }

      // Complete intro when rotation is done
      if (progress >= 1 && !introComplete) {
        setIntroComplete(true);
        setShowReplayButton(true);
        
        // Fade background to lighter color
        if (sceneRef.current?.scene) {
          sceneRef.current.scene.background = new THREE.Color('#f5f5f5');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [introComplete]);

  // Lock scroll during intro
  useEffect(() => {
    if (!introComplete) {
      // Prevent default scroll behavior during intro
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, [introComplete]);

  // Replay intro
  const handleReplay = () => {
    setIntroComplete(false);
    setShowReplayButton(false);
    setScrollProgress(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (sceneRef.current?.model) {
      sceneRef.current.model.rotation.y = 0;
    }
    if (sceneRef.current?.scene) {
      sceneRef.current.scene.background = new THREE.Color('#000000');
    }
  };

  return (
    <>
      {/* 3D Viewer Container */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen z-10"
        style={{
          pointerEvents: introComplete ? 'none' : 'auto',
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Progress indicator */}
        {!introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          >
            <div className="text-white/80 text-sm mb-4">
              Scroll to explore
            </div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-0.5 h-12 bg-gradient-to-b from-white/60 to-transparent mx-auto"
            />
            
            {/* Progress bar */}
            <div className="mt-6 w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-100"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <div className="text-white/60 text-xs mt-2">
              {Math.round(scrollProgress * 100)}%
            </div>
          </motion.div>
        )}

        {/* Replay button */}
        <AnimatePresence>
          {showReplayButton && introComplete && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleReplay}
              className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity shadow-2xl pointer-events-auto"
            >
              <RotateRightIcon className="w-5 h-5" />
              Replay Intro
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Spacer for scroll during intro */}
      {!introComplete && (
        <div style={{ height: '300vh' }} />
      )}

      {/* Content that fades in after intro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative z-20"
        style={{
          pointerEvents: introComplete ? 'auto' : 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: introComplete ? 1 : 0,
            y: introComplete ? 0 : 50,
          }}
          transition={{ duration: 1, delay: 0.3 }}
          className="min-h-screen"
        >
          {/* This will be the content placeholder */}
        </motion.div>
      </motion.div>
    </>
  );
}
