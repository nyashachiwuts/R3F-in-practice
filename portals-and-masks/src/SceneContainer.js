import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  SpotLight,
  useDepthBuffer,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  HueSaturation,
  ChromaticAberration,
  GodRays,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";
import { forwardRef, Suspense, useRef } from "react";
import {
  Color,
  ConeGeometry,
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  RingGeometry,
  SphereGeometry,
} from "three";
import { FloatingIsland } from "./FloatingIsland";
import { FloatingRocks } from "./FloatingRocks";
import { Grass } from "./Grass";
import { Portal } from "./Portal";
import { Rocks } from "./Rocks";
import { Trees } from "./Trees";
import { useControls } from "leva";

let lightColor = new Color(1, 0.4, 0.2);
let mesh = new Mesh(
  new CylinderGeometry(0.25, 0.25, 0.2, 20),
  new MeshBasicMaterial({
    color: lightColor,
    transparent: true,
    opacity: 1,
  })
);
mesh.rotation.x = Math.PI * 0.5;
mesh.position.set(1.17, 10.7, -4.1);

export function SceneContainer() {
  const { test } = useControls({
    test: { value: 2, min: 0, max: 10 },
  });

  return (
    <Suspense fallback={null}>
      <Environment
        background={"only"}
        files={process.env.PUBLIC_URL + "textures/bg4.hdr"}
      />
      <Environment
        background={false}
        files={process.env.PUBLIC_URL + "textures/envmap1050esp0.5.hdr"}
      />

      <PerspectiveCamera makeDefault fov={50} position={[-2, 10, 21]} />
      <OrbitControls target={[2, 5, 0]} />

      <primitive object={mesh} />

      <spotLight
        penumbra={1}
        distance={500}
        angle={60.65}
        attenuation={1}
        anglePower={3}
        intensity={0.3}
        color={lightColor}
        position={[1.19, 10.85, -4.45]}
        target-position={[0, 0, -1]}
      />

      <FloatingIsland />
      <Portal />
      <Trees />
      <Rocks />
      <FloatingRocks />
      <Grass />

      <EffectComposer>
        <DepthOfField
          focusDistance={0.012} // where to focus
          focalLength={0.013} // focal length
          // bokehScale={4} // bokeh size
          bokehScale={8} // bokeh size
        />
        <HueSaturation hue={0} saturation={-0.15} />
        <ChromaticAberration
          radialModulation={true}
          offset={[0.00175, 0.00175]}
        />
        <GodRays
          sun={mesh}
          blendFunction={BlendFunction.Screen}
          samples={40}
          density={0.97}
          decay={0.97}
          weight={0.6}
          exposure={0.3}
          clampMax={1}
          width={Resizer.AUTO_SIZE}
          height={Resizer.AUTO_SIZE}
          kernelSize={KernelSize.SMALL}
          blur={true}
        />
      </EffectComposer>
    </Suspense>
  );
}
