"use client"

import * as React from "react"
import { useSession, signOut } from "next-auth/react"
import { api } from "@/trpc/react"
import {
    ShoppingBag,
    MapPin,
    User,
    LogOut,
    ChevronRight,
    Heart,
    Settings,
    ShieldCheck,
    Lock,
    Package,
    ArrowRight
} from "lucide-react"
import Link from "next/link"
import { AuthPortal } from "@/components/auth/auth-portal"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function ProfilePage() {
    const { data: session, status } = useSession()
    const [activeTab, setActiveTab] = React.useState("overview")

    const { data: profile } = api.account.getProfile.useQuery(undefined, {
        enabled: !!session,
    })

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-2 border-gray-100 border-t-black rounded-full animate-spin" />
            </div>
        )
    }

    if (!session) {
        return <AuthPortal isPopup />
    }

    const { user } = session

    const sidebarItems = [
        { id: "overview", label: "Dashboard", icon: Package, href: "/account" },
        { id: "orders", label: "My Orders", icon: ShoppingBag, href: "/account/orders" },
        { id: "wishlist", label: "Wishlist", icon: Heart, href: "/account/wishlist" },
        { id: "addresses", label: "Addresses", icon: MapPin, href: "/account/addresses" },
        { id: "profile", label: "Account Settings", icon: User, href: "/account/settings" },
        ...(user.role === "ADMIN" ? [{ id: "admin", label: "Admin Panel", icon: ShieldCheck, href: "/admin" }] : []),
    ]

    const quickActions = [
        { title: "Recent Orders", desc: "Track and manage your recent purchases", icon: ShoppingBag, href: "/account/orders" },
        { title: "Wishlist", desc: "Your curated selection of favorites", icon: Heart, href: "/account/wishlist" },
        { title: "Addresses", desc: "Manage your delivery locations", icon: MapPin, href: "/account/addresses" },
    ]

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-black">
            <div className="container mx-auto px-4 py-8 lg:py-16 max-w-7xl">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* LEFT COLUMN: NAVIGATION */}
                    <aside className="lg:col-span-3">
                        <div className="sticky top-8 space-y-8">
                            <div className="bg-white border border-gray-100 p-6 shadow-sm">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Account Menu</h3>
                                <nav className="space-y-1">
                                    {sidebarItems.map((item) => {
                                        const IsActive = activeTab === item.id || (item.id === "overview" && activeTab === "overview")
                                        return (
                                            <Link
                                                key={item.id}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center justify-between px-4 py-3 transition-all group rounded-sm",
                                                    IsActive
                                                        ? "bg-black text-white"
                                                        : "text-gray-500 hover:text-black hover:bg-gray-50"
                                                )}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <item.icon className={cn("w-4 h-4", IsActive ? "text-white" : "text-gray-400 group-hover:text-black")} />
                                                    <span className="text-xs font-semibold">{item.label}</span>
                                                </div>
                                                <ChevronRight className={cn(
                                                    "w-3 h-3 transition-transform",
                                                    IsActive ? "translate-x-0.5 opacity-100" : "opacity-0 group-hover:opacity-100"
                                                )} />
                                            </Link>
                                        )
                                    })}
                                </nav>

                                <button
                                    onClick={() => signOut()}
                                    className="w-full mt-8 flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all rounded-sm group"
                                >
                                    <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                                    <span className="text-xs font-semibold">Sign Out</span>
                                </button>
                            </div>

                            {/* Need Help Card */}
                            <div className="bg-black text-white p-8 space-y-4 shadow-xl">
                                <h4 className="text-xs font-bold uppercase tracking-[0.1em]">Need Assistance?</h4>
                                <p className="text-[11px] text-gray-400 leading-relaxed">
                                    Our support team is available 24/7 to help with your orders and account.
                                </p>
                                <Link href="/support" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-b border-white pb-1 hover:text-gray-300 transition-colors">
                                    Contact Support <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN: CONTENT */}
                    <main className="lg:col-span-9 space-y-8">
                        {/* WELCOME SECTION */}
                        <section className="bg-white border border-gray-100 p-8 lg:p-12 shadow-sm italic">
                            <div className="max-w-2xl space-y-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Welcome Back</p>
                                    <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none">
                                        Hello, <span className="text-gray-400">{user.name?.split(' ')[0] || "Guest"}</span>.
                                    </h2>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    From your dashboard you can view your <Link href="/account/orders" className="text-black underline font-bold underline-offset-4">recent orders</Link>, manage your <Link href="/account/addresses" className="text-black underline font-bold underline-offset-4">shipping addresses</Link>, and edit your <Link href="/account/settings" className="text-black underline font-bold underline-offset-4">account details</Link>.
                                </p>
                            </div>
                        </section>

                        {/* QUICK ACTIONS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {quickActions.map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    className="bg-white border border-gray-100 p-8 flex flex-col items-center text-center space-y-6 group hover:border-black transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    <div className="w-16 h-16 bg-gray-50 flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:text-white rounded-full">
                                        <action.icon className="w-6 h-6" strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xs font-bold uppercase tracking-[0.1em]">{action.title}</h3>
                                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{action.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* ACCOUNT STATUS INFO */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white border border-gray-100 p-8 shadow-sm flex items-center gap-6">
                                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-sm">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</p>
                                    <p className="text-sm font-semibold truncate">{user.email}</p>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-100 p-8 shadow-sm flex items-center gap-6">
                                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-sm">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone Number</p>
                                    <p className="text-sm font-semibold truncate">{profile?.phone || "Not Set"}</p>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-100 p-8 shadow-sm flex items-center gap-6">
                                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-sm text-green-600">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Account Security</p>
                                    <p className="text-sm font-semibold text-green-600">Verified & Secure</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
