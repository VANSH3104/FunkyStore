"use client"

import { api } from "@/trpc/react"
import { motion, AnimatePresence } from "framer-motion"
import NextImage from "next/image"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

/* ── fallback slides if DB is empty ───────────────────────────────── */
const FALLBACK_SLIDES = [
    {
        id: "fallback-1",
        title: "DEFINING LUXURY",
        subtitle: "New Collection — SS2026",
        ctaText: "Explore Drop",
        ctaLink: "/products",
        image: "/assets/images/brand/hero_cinematic_background_v2_1771587109566.png",
    },
    {
        id: "fallback-2",
        title: "ELEVATED BASICS",
        subtitle: "Essentials Worth Repeating",
        ctaText: "Shop Now",
        ctaLink: "/products",
        image: "/assets/images/brand/womens_premium_streetwear_sunset_1771587061342.png",
    },
    {
        id: "fallback-3",
        title: "VARSITY EDIT",
        subtitle: "Collection 001 — Poolside",
        ctaText: "View Collection",
        ctaLink: "/products",
        image: "/assets/images/brand/mens_emerald_varsity_poolside_1771586994342.png",
    },
]

const SLIDE_DURATION = 6000 // ms

export function HeroSlideshow() {
    const { data: dbSlides } = api.cms.getActiveSlides.useQuery()
    const slides = dbSlides && dbSlides.length > 0 ? dbSlides : FALLBACK_SLIDES

    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
    const [hovered, setHovered] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])

    const goTo = (idx: number, dir: number) => {
        setDirection(dir)
        setCurrent(idx)
    }
    const next = () => goTo((current + 1) % slides.length, 1)
    const prev = () => goTo((current - 1 + slides.length) % slides.length, -1)

    useEffect(() => {
        if (hovered) return
        intervalRef.current = setTimeout(next, SLIDE_DURATION)
        return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
    }, [current, hovered, slides.length])

    const slide = slides[current]!

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? "6%" : "-6%", opacity: 0, scale: 1.04 }),
        center: { x: "0%", opacity: 1, scale: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? "-6%" : "6%", opacity: 0, scale: 0.97 }),
    }

    return (
        <section
            ref={ref}
            className="relative h-screen w-full overflow-hidden bg-black flex items-end"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* ── Background Image */}
            <AnimatePresence custom={direction} mode="sync">
                <motion.div
                    key={slide.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
                    style={{ y }}
                    className="absolute inset-0 scale-110"
                >
                    <NextImage
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover object-center"
                        priority
                        unoptimized
                    />
                    {/* Subtle vignette only */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* ── Slide navigation arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300 backdrop-blur-sm bg-black/20"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300 backdrop-blur-sm bg-black/20"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

            {/* ── Slide dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_: unknown, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => goTo(idx, idx > current ? 1 : -1)}
                            className={`transition-all duration-500 rounded-full ${idx === current ? "w-8 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}
