"use client"

import * as React from "react"
import { api } from "@/trpc/react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
    Plus,
    MapPin,
    Trash2,
    ArrowLeft,
    Loader2,
    MoreVertical,
    Check
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { AuthPortal } from "@/components/auth/auth-portal"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function AddressesPage() {
    const { data: session, status } = useSession()
    const { toast } = useToast()
    const utils = api.useUtils()
    const [isAddOpen, setIsAddOpen] = React.useState(false)
    const [editingAddress, setEditingAddress] = React.useState<any>(null)

    const { data: addresses, isLoading } = api.account.getAddresses.useQuery(undefined, {
        enabled: !!session,
    })

    const createAddress = api.account.createAddress.useMutation({
        onSuccess: () => {
            utils.account.getAddresses.invalidate()
            toast({ title: "Address Saved", description: "Your new shipping address has been added." })
            setIsAddOpen(false)
        },
        onError: (err) => {
            toast({ title: "Error", description: err.message || "Failed to save address.", variant: "destructive" })
        }
    })

    const updateAddress = api.account.updateAddress.useMutation({
        onSuccess: () => {
            utils.account.getAddresses.invalidate()
            toast({ title: "Address Updated", description: "Your shipping information has been updated." })
            setEditingAddress(null)
        },
        onError: (err) => {
            toast({ title: "Update Failed", description: err.message || "Failed to update address.", variant: "destructive" })
        }
    })

    const deleteAddress = api.account.deleteAddress.useMutation({
        onSuccess: () => {
            utils.account.getAddresses.invalidate()
            toast({ title: "Address Removed", description: "The address has been deleted from your account." })
        }
    })

    const handleAddAddress = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        createAddress.mutate({
            street: formData.get("street") as string,
            city: formData.get("city") as string,
            state: formData.get("state") as string,
            zip: formData.get("zip") as string,
            country: formData.get("country") as string,
            isDefault: formData.get("isDefault") === "on",
        })
    }

    const handleUpdateAddress = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!editingAddress) return
        const formData = new FormData(e.currentTarget)
        updateAddress.mutate({
            id: editingAddress.id,
            street: formData.get("street") as string,
            city: formData.get("city") as string,
            state: formData.get("state") as string,
            zip: formData.get("zip") as string,
            country: formData.get("country") as string,
            isDefault: formData.get("isDefault") === "on",
        })
    }

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

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-black italic">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <Link href="/account" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                            <ArrowLeft className="w-3 h-3" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Shipping <span className="text-gray-400">Addresses</span></h1>
                    </div>

                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-black text-white hover:bg-gray-800 rounded-none h-12 px-8 text-xs font-bold uppercase tracking-widest transition-all">
                                <Plus className="w-4 h-4 mr-2" /> Add New Address
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] rounded-none border-none p-10 italic">
                            <DialogHeader className="mb-8">
                                <DialogTitle className="text-2xl font-black uppercase italic tracking-tight">New Address</DialogTitle>
                                <DialogDescription className="text-xs uppercase font-bold tracking-widest text-gray-400">
                                    Add a delivery location for your orders.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddAddress} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="street" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Street Address</Label>
                                        <Input id="street" name="street" required className="rounded-none border-gray-100 focus:border-black transition-colors" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">City</Label>
                                            <Input id="city" name="city" required className="rounded-none border-gray-100 focus:border-black transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">State / Province</Label>
                                            <Input id="state" name="state" required className="rounded-none border-gray-100 focus:border-black transition-colors" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="zip" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">ZIP / Postal Code</Label>
                                            <Input id="zip" name="zip" required className="rounded-none border-gray-100 focus:border-black transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="country" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Country</Label>
                                            <Input id="country" name="country" required defaultValue="United States" className="rounded-none border-gray-100 focus:border-black transition-colors" />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 pt-2">
                                        <Checkbox id="isDefault" name="isDefault" />
                                        <Label htmlFor="isDefault" className="text-[10px] font-bold uppercase tracking-widest">Set as primary address</Label>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={createAddress.isPending}
                                    className="w-full bg-black text-white hover:bg-gray-800 rounded-none h-14 text-xs font-bold uppercase tracking-widest transition-all mt-4"
                                >
                                    {createAddress.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Address"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {!addresses || addresses.length === 0 ? (
                    <div className="py-24 text-center border-4 border-dashed border-gray-100 bg-white">
                        <MapPin className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                        <h2 className="text-xl font-black uppercase italic text-gray-400">No Addresses Found</h2>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mt-2">Add your first shipping address to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {addresses.map((address: any) => (
                            <div key={address.id} className="bg-white p-8 border border-gray-100 hover:border-black transition-all group relative shadow-sm hover:shadow-md">
                                {address.isDefault && (
                                    <div className="absolute top-0 right-0 bg-black text-white text-[9px] font-bold uppercase px-4 py-1.5 flex items-center gap-1.5 z-10">
                                        <Check className="w-3 h-3" /> Primary
                                    </div>
                                )}

                                <div className="space-y-6">
                                    <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-black text-xl uppercase tracking-tighter leading-none">{address.street}</p>
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                                            {address.city}, {address.state} {address.zip}
                                        </p>
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                                            {address.country.toUpperCase()}
                                        </p>
                                    </div>

                                    <div className="pt-6 flex gap-6 border-t border-gray-50">
                                        <button
                                            onClick={() => setEditingAddress(address)}
                                            className="text-[10px] font-bold uppercase tracking-widest hover:text-black transition-colors text-gray-400"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            disabled={deleteAddress.isPending}
                                            onClick={() => {
                                                if (confirm("Are you sure you want to remove this address?")) {
                                                    deleteAddress.mutate({ id: address.id })
                                                }
                                            }}
                                            className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            {deleteAddress.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : "Remove"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit Address Modal */}
                <Dialog open={!!editingAddress} onOpenChange={(open) => !open && setEditingAddress(null)}>
                    <DialogContent className="sm:max-w-[500px] rounded-none border-none p-10 italic">
                        <DialogHeader className="mb-8">
                            <DialogTitle className="text-2xl font-black uppercase italic tracking-tight">Edit Address</DialogTitle>
                            <DialogDescription className="text-xs uppercase font-bold tracking-widest text-gray-400">
                                Update your delivery coordinates.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleUpdateAddress} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-street" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Street Address</Label>
                                    <Input id="edit-street" name="street" defaultValue={editingAddress?.street} required className="rounded-none border-gray-100 focus:border-black transition-colors" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-city" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">City</Label>
                                        <Input id="edit-city" name="city" defaultValue={editingAddress?.city} required className="rounded-none border-gray-100 focus:border-black transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-state" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">State / Province</Label>
                                        <Input id="edit-state" name="state" defaultValue={editingAddress?.state} required className="rounded-none border-gray-100 focus:border-black transition-colors" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-zip" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">ZIP / Postal Code</Label>
                                        <Input id="edit-zip" name="zip" defaultValue={editingAddress?.zip} required className="rounded-none border-gray-100 focus:border-black transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-country" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Country</Label>
                                        <Input id="edit-country" name="country" defaultValue={editingAddress?.country} required className="rounded-none border-gray-100 focus:border-black transition-colors" />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox id="edit-isDefault" name="isDefault" defaultChecked={editingAddress?.isDefault} />
                                    <Label htmlFor="edit-isDefault" className="text-[10px] font-bold uppercase tracking-widest">Set as primary address</Label>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={updateAddress.isPending}
                                className="w-full bg-black text-white hover:bg-gray-800 rounded-none h-14 text-xs font-bold uppercase tracking-widest transition-all mt-4"
                            >
                                {updateAddress.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Address"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
