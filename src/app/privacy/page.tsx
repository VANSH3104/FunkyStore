"use client"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-24 space-y-16">
            <header className="space-y-4">
                <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">PRIVACY POLICY</h1>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">PROTECTING YOUR DATA // ZENZ SYSTEMS</p>
            </header>

            <div className="max-w-3xl space-y-12">
                <section className="space-y-4">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter border-b border-white/10 pb-2">01. DATA COLLECTION</h2>
                    <p className="text-xs font-bold uppercase tracking-widest leading-loose text-muted-foreground">
                        We collect customer information required for order fulfillment and interface optimization. All data is encrypted at the source.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter border-b border-white/10 pb-2">02. DATA SECURITY</h2>
                    <p className="text-xs font-bold uppercase tracking-widest leading-loose text-muted-foreground">
                        All user data is stored on secure servers. Access is restricted to authorized personnel with valid credentials.
                    </p>
                </section>
            </div>
        </div>
    )
}
