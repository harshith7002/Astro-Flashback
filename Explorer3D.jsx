import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDExplorer = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000011);
    rendererRef.current = renderer;

    if (!mountRef.current.contains(renderer.domElement)) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const createPlanet = (size, color, distance, speed) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color });
      const planet = new THREE.Mesh(geometry, material);
      const orbit = new THREE.Object3D();
      orbit.add(planet);
      planet.position.x = distance;
      return { orbit, planet, speed };
    };

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    scene.add(sun);

    const mercury = createPlanet(0.1, 0x8c7853, 1, 0.04);
    const venus = createPlanet(0.15, 0xffc649, 1.5, 0.03);
    const earth = createPlanet(0.16, 0x6b93d6, 2, 0.02);
    const mars = createPlanet(0.12, 0xc1440e, 2.5, 0.015);
    const jupiter = createPlanet(0.35, 0xd8ca9d, 3.5, 0.01);
    const saturn = createPlanet(0.3, 0xfad5a5, 4.5, 0.008);

    const planets = [mercury, venus, earth, mars, jupiter, saturn];
    planets.forEach(p => scene.add(p.orbit));

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.35, 0.5, 32),
      new THREE.MeshBasicMaterial({ color: 0xfad5a5, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
    );
    ring.rotation.x = Math.PI / 2;
    saturn.planet.add(ring);

    // Stars
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.01 }));
    scene.add(stars);

    // 🌠 Cosmic Shower
    const showerGeometry = new THREE.BufferGeometry();
    const showerCount = 300;
    const showerPositions = new Float32Array(showerCount * 3);
    for (let i = 0; i < showerCount; i++) {
      const i3 = i * 3;
      showerPositions[i3 + 0] = (Math.random() - 0.5) * 20;
      showerPositions[i3 + 1] = Math.random() * 10 + 5;
      showerPositions[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    showerGeometry.setAttribute('position', new THREE.BufferAttribute(showerPositions, 3));
    const showerMaterial = new THREE.PointsMaterial({
      color: 0x88ccff,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });
    const showerParticles = new THREE.Points(showerGeometry, showerMaterial);
    scene.add(showerParticles);

    // 🌠 Comet
    const cometGroup = new THREE.Object3D();
    const cometGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const cometMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const comet = new THREE.Mesh(cometGeometry, cometMaterial);

    const tailGeometry = new THREE.ConeGeometry(0.02, 0.2, 8);
    const tailMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.rotation.x = Math.PI;
    tail.position.y = -0.1;
    comet.add(tail);

    comet.position.x = 7;
    cometGroup.add(comet);
    scene.add(cometGroup);

    // Animate
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Sun spin and background
      sun.rotation.y += 0.01;
      stars.rotation.y += 0.0005;

      // Planet rotation and orbit
      planets.forEach(p => {
        p.orbit.rotation.y += p.speed;
        p.planet.rotation.y += 0.02;
      });

      // Comet orbit and spin
      cometGroup.rotation.y += 0.01;
      comet.rotation.y += 0.2; // Visibly spinning
      tail.lookAt(camera.position);

      // Update meteor shower
      const positions = showerGeometry.attributes.position.array;
      for (let i = 0; i < showerCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] -= 0.05;
        if (positions[i3 + 1] < -5) {
          positions[i3 + 1] = Math.random() * 10 + 5;
          positions[i3 + 0] = (Math.random() - 0.5) * 20;
          positions[i3 + 2] = (Math.random() - 0.5) * 20;
        }
      }
      showerGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-8 rounded-lg shadow-2xl max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">🌌 3D Solar System Explorer</h2>
      
      <div className="flex flex-col items-center">
        <div
          ref={mountRef}
          className="border-2 border-purple-500 rounded-lg overflow-hidden shadow-2xl w-full"
          style={{ height: '600px' }}
        />

        <div className="mt-6 text-center">
          <p className="text-blue-300 mb-4">
            🚀 Explore planets orbiting the Sun — and a glowing comet rotating and flying through space!
                It rotates slowly on cosmic events!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-full"></div><span className="text-white">Sun</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-amber-600 rounded-full"></div><span className="text-white">Mercury</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-300 rounded-full"></div><span className="text-white">Venus</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div><span className="text-white">Earth</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div><span className="text-white">Mars</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-300 rounded-full"></div><span className="text-white">Jupiter</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-200 rounded-full"></div><span className="text-white">Saturn</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-300 rounded-full"></div><span className="text-white">Comet</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDExplorer;
