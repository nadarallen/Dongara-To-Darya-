"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// --- Low Poly Components ---

function Mountain({ position, color }: { position: [number, number, number]; color: string }) {
    return (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <coneGeometry args={[1.5, 2.5, 4]} /> {/* Pyramid/Low-poly mountain shape */}
            <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
    );
}

function FarmPlot({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Terraced Fields */}
            <mesh position={[0, 0, 0]} receiveShadow>
                <boxGeometry args={[3, 0.4, 3]} />
                <meshStandardMaterial color="#81B29A" /> {/* Brand Green */}
            </mesh>
            <mesh position={[0.5, 0.4, 0.5]} receiveShadow>
                <boxGeometry args={[2, 0.4, 2]} />
                <meshStandardMaterial color="#6E9A85" />
            </mesh>
            {/* Tiny Trees/Crops */}
            {[...Array(5)].map((_, i) => (
                <mesh key={i} position={[(Math.random() - 0.5) * 2, 0.4, (Math.random() - 0.5) * 2]} castShadow>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshStandardMaterial color="#2D6A4F" />
                </mesh>
            ))}
        </group>
    );
}

function SeaContainer({ position, color, rotation }: { position: [number, number, number]; color: string; rotation?: [number, number, number] }) {
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={position} rotation={rotation ? new THREE.Euler(...rotation) : new THREE.Euler(0, 0, 0)}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[1, 1, 2.5]} />
                    <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
                </mesh>
                {/* Container Details */}
                <mesh position={[0, 0, 1.26]}>
                    <planeGeometry args={[0.9, 0.9]} />
                    <meshStandardMaterial color="#888" />
                </mesh>
            </group>
        </Float>
    );
}

function Ocean() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, -1, 2]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#264653" roughness={0.2} metalness={0.1} />
        </mesh>
    );
}

// --- Main Scene ---

const SceneContent = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle rotation for the whole scene interaction
            const t = state.clock.getElapsedTime();
            groupRef.current.rotation.y = Math.sin(t / 8) * 0.1;
        }
    });

    return (
        <group ref={groupRef} rotation={[0, -0.5, 0]}>

            {/* --- Left Side: Dongar (Mountains & Farms) --- */}
            <group position={[-3, 0, -2]}>
                <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                    <Mountain position={[-1, 1, 0]} color="#E07A5F" />
                    <Mountain position={[1.5, 0.5, -1]} color="#DFA06E" />
                    <FarmPlot position={[0, -1, 1]} />
                </Float>
            </group>

            {/* --- Right Side: Darya (Sea & Logistics) --- */}
            <group position={[3, -1, 1]}>
                <Ocean />
                {/* Floating Containers */}
                <SeaContainer position={[0, 0.5, 0]} color="#2A9D8F" rotation={[0, 0.5, 0]} />
                <SeaContainer position={[1.5, 1.5, -1]} color="#FFB703" rotation={[0, -0.2, 0.2]} /> {/* Mango Colored Container */}
                <SeaContainer position={[-1.2, 0.2, 2]} color="#64748B" rotation={[0, 2, 0]} />
            </group>

            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2.5} far={4} />
        </group>
    );
};

export default function HeroScene() {
    return (
        <div className="w-full h-full absolute inset-0 z-0 select-none">
            <Canvas shadows dpr={[1, 2]} className="w-full h-full">
                <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={35} />

                {/* Lighting */}
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow shadow-mapSize={[2048, 2048]} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#81B29A" />

                <SceneContent />

                {/* Environment for reflections */}
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
