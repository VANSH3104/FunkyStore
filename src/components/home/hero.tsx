"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LuxechoLogo } from "@/components/layout/luxecho-logo"
import Image from "next/image"
import { useRef } from "react"

export function Hero() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.19, 1, 0.22, 1] // Equivalent to a smooth easeOutExpo
            }
        }
    }

    return (
        <section ref={containerRef} className="relative min-h-[95vh] flex items-center overflow-hidden bg-black text-white">
            {/* Cinematic Background Image with Parallax */}
            <motion.div style={{ y }} className="absolute inset-0 z-0 scale-110">
                <Image
                    src="/assets/images/brand/hero_cinematic_background_v2_1771587109566.png"
                    alt="Luxecho Cinematic Background"
                    fill
                    className="object-cover opacity-60 scale-110"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            </motion.div>

            {/* Animated Logo Motif (Subtle Echo) */}
            <motion.div
                style={{ opacity }}
                className="absolute -bottom-20 -left-20 w-96 h-96 opacity-[0.1] pointer-events-none z-10"
            >
                <LuxechoLogo size={400} animate={true} />
            </motion.div>

            <div className="container mx-auto px-6 lg:px-12 relative z-20">
                <motion.div
                    className="max-w-5xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="flex items-center gap-6 mb-12">
                        <div className="bg-white p-2 rounded-sm shadow-2xl">
                            <LuxechoLogo size={40} />
                        </div>
                        <div className="h-px w-12 bg-white/30" />
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/60">Spring Summer 2026 Collection</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.75] mb-12 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
                    >
                        LUXURY <br />
                        <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">EVOLVED</span>
                    </motion.h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-white/70 uppercase tracking-[0.15em] leading-relaxed font-bold max-w-md"
                        >
                            Where artisanal craftsmanship meets the pulse of modern minimalsm. <span className="text-white underline decoration-rose-500/50 underline-offset-8">Luxecho</span> is the architectural silhouette of tomorrow.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                            <Link href="/products" className="group">
                                <Button size="lg" className="h-20 px-12 bg-white text-black font-black uppercase tracking-[0.2em] rounded-none text-[11px] md:text-sm hover:translate-x-2 hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                                    Explore Catalog
                                    <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                                    <div className="absolute inset-0 border-2 border-white translate-x-3 translate-y-3 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Accent */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 right-12 flex flex-col items-end gap-2 z-20"
            >
                <div className="w-24 h-[1px] bg-white/50" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Global Collective Collective ©</span>
            </motion.div>
        </section>
    )
}
