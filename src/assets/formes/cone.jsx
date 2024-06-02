import { motion } from "framer-motion-3d";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Cone() {


    const ref = useRef(null)

    useFrame(() => {
        if (!ref.current) {
            return
        }
        ref.current.rotation.x -= 0.003;
        ref.current.rotation.y += 0.003;
    });


  return (
    <mesh ref={ref}>
        <motion.mesh
        position={[-0.3, 0.4, 0]}
        rotation={[-0.5, 0, -0.3]}
        variants={{
            hover: {
            z: 1.1,
            x: -1.5,
            rotateX: -0.2,
            rotateZ: 0.4
            }
        }}
        >
        <coneGeometry args={[0.3, 0.6, 18]} />
        <meshPhongMaterial color="#fff" specular="#61dafb" shininess={10} />
        </motion.mesh>
    </mesh>
  );
}
