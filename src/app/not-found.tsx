"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EyeOff } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
            <div className="text-center space-y-12 max-w-lg">
                <div className="relative inline-block">
                    <h1 className="text-[12rem] font-black uppercase italic tracking-tighter leading-none text-white/5">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <EyeOff className="w-24 h-24 text-white" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter">PAGE <span className="text-red-500">NOT FOUND</span></h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground leading-relaxed max-w-sm mx-auto">
                        The page you are looking for does not exist or has been moved to a different location.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button className="w-full sm:w-auto h-16 px-12 bg-white text-black font-black uppercase tracking-widest rounded-none shadow-[8px_8px_0px_rgba(255,255,255,0.1)]">
                            Return Home
                        </Button>
                    </Link>
                    <Link href="/products">
                        <Button variant="outline" className="w-full sm:w-auto h-16 px-12 rounded-none border-2 border-white text-white font-black uppercase tracking-widest">
                            Shop Arrivals
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
