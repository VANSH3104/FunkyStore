"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Expand, Info, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
    {
        id: 1,
        title: "CORE ESSENTIALS",
        tag: "EDIT 01",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000",
        description: "The synthesis of functional design and premium materials. Optimized for daily urban navigation.",
        color: "text-white",
        bg: "bg-white"
    },
    {
        id: 2,
        title: "UTILITY SERIES",
        tag: "EDIT 02",
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2000",
        description: "Adaptive technical wear for the modern professional. Performance integration as standard.",
        color: "text-gray-400",
        bg: "bg-gray-400"
    },
    {
        id: 3,
        title: "URBAN ESSENTIALS",
        tag: "EDIT 03",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000",
        description: "Sophisticated essentials for the high-end streetwear landscape. Clean silhouettes and refined signatures.",
        color: "text-gray-300",
        bg: "bg-gray-300"
    }
]

export default function LookbookPage() {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)

    React.useEffect(() => {
        if (!isAutoPlaying) return
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [isAutoPlaying])

    const next = () => {
        setIsAutoPlaying(false)
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prev = () => {
        setIsAutoPlaying(false)
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Immersive Background */}
            <div className="fixed inset-0 z-0">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                            index === currentSlide ? "opacity-40 scale-100" : "opacity-0 scale-110"
                        )}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 min-h-screen flex flex-col justify-between p-6 md:p-12 lg:p-24 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Premium Edition - Lookbook</p>
                            <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none group">
                                LUXECHO <span className="text-gray-400">ARCHIVE</span>
                            </h1>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <Button variant="outline" size="icon" className="rounded-none border-white/20 bg-black/50 hover:bg-white hover:text-black transition-colors">
                            <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-none border-white/20 bg-black/50 hover:bg-white hover:text-black transition-colors">
                            <Expand className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Main Slide Content */}
                <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-left-12 duration-1000">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className={cn("w-12 h-0.5", slides[currentSlide].bg)} />
                            <p className={cn("text-xs font-black uppercase tracking-[0.5em]", slides[currentSlide].color)}>
                                {slides[currentSlide].tag}
                            </p>
                        </div>
                        <h2 className="text-7xl md:text-[12rem] font-black uppercase italic tracking-tighter leading-[0.7] md:-ml-2">
                            {slides[currentSlide].title.split(' ')[0]}<br />
                            <span className={cn("inline-block", slides[currentSlide].color)}>
                                {slides[currentSlide].title.split(' ')[1]}
                            </span>
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-end justify-between">
                        <div className="max-w-md space-y-8">
                            <p className="text-sm md:text-xl font-bold uppercase tracking-widest leading-relaxed text-white/60 italic">
                                "{slides[currentSlide].description}"
                            </p>
                            <Button className="h-16 px-12 bg-white text-black font-black uppercase tracking-widest rounded-none hover:bg-gray-100 transition-all">
                                Shop Collection
                            </Button>
                        </div>

                        {/* Slide Selector */}
                        <div className="flex gap-4 p-4 bg-black/50 backdrop-blur-xl border-2 border-white/10">
                            <Button onClick={prev} variant="ghost" className="h-12 w-12 p-0 text-white hover:text-gray-400 rounded-none">
                                <ArrowLeft className="w-6 h-6" />
                            </Button>
                            <div className="flex items-center gap-4 px-8 border-x-2 border-white/10 font-black italic">
                                <span className="text-white">0{currentSlide + 1}</span>
                                <span className="text-white/20">/</span>
                                <span className="text-white/40">0{slides.length}</span>
                            </div>
                            <Button onClick={next} variant="ghost" className="h-12 w-12 p-0 text-white hover:text-gray-400 rounded-none">
                                <ArrowRight className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Vertical Text */}
                <div className="absolute right-12 top-1/2 -rotate-90 origin-right hidden lg:block">
                    <p className="text-[10px] font-black uppercase tracking-[1em] text-white/20 whitespace-nowrap">
                        DESIGNED FOR URBAN NAVIGATION // LUXECHO STUDIO 2026
                    </p>
                </div>
            </div>

            {/* Progress Bars */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex h-1 gap-1">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className="flex-grow bg-white/10 transition-all duration-300"
                    >
                        <div
                            className={cn(
                                "h-full bg-white transition-all duration-300",
                                index === currentSlide ? "w-full" : "w-0"
                            )}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
