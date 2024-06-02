import { motion } from "framer-motion-3d";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Torus() {

    const ref = useRef(null)

    useFrame(() => {
        if (!ref.current) {
            return
        }
        ref.current.rotation.x += 0.003;
        ref.current.rotation.y -= 0.003;
    });

  return (
    <mesh ref={ref}>
        <motion.mesh
        position={[2.5, 0.4, 1.2]}
        rotation={[-0.5, 0.5, 0]}
        variants={{
            hover: {
            y: 0.5,
            z: 2,
            rotateY: -0.2
            }
        }}
        >
        <torusGeometry args={[0.2, 0.1, 10, 50]} />
        <meshPhongMaterial color="#fff" specular="#61dafb" shininess={10} />
        </motion.mesh>
    </mesh>
  );
}
