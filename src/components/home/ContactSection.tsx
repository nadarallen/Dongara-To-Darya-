"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Html, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Button } from "@/components/ui/Button";
import { Mail, MessageCircle, MapPin, Phone } from "lucide-react";
import { Suspense } from "react";

function MapPin3D() {
    return (
        <group>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh position={[0, 1, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.5, 1.5, 32]} />
                    <meshStandardMaterial color="#E07A5F" />
                </mesh>
                <mesh position={[0, 1.8, 0]}>
                    <sphereGeometry args={[0.6, 32, 32]} />
                    <meshStandardMaterial color="#E07A5F" />
                </mesh>
                <mesh position={[0, 1.8, 0.4]}>
                    <sphereGeometry args={[0.2, 32, 32]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>
            </Float>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <circleGeometry args={[2, 32]} />
                <meshStandardMaterial color="#264653" opacity={0.2} transparent />
            </mesh>
            {/* Map Plane - Simplified */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
                <planeGeometry args={[8, 6]} />
                <meshStandardMaterial color="#F4F1DE" />
            </mesh>
        </group>
    )
}

export default function ContactSection() {
    const handleWhatsApp = () => {
        window.open("https://wa.me/919876543210", "_blank");
    };

    const handleEmail = () => {
        window.location.href = "mailto:export@dongartodarya.com";
    };

    return (
        <section id="contact" className="py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-brand-clay font-bold tracking-widest uppercase text-sm">Get in Touch</span>
                            <h2 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy">
                                Headquartered in <span className="text-brand-mango">Mumbai</span>
                            </h2>
                            <p className="text-brand-navy/70 text-lg max-w-lg leading-relaxed">
                                Strategically located near India&apos;s largest port, ensuring rapid clearance and shipment. Visit our office or connect digitally.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="w-10 h-10 bg-brand-navy/10 rounded-full flex items-center justify-center shrink-0">
                                    <MapPin className="text-brand-navy w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-navy">Registered Office</h4>
                                    <p className="text-brand-navy/60">101, Export Plaza, Nariman Point, Mumbai - 400021</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="w-10 h-10 bg-brand-navy/10 rounded-full flex items-center justify-center shrink-0">
                                    <Phone className="text-brand-navy w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-navy">Phone Support</h4>
                                    <p className="text-brand-navy/60">+91 98765 43210 (Mon-Sat, 9am - 7pm IST)</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button onClick={handleWhatsApp} size="lg" className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] border-none text-white">
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Chat on WhatsApp
                            </Button>
                            <Button onClick={handleEmail} size="lg" variant="outline" className="flex-1">
                                <Mail className="w-5 h-5 mr-2" />
                                Email Inquiry
                            </Button>
                        </div>
                    </div>

                    {/* Right 3D Map */}
                    <div className="h-[500px] w-full bg-brand-beige rounded-3xl overflow-hidden relative shadow-inner">
                        <Canvas shadows>
                            <PerspectiveCamera makeDefault position={[0, 5, 8]} />
                            <ambientLight intensity={0.6} />
                            <pointLight position={[10, 10, 10]} castShadow />
                            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.5} minPolarAngle={Math.PI / 3} />

                            <Suspense fallback={null}>
                                <MapPin3D />
                                <Html position={[0, 2.8, 0]} center>
                                    <div className="glass-panel px-4 py-2 rounded-lg whitespace-nowrap text-brand-navy font-bold text-sm shadow-xl">
                                        Mumbai HQ
                                    </div>
                                </Html>
                            </Suspense>
                        </Canvas>
                        <div className="absolute bottom-4 right-4 text-xs text-brand-navy/40 font-mono">
                            Interactive 3D Map
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
