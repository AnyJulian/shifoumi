import { motion } from "framer-motion-3d";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";


export function Sphere() {

    const ref = useRef(null)

    useFrame(() => {
        if (!ref.current) {
            return
        }
        ref.current.rotation.x += 0.003;
        ref.current.rotation.y += 0.003;
    });


  return (
    <mesh ref={ref}>
        <motion.mesh position={[0.2, 0, 0.3]} variants={{ hover: { z: 2 } }}>
        <sphereGeometry args={[0.4]} />
        <meshPhongMaterial color="#fff" specular="#61dafb" shininess={20} />
        </motion.mesh>
    </mesh>
  );
}
