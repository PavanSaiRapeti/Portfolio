"use client";

import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader, MeshStandardMaterial, AdditiveBlending, Mesh, Object3D } from 'three';

function Model() {
  const gltf = useLoader(GLTFLoader, '/ccTV.glb');
  const texture = useLoader(TextureLoader, '/woodDif.jpg'); // Update the path to your texture

  gltf.scene.traverse((child: Object3D) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      mesh.material = new MeshStandardMaterial({
        map: texture, // Apply the texture to the material
        color: (mesh.material as MeshStandardMaterial).color,
        blending: AdditiveBlending,
        transparent: true,
      });
    }
  });
  return <primitive object={gltf.scene} />;
}

export default function Home() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Model />
      <OrbitControls />
    </Canvas>
  );
}
