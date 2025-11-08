import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function CarViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ y: Math.PI / 2 });

  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(
        containerRef.current.firstChild,
      );
    }

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth /
        containerRef.current.clientHeight,
      0.1,
      10000,
    );
    camera.position.set(0, 0.126, 1.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    // Enable better rendering for realistic materials
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85; // Reduced from 1.2 to less bright
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ===== REALISTIC LIGHTING SETUP (More Natural, Less Bright) =====

    // 1. Ambient light - soft overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25); // Reduced from 0.4
    scene.add(ambientLight);

    // 2. Main Key Light - Natural daylight
    const keyLight = new THREE.DirectionalLight(0xfff4e6, 1.2); // Warmer color, reduced from 2.5
    keyLight.position.set(5, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // 3. Fill Light - Subtle shadow fill
    const fillLight = new THREE.DirectionalLight(0xc8e0f5, 0.4); // Softer blue, reduced from 0.8
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    // 4. Rim Light - Subtle edge definition
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6); // Reduced from 1.5
    rimLight.position.set(0, 2, -6);
    scene.add(rimLight);

    // 5. Accent Light - Very subtle Ferrari glow
    const accentLight = new THREE.PointLight(0xff5533, 0.3, 8); // Reduced from 0.6
    accentLight.position.set(2, 0.3, 1.5);
    scene.add(accentLight);

    // 6. Ground reflection - Natural floor bounce
    const groundLight = new THREE.HemisphereLight(
      0xffffff,
      0x666666,
      0.35,
    ); // Reduced from 0.6
    groundLight.position.set(0, -1, 0);
    scene.add(groundLight);

    // Load GLB model
    const loader = new GLTFLoader();
    const modelPath = "/models/ferrari.glb";

    loader.load(
      modelPath,
      (gltf: any) => {
        const model = gltf.scene;

        // Enhance materials for realism - more natural reflections
        model.traverse((child: any) => {
          if (child.isMesh) {
            if (child.material) {
              child.material.envMapIntensity = 0.9; // Subtle reflections (reduced from 1.5)
              child.material.needsUpdate = true;
            }
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.multiplyScalar(scale);
        model.position.set(
          -center.x * scale,
          -center.y * scale,
          -center.z * scale,
        );
        // Rotate model to side view (90 degrees)
        model.rotation.y = Math.PI / 2;
        scene.add(model);
        modelRef.current = model;
        setLoadingError(false);
      },
      (progress: any) => {
        console.log(
          "Loading:",
          ((progress.loaded / progress.total) * 100).toFixed(
            1,
          ) + "%",
        );
      },
      (error: any) => {
        console.error("Error loading model:", error);
        setLoadingError(true);

        // Placeholder Ferrari
        const placeholderGroup = new THREE.Group();
        const bodyGeometry = new THREE.BoxGeometry(2, 0.4, 0.8);
        const bodyMaterial = new THREE.MeshStandardMaterial({
          color: 0xcc0000,
          metalness: 0.8,
          roughness: 0.2,
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.2;
        placeholderGroup.add(body);

        const roofGeometry = new THREE.BoxGeometry(
          1.2,
          0.35,
          0.7,
        );
        const roof = new THREE.Mesh(roofGeometry, bodyMaterial);
        roof.position.set(-0.2, 0.55, 0);
        placeholderGroup.add(roof);

        const spoilerGeometry = new THREE.BoxGeometry(
          0.3,
          0.05,
          1,
        );
        const spoiler = new THREE.Mesh(
          spoilerGeometry,
          bodyMaterial,
        );
        spoiler.position.set(1.1, 0.05, 0);
        placeholderGroup.add(spoiler);

        const wheelGeometry = new THREE.CylinderGeometry(
          0.15,
          0.15,
          0.1,
          16,
        );
        const wheelMaterial = new THREE.MeshStandardMaterial({
          color: 0x1a1a1a,
          metalness: 0.5,
          roughness: 0.5,
        });

        const wheelPositions = [
          [0.7, 0, 0.45],
          [0.7, 0, -0.45],
          [-0.6, 0, 0.45],
          [-0.6, 0, -0.45],
        ];

        wheelPositions.forEach((pos) => {
          const wheel = new THREE.Mesh(
            wheelGeometry,
            wheelMaterial,
          );
          wheel.rotation.z = Math.PI / 2;
          wheel.position.set(pos[0], pos[1], pos[2]);
          placeholderGroup.add(wheel);
        });

        const glowGeometry = new THREE.BoxGeometry(
          2.1,
          0.05,
          0.85,
        );
        const glowMaterial = new THREE.MeshStandardMaterial({
          color: 0xff0000,
          emissive: 0xff0000,
          emissiveIntensity: 0.5,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.y = 0.05;
        placeholderGroup.add(glow);

        // Rotate placeholder to side view (90 degrees)
        placeholderGroup.rotation.y = Math.PI / 2;
        scene.add(placeholderGroup);
        modelRef.current = placeholderGroup;
      },
    );

    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y = rotationRef.current.y;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth /
        containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX =
      e.clientX - previousMousePositionRef.current.x;

    rotationRef.current.y += deltaX * 0.01;

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
    if (!isDraggingRef.current || e.touches.length !== 1)
      return;

    const deltaX =
      e.touches[0].clientX - previousMousePositionRef.current.x;

    rotationRef.current.y += deltaX * 0.01;

    previousMousePositionRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {loadingError && (
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="bg-yellow-500 bg-opacity-90 text-black px-6 py-4 rounded-lg shadow-lg text-center">
              <p className="mb-1">
                ⚠️ Ferrari 3D Model Not Found
              </p>
              <p className="text-xs">
                Add <strong>ferrari.glb</strong> to{" "}
                <code>/public/models/</code> folder. Using
                placeholder for now.
              </p>
            </div>
          </div>
        )}

        <div
          ref={containerRef}
          className="relative w-full h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        <p className="text-center mt-6 text-gray-600">
          Drag to rotate • Explore the Ferrari from every angle
        </p>
      </div>
    </div>
  );
}