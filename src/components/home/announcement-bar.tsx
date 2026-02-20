"use client"

import { api } from "@/trpc/react"
import { motion } from "framer-motion"
import Link from "next/link"

export const ANNOUNCEMENT_BAR_HEIGHT = 36 // px — keep in sync with h-9

export function AnnouncementBar() {
    const { data: announcement } = api.cms.getActiveAnnouncement.useQuery()

    if (!announcement) return null

    const inner = (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-[60] h-9 bg-black overflow-hidden flex items-center"
        >
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="flex items-center whitespace-nowrap"
            >
                {[...Array(6)].map((_, i) => (
                    <span
                        key={i}
                        className="text-[9px] font-black uppercase tracking-[0.45em] text-white/90 px-10 flex-shrink-0"
                    >
                        {announcement.text}
                        <span className="opacity-40 ml-10">✦</span>
                    </span>
                ))}
            </motion.div>
        </motion.div>
    )

    if (announcement.link) {
        return <Link href={announcement.link}>{inner}</Link>
    }
    return inner
}
