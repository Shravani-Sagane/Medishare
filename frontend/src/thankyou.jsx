import { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function ThankYou() {
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => navigate('/user_dashboard', { replace: true }), 2600);
        return () => clearTimeout(t);
    }, [navigate]);

    return (
        <div className="mx-auto max-w-lg pt-6">
            <div className="relative overflow-hidden rounded-3xl border border-teal-100 bg-white px-8 py-14 text-center shadow-[0_28px_60px_-20px_rgba(15,118,110,0.25)] ring-1 ring-teal-50">
                <div
                    className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-teal-200/30 blur-3xl"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-cyan-200/25 blur-3xl"
                    aria-hidden
                />

                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-3xl text-white shadow-lg shadow-teal-600/35">
                    ✓
                </div>
                <h1 className="relative mt-8 text-2xl font-bold text-slate-900">Thank you</h1>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-600">
                    Your donation was saved. You will return to your dashboard automatically.
                </p>
                <div className="relative mt-8 h-1.5 w-full max-w-[220px] mx-auto overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-teal-500 to-cyan-400" />
                </div>
                <NavLink
                    to="/user_dashboard"
                    className="relative mt-8 inline-flex text-sm font-bold text-teal-700 underline decoration-teal-300 decoration-2 underline-offset-4 hover:text-teal-900"
                >
                    Go to dashboard now
                </NavLink>
            </div>
        </div>
    );
}
