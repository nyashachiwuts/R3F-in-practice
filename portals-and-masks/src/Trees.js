import { useLoader } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Trees() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/trees.glb");

  useEffect(() => {
    if(!gltf) return;

    let mesh = gltf.scene.children[0];
    mesh.material.envMapIntensity = 2.5;
  }, [gltf]);

  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}