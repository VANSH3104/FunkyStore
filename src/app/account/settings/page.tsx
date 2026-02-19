"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import { api } from "@/trpc/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Shield, Bell, ArrowLeft, Loader2, Save, User, UserCog } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { AuthPortal } from "@/components/auth/auth-portal"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
    const { data: session, status, update } = useSession()
    const { toast } = useToast()
    const [name, setName] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [activeSection, setActiveSection] = React.useState("profile")

    React.useEffect(() => {
        if (session?.user?.name) setName(session.user.name)
        // Note: Phone might not be in the default session, so we might need to fetch it or ensure it's in the session.
        // For now, let's pull it if available from a query if we were doing getProfile, 
        // but session update should handle it if next-auth is configured.
    }, [session])

    // Let's fetch the full profile to ensure we have the phone number
    const { data: profile } = api.account.getProfile.useQuery(undefined, {
        enabled: !!session,
    })

    React.useEffect(() => {
        if (profile?.phone) setPhone(profile.phone)
    }, [profile])

    const updateProfile = api.account.updateProfile.useMutation({
        onSuccess: async () => {
            await update()
            toast({ title: "Profile Updated", description: "Your account information has been successfully saved." })
        },
        onError: (err) => {
            toast({ title: "Update Failed", description: err.message || "An error occurred while updating your profile.", variant: "destructive" })
        }
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

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-black italic">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-12 space-y-4">
                    <Link href="/account" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                        <ArrowLeft className="w-3 h-3" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Account <span className="text-gray-400">Settings</span></h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <aside className="lg:col-span-1 border-r border-gray-100 pr-8">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Sections</p>
                        <nav className="flex flex-col gap-1">
                            {[
                                { id: "profile", label: "Profile", icon: User },
                                { id: "security", label: "Security", icon: Shield },
                                { id: "notifications", label: "Preferred", icon: Bell },
                            ].map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all text-left",
                                        activeSection === section.id
                                            ? "bg-black text-white"
                                            : "text-gray-400 hover:text-black hover:bg-gray-50"
                                    )}
                                >
                                    <section.icon className="w-3.5 h-3.5" />
                                    {section.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <div className="lg:col-span-3">
                        {activeSection === "profile" && (
                            <section className="space-y-10 bg-white p-10 shadow-sm border border-gray-100">
                                <div className="space-y-2 border-b border-gray-50 pb-6">
                                    <h2 className="text-xl font-black uppercase tracking-tight">Personal Information</h2>
                                    <p className="text-[11px] text-gray-400 uppercase font-medium tracking-wide">Update your contact details and identity.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName" className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="rounded-none border-gray-100 focus:border-black h-12 font-bold text-sm bg-gray-50/30"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Not available"
                                            className="rounded-none border-gray-100 focus:border-black h-12 font-bold text-sm bg-gray-50/30"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Email Address</Label>
                                        <Input
                                            value={session.user.email ?? ""}
                                            disabled
                                            className="rounded-none border-gray-100 bg-gray-100/50 h-12 font-bold text-sm text-gray-400 cursor-not-allowed"
                                        />
                                        <p className="text-[9px] text-gray-300 italic">Email cannot be changed through the profile settings.</p>
                                    </div>

                                    <Button
                                        disabled={updateProfile.isPending}
                                        onClick={() => updateProfile.mutate({ name, phone })}
                                        className="w-full bg-black text-white font-bold uppercase tracking-widest rounded-none h-14 hover:bg-gray-800 transition-all mt-4"
                                    >
                                        {updateProfile.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                                    </Button>
                                </div>
                            </section>
                        )}

                        {activeSection !== "profile" && (
                            <section className="bg-white p-16 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-6 italic">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                                    {activeSection === "security" ? <Shield className="w-8 h-8" /> : <Bell className="w-8 h-8" />}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-black uppercase tracking-tight text-gray-400">Section Reserved</h3>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-300 max-w-xs mx-auto">This area of the dashboard is currently under optimization.</p>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
