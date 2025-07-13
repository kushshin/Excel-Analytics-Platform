import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Text } from '@react-three/drei';

function Bar({ x, z, h, color }) {
  return (
    <group position={[x, h / 2, z]}>
      <mesh>
        <boxGeometry args={[0.8, h, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html center distanceFactor={8}>
        <span style={{ color: 'white', fontSize: 10 }}>{h}</span>
      </Html>
    </group>
  );
}

export default function BarChart3D({ labels, values, colors }) {
  const offset = -values.length / 2 + 0.5;
  const offsetY = -5;

  return (
    <Canvas shadows camera={{ position: [0, 6, 10], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} castShadow />
      <Suspense fallback={null}>
           <group position={[0, offsetY, 0]}>
        {values.map((v, i) => (
          <Bar
            key={i}
            x={i + offset}   // ✅ shifted X
            z={0}
            h={v}
            color={colors[i % colors.length]}
          />
        ))}

        {labels.map((txt, i) => (
          <Text
            key={txt}
            position={[i + offset, 0, 1.2]}  // ✅ shifted X for labels
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.3}
            color="black" 
            >
            {txt}
          </Text>
        ))}
</group>
        <OrbitControls makeDefault />
      </Suspense>
    </Canvas>
  );
}
