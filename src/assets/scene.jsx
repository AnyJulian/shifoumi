import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { Sphere } from "../assets/formes/sphere";
import { Cone } from "../assets/formes/cone";
import { Torus } from "../assets/formes/torus";
import { Icosahedron } from "../assets/formes/ico";



const Scene = () => {
    return (
        <>
            <Canvas>
                <Lights />
                <motion.mesh position={[-2.2, 0, 2.3]} variants={{ hover: { z: 2 } }}>
                    <Sphere />
                </motion.mesh>
                <motion.mesh position={[-1.2, 0, 1.3]} variants={{ hover: { z: 2 } }}>
                    <Cone />
                </motion.mesh>
                <motion.mesh position={[0.2, 0, -2.3]} variants={{ hover: { z: 2 } }}>
                    <Torus />
                </motion.mesh>
                <motion.mesh position={[5.1, 0, -0.3]} variants={{ hover: { z: 2 } }}>
                    <Icosahedron />
                </motion.mesh>

            </Canvas>
        </>
    )
}

export default Scene

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