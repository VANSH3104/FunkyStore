"use client"

import * as React from "react"
import { api } from "@/trpc/react"
import { Search, X, ShoppingBag, ArrowRight, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SearchOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = React.useState("")
    const [debouncedQuery, setDebouncedQuery] = React.useState("")
    const router = useRouter()

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query)
        }, 300)
        return () => clearTimeout(timer)
    }, [query])

    const { data, isLoading } = api.product.list.useQuery(
        { search: debouncedQuery, take: 6 },
        { enabled: debouncedQuery.length > 0 }
    )

    const handleSelect = (slug: string) => {
        onClose()
        router.push(`/product/${slug}`)
    }

    // Handle Escape key & Scroll Lock
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }

        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        window.addEventListener("keydown", handleEsc)
        return () => {
            window.removeEventListener("keydown", handleEsc)
            document.body.style.overflow = "unset"
        }
    }, [onClose, isOpen])

    const trendingCategories = [
        { name: "New Arrivals", href: "/products" },
        { name: "Best Sellers", href: "/products" },
        { name: "Collections", href: "/collections" },
        { name: "Lookbook", href: "/lookbook" },
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    onClick={onClose}
                    className="fixed inset-0 z-[100] bg-black/5 flex flex-col items-center pt-24 px-6 md:px-12 overflow-y-auto cursor-pointer"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-5xl space-y-16 relative cursor-default"
                    >
                        <div className="absolute -top-12 right-0">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="text-black hover:bg-black hover:text-white transition-all rounded-full p-2"
                            >
                                <X className="w-8 h-8" strokeWidth={1} />
                            </Button>
                        </div>

                        {/* Search Input Section */}
                        <div className="relative group border-b-2 border-black/10 focus-within:border-black transition-colors py-4">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-black origin-left"
                            />
                            <Input
                                autoFocus
                                placeholder="TYPE TO DISCOVER..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="h-24 md:h-32 bg-transparent border-none rounded-none text-4xl md:text-8xl font-black uppercase italic tracking-tighter placeholder:text-gray-100 transition-all text-black outline-none ring-0 focus-visible:ring-0 p-0"
                            />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                                {isLoading ? (
                                    <Loader2 className="w-12 h-12 text-black animate-spin" strokeWidth={1} />
                                ) : (
                                    <Search className="w-12 h-12 text-gray-200 group-focus-within:text-black transition-colors" strokeWidth={1} />
                                )}
                            </div>
                        </div>

                        {/* Spacer if needed */}
                        {!query && (
                            <div className="h-32" />
                        )}

                        {/* Search Results */}
                        <div className="relative space-y-8">
                            {/* Floating Dynamic Preview Image */}
                            <AnimatePresence>
                                {data?.items[0] && query && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 40, scale: 0.8 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: 40, scale: 0.8 }}
                                        className="absolute -top-48 right-0 hidden lg:block z-50 pointer-events-none"
                                    >
                                        <div className="relative w-64 aspect-[3/4] border-2 border-black p-2 bg-white shadow-[30px_30px_0px_rgba(0,0,0,0.05)] -rotate-3 overflow-visible">
                                            <div className="absolute -top-10 -right-6 text-[10px] font-black uppercase tracking-[0.5em] text-white bg-black px-4 py-2 border border-black shadow-xl whitespace-nowrap">
                                                Visual Diagnostic: 01
                                            </div>
                                            <div className="relative w-full h-full overflow-hidden">
                                                <Image
                                                    src={data.items[0].images[0].url}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover transition-all duration-700 hover:scale-110"
                                                />
                                            </div>
                                            {/* Decorative Elements */}
                                            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-l-2 border-b-2 border-black" />
                                            <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex flex-col items-center gap-1 opacity-20">
                                                <div className="h-[1px] w-24 bg-black" />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Archive Reference</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {debouncedQuery.length > 0 && !isLoading && data?.items.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center py-20 text-center"
                                >
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                        <X className="w-10 h-10 text-gray-200" strokeWidth={1} />
                                    </div>
                                    <p className="text-xl font-black uppercase italic tracking-tighter">Null Match Detected</p>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">Adjust your parameters for broader discovery</p>
                                </motion.div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data?.items.map((item: any, i: number) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => handleSelect(item.slug)}
                                        className="group relative flex flex-col gap-4 border border-gray-50 p-4 hover:border-black transition-all cursor-pointer bg-white"
                                    >
                                        <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                                            {item.images[0] && (
                                                <Image
                                                    src={item.images[0].url}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                                <span className="text-[10px] bg-white text-black font-black px-3 py-1 uppercase tracking-widest shadow-xl">
                                                    View Detail
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between items-start">
                                                <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">
                                                    {item.categories?.[0]?.name || "Uncategorized"}
                                                </p>
                                                <p className="text-[11px] font-black uppercase tracking-tight">
                                                    ₹{item.price.toString()}
                                                </p>
                                            </div>
                                            <p className="text-lg font-black uppercase italic tracking-tighter group-hover:text-black leading-none mt-1">
                                                {item.name}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {debouncedQuery && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="pt-12 flex justify-center"
                            >
                                <Link href={`/products?search=${query}`} onClick={onClose}>
                                    <Button className="bg-black text-white font-black uppercase px-16 h-20 rounded-none text-xl tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                                        ANALYZE ALL RESULTS ({data?.total || 0})
                                    </Button>
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    {/* Aesthetic Footer Branding */}
                    <div className="mt-auto pb-12 flex gap-12 items-center justify-center opacity-10 text-[10px] font-black uppercase tracking-[0.8em] text-black">
                        <span>PRECISION</span>
                        <div className="w-1.5 h-1.5 bg-black" />
                        <span>EDITORIAL</span>
                        <div className="w-1.5 h-1.5 bg-black" />
                        <span>TECHNICAL</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
