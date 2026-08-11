import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PerformanceMode } from '../types';

interface ThreeBackgroundCanvasProps {
  performanceMode: PerformanceMode;
  cameraZoomIn?: boolean;
}

export const ThreeBackgroundCanvas: React.FC<ThreeBackgroundCanvasProps> = ({
  performanceMode,
  cameraZoomIn = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Determine particle count based on performance mode
    const particleCount =
      performanceMode === 'high' ? 800 : performanceMode === 'balanced' ? 400 : 180;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c041c, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: performanceMode !== 'low' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, performanceMode === 'high' ? 2 : 1));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xf5ce62, 2, 50);
    pointLight1.position.set(10, 20, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 2, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // 1. Starfield Particles Geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const colors = [
      new THREE.Color(0xf5ce62), // Gold
      new THREE.Color(0x38bdf8), // Cyan
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0xffffff), // White
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 80;
      posArray[i + 1] = (Math.random() - 0.5) * 80;
      posArray[i + 2] = (Math.random() - 0.5) * 80;

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      colorArray[i] = randomColor.r;
      colorArray[i + 1] = randomColor.g;
      colorArray[i + 2] = randomColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: performanceMode === 'high' ? 0.35 : 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);

    // 2. Floating 3D Balloons Geometry Group
    const balloonsGroup = new THREE.Group();
    const balloonColors = [0xf5ce62, 0x38bdf8, 0xa855f7, 0xec4899, 0x10b981];

    const balloonCount = performanceMode === 'high' ? 12 : 6;
    const balloonMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < balloonCount; i++) {
      const radius = 1 + Math.random() * 0.8;
      const sphereGeo = new THREE.SphereGeometry(radius, 16, 16);
      sphereGeo.scale(1, 1.25, 1); // Elongate to balloon shape

      const mat = new THREE.MeshStandardMaterial({
        color: balloonColors[i % balloonColors.length],
        metalness: 0.4,
        roughness: 0.2,
      });

      const balloon = new THREE.Mesh(sphereGeo, mat);
      balloon.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      );

      balloonsGroup.add(balloon);
      balloonMeshes.push(balloon);
    }
    scene.add(balloonsGroup);

    // 3. Floating 3D Gift Cubes
    const giftsGroup = new THREE.Group();
    const giftCount = performanceMode === 'high' ? 6 : 3;

    for (let i = 0; i < giftCount; i++) {
      const size = 1.2 + Math.random() * 0.6;
      const boxGeo = new THREE.BoxGeometry(size, size, size);
      const boxMat = new THREE.MeshStandardMaterial({
        color: 0x52298f,
        metalness: 0.6,
        roughness: 0.3,
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15
      );
      box.rotation.set(Math.random(), Math.random(), Math.random());
      giftsGroup.add(box);
    }
    scene.add(giftsGroup);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate particle mesh
      particleMesh.rotation.y = elapsedTime * 0.05;
      particleMesh.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

      // Float balloons up and down
      balloonMeshes.forEach((balloon, idx) => {
        balloon.position.y += Math.sin(elapsedTime + idx) * 0.02;
        balloon.rotation.y += 0.005;
      });

      // Rotate gifts
      giftsGroup.rotation.y = elapsedTime * 0.1;
      giftsGroup.rotation.x = Math.cos(elapsedTime * 0.08) * 0.1;

      // Handle Camera zoom in transition if triggered
      if (cameraZoomIn && camera.position.z > 20) {
        camera.position.z -= 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [performanceMode, cameraZoomIn]);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />;
};
