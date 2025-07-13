// src/Components/PieChart3D.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';


const EPS = 1e-6;
function Slice({ startAngle, endAngle, radius, height, color }) {
    if (Math.abs(endAngle - startAngle) < EPS) return null;
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.absarc(0, 0, radius, startAngle, endAngle, false);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: false,
  });
  geometry.rotateX(-Math.PI / 2);            
  geometry.translate(0, height / 2, 0);       

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function PieChart3D({ labels, values, colors }) {
  const total = values.reduce((a, b) => a + b, 0) || 1;
  let cursor = 0;
  const radius = 4;
  const height = 1;      

  const slices = values.map((v, i) => {
    const start = cursor;
    const end = cursor + (v / total) * Math.PI * 2;
    cursor = end;
    return (
      <Slice
        key={i}
        startAngle={start}
        endAngle={end}
        radius={radius}
        height={height}
        color={colors[i % colors.length]}
      />
    );
  });

  return (
    <Canvas camera={{ position: [0, 6, 10], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} />
      <Suspense fallback={null}>{slices}</Suspense>
      <OrbitControls makeDefault />
    </Canvas>
  );
}
