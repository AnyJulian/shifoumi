import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { Sphere } from "../assets/formes/sphere";
import { Cone } from "../assets/formes/cone";
import { Torus } from "../assets/formes/torus";
import { Icosahedron } from "../assets/formes/ico";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';
import { Plane } from "@react-three/drei";

const Scene = () => {
    return (
        <>
            <Canvas>
                <Lights />
                <WavyBackground />
                <motion.mesh position={[-3.0, 0.5, 2.3]} variants={{ hover: { z: 2 } }}>
                    <Sphere />
                </motion.mesh>
                <motion.mesh position={[-1.8, 1.5, 1.3]} variants={{ hover: { z: 2 } }}>
                    <Cone />
                </motion.mesh>
                <motion.mesh position={[0.2, 3, -2.3]} variants={{ hover: { z: 2 } }}>
                    <Torus />
                </motion.mesh>
                <motion.mesh position={[5.1, 0.3, -0.4]} variants={{ hover: { z: 2 } }}>
                    <Icosahedron />
                </motion.mesh>
            </Canvas>
        </>
    );
};

export default Scene;

export function Lights() {
    return (
      <>
        <spotLight color="#61dafb" position={[-10, -10, -10]} intensity={0.2} />
        <spotLight color="#61dafb" position={[-10, 0, 15]} intensity={0.8} />
        <spotLight color="#61dafb" position={[-5, 20, 2]} intensity={0.5} />
        <spotLight color="#f2056f" position={[15, 10, -2]} intensity={2} />
        <spotLight color="#f2056f" position={[15, 10, 5]} intensity={1} />
        <spotLight color="#b107db" position={[5, -10, 5]} intensity={0.8} />
      </>
    );
}

const WavyBackground = () => {
    const planeRef = useRef();

    useFrame(({ clock }) => {
        planeRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    });

    return (
        <Plane
            ref={planeRef}
            args={[20, 20, 32, 32]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1, 0]}
        >
            <shaderMaterial
                attach="material"
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTime: { value: 0 },
                    uColor: { value: new THREE.Color('black') },
                    uLights: {
                        value: [
                            new THREE.Vector3(-10, -10, -10),
                            new THREE.Vector3(-10, 0, 15),
                            new THREE.Vector3(-5, 20, 2),
                            new THREE.Vector3(15, 10, -2),
                            new THREE.Vector3(15, 10, 5),
                            new THREE.Vector3(5, -10, 5)
                        ]
                    },
                    uLightColors: {
                        value: [
                            new THREE.Color('#61dafb'),
                            new THREE.Color('#61dafb'),
                            new THREE.Color('#61dafb'),
                            new THREE.Color('#f2056f'),
                            new THREE.Color('#f2056f'),
                            new THREE.Color('#b107db')
                        ]
                    }
                }}
                side={THREE.DoubleSide}
            />
        </Plane>
    );
};

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vNormal = normal;
    vPos = position;
    vec3 pos = position;
    pos.z += sin(pos.x * 2.0 + uTime) * 0.22;
    pos.z += cos(pos.y * 2.0 + uTime) * 0.22;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.3);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uLights[6];
  uniform vec3 uLightColors[6];
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vec3 color = uColor;
    vec3 normal = normalize(vNormal);
    vec3 lightReflection = vec3(0.0);
    for (int i = 0; i < 6; i++) {
        vec3 lightDir = normalize(uLights[i] - vPos);
        float diff = max(dot(normal, lightDir), 0.0);
        lightReflection += diff * uLightColors[i];
    }
    color = mix(color, lightReflection, 0.8);
    gl_FragColor = vec4(color, 1.0);
  }
`;
