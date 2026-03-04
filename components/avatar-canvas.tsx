"use client";

import { Environment, Float, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

const MODEL_PATH = "/models/lee-perry-smith.glb";

type LeeResult = GLTF & {
  nodes: {
    LeePerrySmith: THREE.Mesh;
  };
};

function AvatarModel() {
  const { nodes } = useGLTF(MODEL_PATH) as unknown as LeeResult;
  const rootRef = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));

  const skinMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#f2cebc", roughness: 0.6, metalness: 0.04 }),
    [],
  );
  const eyeMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1f2945", roughness: 0.18, metalness: 0.2 }),
    [],
  );
  const lipMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#b77376", roughness: 0.35, metalness: 0.02 }),
    [],
  );
  const shellMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f7e3d8",
        roughness: 0.48,
        metalness: 0.05,
        transparent: true,
        opacity: 0.62,
      }),
    [],
  );

  const { headGeometry, headScale } = useMemo(() => {
    const geometry = nodes.LeePerrySmith.geometry.clone();
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();

    const box = geometry.boundingBox ?? new THREE.Box3();
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    geometry.translate(-center.x, -center.y, -center.z);

    return {
      headGeometry: geometry,
      headScale: 2.2 / maxDimension,
    };
  }, [nodes.LeePerrySmith.geometry]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * 2 - 1,
      );
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    return () => {
      headGeometry.dispose();
      skinMaterial.dispose();
      eyeMaterial.dispose();
      lipMaterial.dispose();
      shellMaterial.dispose();
    };
  }, [headGeometry, skinMaterial, eyeMaterial, lipMaterial, shellMaterial]);

  useFrame(() => {
    if (!rootRef.current) {
      return;
    }

    const targetX = THREE.MathUtils.clamp(-pointer.current.y * 0.33, -0.3, 0.3);
    const targetY = THREE.MathUtils.clamp(pointer.current.x * 0.5, -0.45, 0.45);

    rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, targetX, 0.1);
    rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, targetY, 0.1);
  });

  return (
    <group ref={rootRef} position={[0, -0.12, 0]}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.86, 80, 80]} />
        <primitive attach="material" object={skinMaterial} />
      </mesh>
      <mesh position={[-0.3, 0.1, 0.74]}>
        <sphereGeometry args={[0.082, 24, 24]} />
        <primitive attach="material" object={eyeMaterial} />
      </mesh>
      <mesh position={[0.3, 0.1, 0.74]}>
        <sphereGeometry args={[0.082, 24, 24]} />
        <primitive attach="material" object={eyeMaterial} />
      </mesh>
      <mesh position={[0, -0.24, 0.72]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.17, 0.021, 16, 64, Math.PI]} />
        <primitive attach="material" object={lipMaterial} />
      </mesh>
      <group scale={headScale * 0.9} rotation={[0, Math.PI, 0]} position={[0, -0.02, 0.03]}>
        <mesh geometry={headGeometry} material={shellMaterial} />
      </group>
    </group>
  );
}

function AvatarFallback() {
  return (
    <mesh castShadow>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshStandardMaterial color="#f4d4c2" roughness={0.52} metalness={0.03} />
    </mesh>
  );
}

export function AvatarCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 2]}
      camera={{ position: [0, 0.08, 3.3], fov: 31 }}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <hemisphereLight args={["#fff9f4", "#cad8f4", 1.22]} />
      <directionalLight position={[2.4, 2.8, 3.2]} intensity={2.3} />
      <directionalLight position={[-1.8, 0.5, 1.4]} intensity={0.55} color="#93d9ff" />
      <Suspense fallback={<AvatarFallback />}>
        <Float speed={1.25} rotationIntensity={0.08} floatIntensity={0.5}>
          <AvatarModel />
        </Float>
      </Suspense>
      <Environment preset="city" />
    </Canvas>
  );
}

useGLTF.preload(MODEL_PATH);
