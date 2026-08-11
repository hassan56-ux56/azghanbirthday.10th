import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Maximize2, Camera, Eye } from 'lucide-react';
import { INITIAL_GALLERY_PHOTOS } from '../data/initialData';
import { GalleryPhoto, PerformanceMode } from '../types';
import { GoldFrameBorder } from './GoldFrameBorder';

interface Virtual3DMemoryRoomProps {
  performanceMode: PerformanceMode;
  hostName: string;
  photos?: GalleryPhoto[];
}

export const Virtual3DMemoryRoom: React.FC<Virtual3DMemoryRoomProps> = ({
  performanceMode,
  hostName,
  photos = INITIAL_GALLERY_PHOTOS,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Pilgrimage', 'Celebration', 'Culture', 'Moments', 'Adventures', 'Family'];

  const galleryList = photos.length > 0 ? photos : INITIAL_GALLERY_PHOTOS;

  const filteredPhotos =
    activeCategory === 'All'
      ? galleryList
      : galleryList.filter((p) => p.category === activeCategory);

  // 3D Canvas setup for Virtual Photo Room
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Room Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f0524, 0.02);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.8, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: performanceMode !== 'low' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, performanceMode === 'high' ? 2 : 1));
    container.appendChild(renderer.domElement);

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xf5ce62, 2, 30);
    goldLight.position.set(0, 8, 5);
    scene.add(goldLight);

    // Create 3D Floating Picture Frames arranged in a semicircle
    const textureLoader = new THREE.TextureLoader();
    const frameGroup = new THREE.Group();
    const frameMeshes: THREE.Mesh[] = [];

    const totalFrames = Math.min(INITIAL_GALLERY_PHOTOS.length, performanceMode === 'low' ? 6 : 12);

    for (let i = 0; i < totalFrames; i++) {
      const photo = INITIAL_GALLERY_PHOTOS[i];
      const angle = (i / totalFrames) * Math.PI * 1.5 - Math.PI * 0.75;
      const radius = 8;

      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - radius;
      const y = Math.sin(i) * 0.8 + 1;

      // Frame Box Geometry (Maximum Size)
      const frameGeo = new THREE.BoxGeometry(3.2, 3.8, 0.12);

      // Gold Frame Material
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0xe6c363,
        metalness: 0.8,
        roughness: 0.2,
      });

      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      frameMesh.position.set(x, y, z);
      frameMesh.rotation.y = -angle;

      // Load texture for photo canvas inside frame
      textureLoader.load(photo.url, (texture) => {
        const photoGeo = new THREE.PlaneGeometry(2.9, 3.5);
        const photoMat = new THREE.MeshBasicMaterial({ map: texture });
        const photoPlane = new THREE.Mesh(photoGeo, photoMat);
        photoPlane.position.z = 0.06;
        frameMesh.add(photoPlane);
      });

      frameMesh.userData = { photo };
      frameGroup.add(frameMesh);
      frameMeshes.push(frameMesh);
    }

    scene.add(frameGroup);

    // Raycaster for clicking 3D frames
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(frameMeshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        if (clickedMesh.userData && clickedMesh.userData.photo) {
          setSelectedPhoto(clickedMesh.userData.photo);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('click', handleCanvasClick);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slowly rotate 3D frame gallery
      frameGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('click', handleCanvasClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [performanceMode]);

  return (
    <section id="memory-room" className="relative py-12 px-4 sm:px-8 max-w-6xl mx-auto text-center z-10">
      <GoldFrameBorder>
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#E6C363] font-bold">
            Interactive 3D Virtual Gallery
          </p>
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
        </div>

        <h2 className="font-script text-4xl sm:text-6xl gold-text-gradient mb-2">
          3D Photo Memory Room
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6 font-light">
          Orbit through {hostName}&apos;s virtual 3D photo room. Click any 3D picture frame or photo card below to explore memorable moments!
        </p>

        {/* 3D Room WebGL Viewport Canvas Container (Maximum Size Frame) */}
        <div className="relative w-full h-[380px] sm:h-[480px] md:h-[560px] rounded-3xl overflow-hidden border-2 border-[#E6C363]/60 shadow-2xl bg-[#0F0524] mb-8 group">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Interactive Hint Banner */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#E6C363]/40 text-[11px] text-[#FFF0B3] font-semibold flex items-center gap-2 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-[#F5CE62] animate-pulse" />
            <span>Click any 3D photo frame to inspect!</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'gold-bg-gradient text-[#190933] shadow-[0_0_12px_rgba(245,206,98,0.5)]'
                  : 'bg-[#1D0C38] border border-[#E6C363]/30 text-[#E6C363] hover:border-[#E6C363]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden border border-[#E6C363]/40 bg-[#1A0B2E] p-3 hover:border-[#F5CE62] hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-xl text-left flex flex-col justify-between"
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden mb-3 bg-[#0D051E] flex items-center justify-center border border-[#E6C363]/20 p-2">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-2 rounded-full gold-bg-gradient text-[#190933] font-bold text-xs shadow-lg flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4" /> Expand Full Resolution
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white line-clamp-1 mb-1">{photo.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2 font-light">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </GoldFrameBorder>

      {/* Cinematic Fullscreen High Resolution Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative bg-[#1D0C38] border-2 border-[#E6C363] rounded-3xl p-6 sm:p-8 max-w-3xl w-full text-center shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white font-bold text-sm border border-[#E6C363]/50 hover:bg-[#E6C363] hover:text-[#190933] transition-colors cursor-pointer flex items-center justify-center"
            >
              ✕
            </button>

            <div className="w-full max-h-[70vh] flex items-center justify-center bg-[#0C041C] rounded-2xl border border-[#E6C363]/40 mb-4 p-2 overflow-hidden shadow-2xl">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <Camera className="w-4 h-4 text-[#F5CE62]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#E6C363]">
                {selectedPhoto.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedPhoto.title}</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              &ldquo;{selectedPhoto.caption}&rdquo;
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
