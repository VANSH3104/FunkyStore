"use client"

import { usePathname } from "next/navigation"
import { api } from "@/trpc/react"

/**
 * Renders an invisible spacer that pushes page content below the fixed
 * announcement bar + navbar. NOT rendered on the homepage because the
 * HeroSlideshow intentionally fills the full viewport behind those bars.
 */
export function NavSpacer() {
    const pathname = usePathname()
    // Homepage hero handles its own full-bleed layout
    if (pathname === "/") return null

    const { data: announcement } = api.cms.getActiveAnnouncement.useQuery()
    // 80px navbar (h-20) + 36px announcement bar if active
    const height = 80 + (announcement ? 36 : 0)

    return <div style={{ height }} aria-hidden="true" />
}
