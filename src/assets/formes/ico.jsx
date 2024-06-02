import { motion } from "framer-motion-3d";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Icosahedron() {

    const ref = useRef(null)

    useFrame(() => {
        if (!ref.current) {
            return
        }
        ref.current.rotation.x -= 0.002;
        ref.current.rotation.y -= 0.001;
    });

  return (
    <mesh ref={ref}>
        <motion.mesh
        position={[0.1, 0, 0]}
        rotation-z={0.5}
        variants={{
            hover: {
            x: 1.8,
            z: 0.6,
            y: 0.6,
            rotateZ: -0.5
            }
        }}
        >
        <icosahedronGeometry args={[0.7, 0]} />
        <meshPhongMaterial color="#fff" specular="#61dafb" shininess={10} />
        </motion.mesh>
    </mesh>
  );
}
