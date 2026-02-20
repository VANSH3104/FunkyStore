"use client"

import { api } from "@/trpc/react"
import { useState } from "react"
import { Plus, Trash2, Eye, EyeOff, Megaphone, Image as ImageIcon, Edit2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ─── Types ─────────────────────────────────────────────────────────── */
type SlideForm = {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
    image: string
    order: number
    isActive: boolean
}

const EMPTY_SLIDE: SlideForm = {
    title: "",
    subtitle: "",
    ctaText: "Explore Drop",
    ctaLink: "/products",
    image: "",
    order: 0,
    isActive: true,
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export default function HeroSlidesAdminPage() {
    // ── Slides state ──────────────────────────────────────────────────
    const { data: slides = [], refetch: refetchSlides } = api.admin.getHeroSlides.useQuery()
    const createSlide = api.admin.createHeroSlide.useMutation({ onSuccess: () => { refetchSlides(); setShowSlideForm(false); setSlideForm(EMPTY_SLIDE) } })
    const updateSlide = api.admin.updateHeroSlide.useMutation({ onSuccess: () => { refetchSlides(); setEditingSlideId(null) } })
    const deleteSlide = api.admin.deleteHeroSlide.useMutation({ onSuccess: () => refetchSlides() })

    const [showSlideForm, setShowSlideForm] = useState(false)
    const [slideForm, setSlideForm] = useState<SlideForm>(EMPTY_SLIDE)
    const [editingSlideId, setEditingSlideId] = useState<string | null>(null)
    const [editSlideForm, setEditSlideForm] = useState<Partial<SlideForm>>({})

    // ── Announcements state ───────────────────────────────────────────
    const { data: announcements = [], refetch: refetchAnnouncements } = api.admin.getAnnouncements.useQuery()
    const createAnnouncement = api.admin.createAnnouncement.useMutation({ onSuccess: () => { refetchAnnouncements(); setAnnText(""); setAnnLink("") } })
    const updateAnnouncement = api.admin.updateAnnouncement.useMutation({ onSuccess: () => refetchAnnouncements() })
    const deleteAnnouncement = api.admin.deleteAnnouncement.useMutation({ onSuccess: () => refetchAnnouncements() })

    const [annText, setAnnText] = useState("")
    const [annLink, setAnnLink] = useState("")

    const startEditSlide = (slide: typeof slides[0]) => {
        setEditingSlideId(slide.id)
        setEditSlideForm({ title: slide.title, subtitle: slide.subtitle, ctaText: slide.ctaText, ctaLink: slide.ctaLink, image: slide.image, order: slide.order, isActive: slide.isActive })
    }

    return (
        <div className="p-8 lg:p-12 max-w-5xl">
            <div className="mb-10">
                <h1 className="text-3xl font-black uppercase tracking-[0.2em]">Homepage CMS</h1>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">Manage hero slideshow &amp; announcement bar</p>
            </div>

            {/* ══ Hero Slideshow Section ═════════════════════════════════ */}
            <section className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <ImageIcon className="w-5 h-5" />
                        <h2 className="text-sm font-black uppercase tracking-[0.3em]">Hero Slides</h2>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 font-bold uppercase tracking-widest">{slides.length} slides</span>
                    </div>
                    <Button
                        onClick={() => setShowSlideForm(!showSlideForm)}
                        className="bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-none px-6 h-10"
                    >
                        <Plus className="w-3.5 h-3.5 mr-2" /> Add Slide
                    </Button>
                </div>

                {/* New slide form */}
                {showSlideForm && (
                    <div className="border border-black p-6 mb-4 bg-gray-50">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-5">New Slide</p>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Title (first word = solid, rest = outlined)</label>
                                <input placeholder="e.g. DEFINING LUXURY" value={slideForm.title} onChange={e => setSlideForm(p => ({ ...p, title: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm mt-1 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Subtitle</label>
                                <input placeholder="e.g. New Collection — SS2026" value={slideForm.subtitle} onChange={e => setSlideForm(p => ({ ...p, subtitle: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm mt-1 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">CTA Text</label>
                                <input placeholder="Explore Drop" value={slideForm.ctaText} onChange={e => setSlideForm(p => ({ ...p, ctaText: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm mt-1 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">CTA Link</label>
                                <input placeholder="/products" value={slideForm.ctaLink} onChange={e => setSlideForm(p => ({ ...p, ctaLink: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm mt-1 focus:outline-none focus:border-black" />
                            </div>
                            <div className="col-span-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Image URL (use /assets/images/ path or external URL)</label>
                                <input placeholder="/assets/images/brand/..." value={slideForm.image} onChange={e => setSlideForm(p => ({ ...p, image: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm mt-1 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Order</label>
                                <input type="number" value={slideForm.order} onChange={e => setSlideForm(p => ({ ...p, order: parseInt(e.target.value) || 0 }))} className="w-full border border-gray-200 px-3 py-2 text-sm mt-1 focus:outline-none focus:border-black" />
                            </div>
                            <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={slideForm.isActive} onChange={e => setSlideForm(p => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={() => createSlide.mutate(slideForm)} disabled={!slideForm.title || !slideForm.image || createSlide.isPending} className="bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-none px-8 h-10">
                                {createSlide.isPending ? "Saving..." : "Save Slide"}
                            </Button>
                            <Button onClick={() => setShowSlideForm(false)} variant="outline" className="text-[10px] font-black uppercase tracking-widest rounded-none px-6 h-10">Cancel</Button>
                        </div>
                    </div>
                )}

                {/* Slides list */}
                {slides.length === 0 && !showSlideForm && (
                    <div className="border border-dashed border-gray-200 p-12 text-center">
                        <p className="text-gray-400 text-xs uppercase tracking-widest">No slides yet. Add your first slide above.</p>
                        <p className="text-gray-300 text-[10px] mt-2">The homepage will show fallback slides until you add some.</p>
                    </div>
                )}

                <div className="space-y-2">
                    {slides.map((slide) => (
                        <div key={slide.id} className={`border ${slide.isActive ? "border-black" : "border-gray-200"} p-4`}>
                            {editingSlideId === slide.id ? (
                                /* Edit mode */
                                <div className="grid grid-cols-2 gap-3">
                                    <input placeholder="Title" value={editSlideForm.title ?? ""} onChange={e => setEditSlideForm(p => ({ ...p, title: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black" />
                                    <input placeholder="Subtitle" value={editSlideForm.subtitle ?? ""} onChange={e => setEditSlideForm(p => ({ ...p, subtitle: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black" />
                                    <input placeholder="CTA Text" value={editSlideForm.ctaText ?? ""} onChange={e => setEditSlideForm(p => ({ ...p, ctaText: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black" />
                                    <input placeholder="CTA Link" value={editSlideForm.ctaLink ?? ""} onChange={e => setEditSlideForm(p => ({ ...p, ctaLink: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black" />
                                    <input placeholder="Image URL" value={editSlideForm.image ?? ""} onChange={e => setEditSlideForm(p => ({ ...p, image: e.target.value }))} className="col-span-2 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black" />
                                    <div className="col-span-2 flex gap-3 pt-1">
                                        <Button onClick={() => updateSlide.mutate({ id: slide.id, ...editSlideForm })} disabled={updateSlide.isPending} className="bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-none px-6 h-9">
                                            <Check className="w-3.5 h-3.5 mr-1" /> Save
                                        </Button>
                                        <Button onClick={() => setEditingSlideId(null)} variant="outline" className="text-[10px] font-black uppercase tracking-widest rounded-none px-4 h-9">
                                            <X className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                /* View mode */
                                <div className="flex items-center gap-4">
                                    {slide.image && (
                                        <div className="w-20 h-14 bg-gray-100 flex-shrink-0 overflow-hidden relative">
                                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-sm uppercase tracking-wide">{slide.title}</p>
                                        <p className="text-gray-500 text-xs">{slide.subtitle}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">CTA: {slide.ctaText} → {slide.ctaLink} · Order: {slide.order}</p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button onClick={() => updateSlide.mutate({ id: slide.id, isActive: !slide.isActive })} title={slide.isActive ? "Deactivate" : "Activate"} className={`p-1.5 ${slide.isActive ? "text-green-600" : "text-gray-300"} hover:text-black transition-colors`}>
                                            {slide.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </button>
                                        <button onClick={() => startEditSlide(slide)} className="p-1.5 text-gray-400 hover:text-black transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => deleteSlide.mutate({ id: slide.id })} className="p-1.5 text-gray-300 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ Announcement Bar Section ═══════════════════════════════ */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <Megaphone className="w-5 h-5" />
                    <h2 className="text-sm font-black uppercase tracking-[0.3em]">Announcement Bar</h2>
                </div>

                {/* New announcement form */}
                <div className="border border-black p-6 mb-4 bg-gray-50">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-4">New Announcement</p>
                    <div className="flex flex-col gap-3">
                        <input
                            placeholder="e.g. FREE SHIPPING ON ORDERS OVER ₹999 · NEW DROP LIVE NOW"
                            value={annText}
                            onChange={e => setAnnText(e.target.value)}
                            className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
                        />
                        <input
                            placeholder="Link (optional) — e.g. /products"
                            value={annLink}
                            onChange={e => setAnnLink(e.target.value)}
                            className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
                        />
                        <div>
                            <Button
                                onClick={() => createAnnouncement.mutate({ text: annText, link: annLink || undefined, isActive: true })}
                                disabled={!annText || createAnnouncement.isPending}
                                className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase tracking-widest rounded-none px-8 h-10"
                            >
                                {createAnnouncement.isPending ? "Publishing..." : "Publish Announcement"}
                            </Button>
                            <p className="text-[9px] text-gray-400 mt-2 uppercase tracking-widest">Publishing will deactivate any currently active announcement.</p>
                        </div>
                    </div>
                </div>

                {/* Announcements list */}
                {announcements.length === 0 && (
                    <div className="border border-dashed border-gray-200 p-8 text-center">
                        <p className="text-gray-400 text-xs uppercase tracking-widest">No announcements. Use the form above to add one.</p>
                    </div>
                )}

                <div className="space-y-2">
                    {announcements.map((ann) => (
                        <div key={ann.id} className={`border ${ann.isActive ? "border-rose-600 bg-rose-50" : "border-gray-200"} p-4 flex items-center gap-4`}>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-bold ${ann.isActive ? "text-rose-700" : "text-gray-500 line-through"}`}>{ann.text}</p>
                                {ann.link && <p className="text-[10px] text-gray-400">→ {ann.link}</p>}
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {!ann.isActive && (
                                    <button onClick={() => updateAnnouncement.mutate({ id: ann.id, isActive: true })} className="text-[9px] font-black uppercase tracking-widest border border-gray-300 px-3 py-1 hover:border-black transition-colors">
                                        Activate
                                    </button>
                                )}
                                {ann.isActive && (
                                    <button onClick={() => updateAnnouncement.mutate({ id: ann.id, isActive: false })} className="text-[9px] font-black uppercase tracking-widest border border-rose-400 text-rose-600 px-3 py-1 hover:bg-rose-100 transition-colors">
                                        Deactivate
                                    </button>
                                )}
                                <button onClick={() => deleteAnnouncement.mutate({ id: ann.id })} className="p-1.5 text-gray-300 hover:text-red-600 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
