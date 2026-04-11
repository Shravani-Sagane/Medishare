import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

const cards = [
    {
        title: 'Find medicine',
        description:
            'Search live listings, check quantity and expiry, and send a request in one tap.',
        to: '/search',
        emoji: '🔎',
        gradient: 'from-cyan-500/15 to-teal-600/10',
        ring: 'ring-cyan-500/20',
    },
    {
        title: 'Donate surplus',
        description:
            'Add unneeded stock so neighbors can use it. We keep the form short on purpose.',
        to: '/donate',
        emoji: '💊',
        gradient: 'from-emerald-500/15 to-teal-600/10',
        ring: 'ring-emerald-500/20',
    },
];

export default function User_dashboard() {
   
    return (
        <div className="space-y-10 pt-2">
            <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-[0_20px_50px_-12px_rgba(15,118,110,0.12)] sm:p-10">
                <div
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl"
                    aria-hidden
                />
                <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">
                    Your space
                </p>
                <h1 className="relative mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Give and receive with{' '}
                    <span className="bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent">
                        MediShare
                    </span>
                </h1>
                <p className="relative mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                    Whether you are clearing your cabinet or looking for something specific,
                    everything lives here—clear labels, readable tables, and a layout that stays
                    out of your way.
                </p>
            </section>

            <section className="grid gap-5 sm:grid-cols-2">
                {cards.map((c) => (
                    <NavLink
                        key={c.to}
                        to={c.to}
                        className={`group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-7 shadow-md ring-1 ring-slate-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/10 ${c.ring}`}
                    >
                        <div
                            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-80 transition group-hover:opacity-100`}
                            aria-hidden
                        />
                        <div className="relative flex items-start gap-4">
                            <span
                                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-md ring-1 ring-slate-100"
                                aria-hidden
                            >
                                {c.emoji}
                            </span>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">{c.title}</h2>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {c.description}
                                </p>
                                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                                    Continue
                                    <span className="transition group-hover:translate-x-1">→</span>
                                </span>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </section>
        </div>
    );
}
