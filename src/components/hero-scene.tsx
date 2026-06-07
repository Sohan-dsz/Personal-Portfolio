"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7);
    camera.lookAt(0, -0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    mount.appendChild(renderer.domElement);

    // Animated wave grid of points (a flowing neon terrain).
    const SIZE = 16;
    const STEP = 0.55;
    const cols = Math.floor((SIZE * 2) / STEP);
    const rows = cols;
    const total = cols * rows;

    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    const base = new Float32Array(total * 2); // original x,z per point

    const cyan = new THREE.Color(0x22d3ee);
    const purple = new THREE.Color(0xa855f7);

    let p = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = -SIZE + i * STEP;
        const z = -SIZE + j * STEP;
        positions[p * 3] = x;
        positions[p * 3 + 1] = 0;
        positions[p * 3 + 2] = z;
        base[p * 2] = x;
        base[p * 2 + 1] = z;

        const t = (i / cols + j / rows) / 2;
        const c = cyan.clone().lerp(purple, t);
        colors[p * 3] = c.r;
        colors[p * 3 + 1] = c.g;
        colors[p * 3 + 2] = c.b;
        p++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const points = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        size: 0.07,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    points.rotation.x = -0.15;
    scene.add(points);

    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      const t = clock.getElapsedTime();
      for (let k = 0; k < total; k++) {
        const x = base[k * 2];
        const z = base[k * 2 + 1];
        const d = Math.sqrt(x * x + z * z);
        const y =
          Math.sin(d * 0.6 - t * 1.4) * 0.9 +
          Math.sin(x * 0.3 + t) * 0.35 +
          Math.cos(z * 0.4 - t * 0.8) * 0.35;
        posAttr.array[k * 3 + 1] = y;
      }
      posAttr.needsUpdate = true;
      points.rotation.y = Math.sin(t * 0.08) * 0.25 + t * 0.02;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      (points.material as THREE.Material).dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
