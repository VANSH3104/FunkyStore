"use client"

import * as React from "react"
import { api } from "@/trpc/react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
    Package,
    ChevronRight,
    ArrowLeft,
    Clock,
    CheckCircle2,
    Truck,
    AlertCircle,
    ArrowRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { AuthPortal } from "@/components/auth/auth-portal"

export default function OrdersPage() {
    const { data: session, status } = useSession()
    const { data: orders, isLoading } = api.account.getOrders.useQuery(undefined, {
        enabled: !!session,
    })

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-2 border-gray-100 border-t-black rounded-full animate-spin" />
            </div>
        )
    }

    if (!session) {
        return <AuthPortal isPopup />
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "DELIVERED": return <CheckCircle2 className="w-3 h-3" />
            case "SHIPPED": return <Truck className="w-3 h-3" />
            case "PROCESSING": return <Clock className="w-3 h-3" />
            default: return <AlertCircle className="w-3 h-3" />
        }
    }

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "DELIVERED": return "bg-green-50 text-green-700 border-green-100"
            case "SHIPPED": return "bg-blue-50 text-blue-700 border-blue-100"
            case "PROCESSING": return "bg-amber-50 text-amber-700 border-amber-100"
            default: return "bg-gray-50 text-gray-700 border-gray-100"
        }
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-black">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="mb-12 space-y-4">
                    <Link href="/account" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                        <ArrowLeft className="w-3 h-3" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Order <span className="text-gray-400">History</span></h1>
                </div>

                {!orders || orders.length === 0 ? (
                    <div className="py-24 text-center border-4 border-dashed border-gray-100 bg-white italic">
                        <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                        <h2 className="text-xl font-black uppercase tracking-tight text-gray-400">No Orders Yet</h2>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mt-2 italic">You haven't placed any orders with us yet.</p>
                        <Link href="/products">
                            <Button className="mt-8 bg-black text-white hover:bg-gray-800 rounded-none h-12 px-8 text-xs font-bold uppercase tracking-widest">Shop Collection</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order: any) => (
                            <div key={order.id} className="bg-white border border-gray-100 hover:border-black transition-all group overflow-hidden shadow-sm hover:shadow-md italic">
                                {/* Order Header */}
                                <div className="bg-gray-50/50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                                        <div className="space-y-1">
                                            <p className="text-[9px] uppercase font-bold tracking-widest text-gray-400">Order Number</p>
                                            <p className="text-[13px] font-black uppercase tracking-tight">#{order.orderNumber}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] uppercase font-bold tracking-widest text-gray-400">Date Placed</p>
                                            <p className="text-[13px] font-black uppercase tracking-tight">{format(new Date(order.createdAt), "MMM dd, yyyy")}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] uppercase font-bold tracking-widest text-gray-400">Total Amount</p>
                                            <p className="text-[13px] font-black uppercase tracking-tight">${order.total.toFixed(2)}</p>
                                        </div>
                                        <div className="space-y-1 flex flex-col items-start md:items-end">
                                            <p className="text-[9px] uppercase font-bold tracking-widest text-gray-400 md:text-right">Status</p>
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest border",
                                                getStatusStyles(order.status)
                                            )}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items & Action */}
                                <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                                    <div className="flex -space-x-4 overflow-hidden">
                                        {order.items.map((item: any, idx: number) => (
                                            <div
                                                key={item.id}
                                                className="relative w-20 aspect-[3/4] bg-gray-50 border border-white ring-4 ring-white shadow-sm transition-transform group-hover:translate-y-[-4px]"
                                                style={{ zIndex: 10 - idx }}
                                            >
                                                {item.product.images[0] && (
                                                    <Image
                                                        src={item.product.images[0].url}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                                {item.quantity > 1 && (
                                                    <div className="absolute -bottom-1 -right-1 bg-black text-white text-[8px] font-bold px-1.5 py-0.5 z-20">
                                                        x{item.quantity}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full md:w-auto">
                                        <Link href={`/order-tracking/${order.id}`}>
                                            <Button variant="outline" className="w-full md:w-auto rounded-none border border-black hover:bg-black hover:text-white uppercase font-black text-[10px] tracking-widest h-12 px-8 flex items-center gap-2 group/btn">
                                                Track Delivery <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
