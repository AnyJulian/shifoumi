import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Cube() {
    const ref = useRef(null)

    useFrame(() => {
        if (!ref.current) {
            return
        }
        ref.current.rotation.x += 0.01;
        ref.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={ref}>
            <boxGeometry />
            <meshBasicMaterial color="red" />

        </mesh>
    )
}