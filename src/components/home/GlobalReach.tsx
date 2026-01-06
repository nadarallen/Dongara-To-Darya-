"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Generate random points for "Global Reach" effect + targeted markers
const markers = [
    { country: "USA", coords: [1.5, 1.5, 0] },     // Approx
    { country: "UK", coords: [0.5, 2.2, 2.5] },
    { country: "UAE", coords: [2.5, 1.0, 3.5] },
    { country: "Australia", coords: [4, -1.5, 2] },
];

function InteractiveGlobe() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Base Ocean Sphere */}
            <Sphere args={[2, 64, 64]}>
                <meshStandardMaterial
                    color="#264653"
                    roughness={0.6}
                    metalness={0.2}
                    wireframe={false}
                />
            </Sphere>

            {/* Wireframe Overlay */}
            <Sphere args={[2.02, 64, 64]}>
                <meshStandardMaterial
                    color="#2A9D8F"
                    wireframe={true}
                    transparent
                    opacity={0.15}
                />
            </Sphere>

            {/* Glowing Markers (Simplified Representation) */}
            {/* Actually mapping lat/long to 3D vector is complex without a utility. 
                I'll use a random-ish distribution of glowing 'ports' for visual effect. 
            */}
            {[...Array(12)].map((_, i) => (
                <mesh key={i} position={new THREE.Vector3().randomDirection().multiplyScalar(2)} rotation={[0, 0, 0]}>
                    <sphereGeometry args={[0.04, 8, 8]} />
                    <meshBasicMaterial color="#FFB703" />
                </mesh>
            ))}

        </group>
    )
}


export default function GlobalReach() {
    return (
        <section className="py-24 bg-brand-navy overflow-hidden relative" id="global">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    <div className="w-full md:w-1/2 space-y-8 text-white">
                        <div className="space-y-4">
                            <span className="text-brand-mango font-bold tracking-widest uppercase text-sm">Worldwide Network</span>
                            <h2 className="text-4xl md:text-5xl font-bold font-heading">
                                Delivering to <br /><span className="text-brand-teal">20+ Countries</span>
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Our established logistics network ensures timely delivery to major ports across USA, Europe, Middle East, and Asia-Pacific.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {["United States", "United Kingdom", "Germany", "UAE", "Singapore", "Australia"].map((c) => (
                                <div key={c} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-brand-mango" />
                                    <span className="text-sm font-medium text-gray-200">{c}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 h-[500px] relative">
                        <div className="absolute inset-0 bg-brand-teal/5 rounded-full blur-3xl" />
                        <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={2} />
                            <InteractiveGlobe />
                            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                        </Canvas>
                    </div>

                </div>
            </div>
        </section>
    );
}
