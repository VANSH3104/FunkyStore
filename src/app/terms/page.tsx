"use client"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-24 space-y-16">
            <header className="space-y-4">
                <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">TERMS OF SERVICE</h1>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">VERSION 1.0.4 // ZENZ SYSTEMS</p>
            </header>

            <div className="max-w-3xl space-y-12">
                <section className="space-y-4">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter border-b border-white/10 pb-2">01. TERMS OF USE</h2>
                    <p className="text-xs font-bold uppercase tracking-widest leading-loose text-muted-foreground">
                        By accessing the Zenz website, you agree to comply with all our terms. Any unauthorized use of our services is strictly prohibited.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter border-b border-white/10 pb-2">02. PURCHASES</h2>
                    <p className="text-xs font-bold uppercase tracking-widest leading-loose text-muted-foreground">
                        Purchases are final once payment is confirmed. Shipping follows standard regional laws.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter border-b border-white/10 pb-2">03. DATA PRIVACY</h2>
                    <p className="text-xs font-bold uppercase tracking-widest leading-loose text-muted-foreground">
                        User data is protected under our Privacy Policy. Any loss of account credentials is the responsibility of the user.
                    </p>
                </section>
            </div>
        </div>
    )
}
