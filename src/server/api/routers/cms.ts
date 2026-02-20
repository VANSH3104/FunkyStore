import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"

export const cmsRouter = createTRPCRouter({
    getActiveSlides: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.heroSlide.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
        })
    }),

    getActiveAnnouncement: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.announcement.findFirst({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
        })
    }),
})
