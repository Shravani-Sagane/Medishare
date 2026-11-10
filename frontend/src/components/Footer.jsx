export default function Footer() {
    return (
        <footer className="relative mt-auto border-t border-slate-200/70 bg-white/70 py-8 text-center backdrop-blur-md">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
            <p className="bg-gradient-to-r from-teal-800 to-cyan-700 bg-clip-text text-base font-semibold text-transparent">
                MediShare
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                Share surplus medicine safely. Always follow local laws and medical guidance.
            </p>
            <p className="mt-4 text-xs text-slate-400">Built for community, not for profit.</p>
        </footer>
    );
}
