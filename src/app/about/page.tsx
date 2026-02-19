"use client"

import * as React from "react"
import { Sparkles, Zap, Shield, Globe, Cpu } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-24 space-y-24">
            <header className="space-y-8 max-w-4xl">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-white">
                    <span className="w-12 h-[2px] bg-white" />
                    EST. 2026
                </div>
                <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8]">
                    THE <span className="text-gray-400">ZENZ</span><br />
                    MISSION
                </h1>
                <p className="text-sm md:text-2xl font-bold uppercase tracking-widest text-muted-foreground leading-relaxed italic">
                    We craft apparel for the modern era. Where aesthetic precision meets uncompromising quality.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-16 items-start">
                <div className="space-y-12">
                    <div className="p-8 border-l-4 border-white bg-charcoal/20 space-y-4">
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter">THE CORE</h3>
                        <p className="text-xs font-bold uppercase tracking-widest leading-relaxed text-muted-foreground">
                            Born in the urban landscape of the modern age, Zenz was created for those who demand gear that reflects their identity.
                        </p>
                    </div>

                    <div className="p-8 border-l-4 border-white/10 bg-charcoal/10 space-y-4 hover:border-white transition-colors">
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter">MODERN DESIGN</h3>
                        <p className="text-xs font-bold uppercase tracking-widest leading-relaxed text-muted-foreground">
                            Every component is stripped of excess. We believe in minimalist dominance—maximum utility with zero visual noise.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4 group">
                        <Cpu className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        <h4 className="font-black uppercase tracking-widest text-xs">PRECISION CRAFTED</h4>
                    </div>
                    <div className="space-y-4 group">
                        <Shield className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        <h4 className="font-black uppercase tracking-widest text-xs">GLOBAL LOGISTICS</h4>
                    </div>
                    <div className="space-y-4 group">
                        <Globe className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        <h4 className="font-black uppercase tracking-widest text-xs">WORLDWIDE SHIPPING</h4>
                    </div>
                    <div className="space-y-4 group">
                        <Zap className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        <h4 className="font-black uppercase tracking-widest text-xs">INSTANT SYNC</h4>
                    </div>
                </div>
            </div>

            <footer className="pt-24 border-t-2 border-white/5 text-center">
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white/20">
                    ZENZ SYSTEMS // AUTHENTIC STREETWEAR // EST. 2026
                </p>
            </footer>
        </div>
    )
}
