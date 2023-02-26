import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
import * as THREE from "three";
import gsap from "gsap";
import Car from "./car";

export default function Three() {
  // code to make camera rotate
  const orbitControlsRef = useRef(null);
  useFrame((state) => {
    if (!!orbitControlsRef.current) {
      const { x, y } = state.mouse;
      orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
      orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
      orbitControlsRef.current.update();
    }
  });

  // Animation
  const ballRef = useRef(null);
  useEffect(() => {
    if (!!ballRef.current) {
      // X-axis motion
      if (!!ballRef.current) {
        gsap.to(ballRef.current.position, {
          x: 1,
          duration: 2,
          ease: "power2.out",
        });
        // y-axis animation
        gsap.to(
          ballRef.current.position,
          {
            y: 0.5,
            duration: 1.5,
            ease: "bounce.out",
          },
          "<"
        );
      }
    }
  }, [ballRef.current]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
      />
      {/* Car  */}
      <Car/>

      {/* Ball   */}
      <mesh position={[-2, 2.5, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Floor  */}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#15abc5" />
      </mesh>

      {/* Ambient light */}
      <ambientLight args={["#ffffff", 0.25]} />

      {/* Spotlight */}
      <spotLight
        args={["#ffffff", 1.5, 7, angleToRadians(45, 0.4)]}
        position={[-3, 1, 0]}
        castShadow
      />

      {/* Environment  */}
      <Environment background>
        <mesh>
          <sphereBufferGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color="#1da0dd" side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
}
