import { NavLink } from 'react-router-dom';

const tiles = [
    {
        to: '/admin/requests',
        title: 'Requests',
        description: 'Review and act on medicine requests from members.',
        stat: 'Queue',
        accent: 'border-l-teal-500 bg-gradient-to-r from-teal-50/80 to-white',
        icon: '📋',
    },
    {
        to: '/admin/users',
        title: 'Members',
        description: 'Who signed up and which role they use.',
        stat: 'People',
        accent: 'border-l-cyan-500 bg-gradient-to-r from-cyan-50/80 to-white',
        icon: '👥',
    },
    {
        to: '/admin/expiring',
        title: 'Expiring soon',
        description: 'Within 30 days—prioritize rotation or outreach.',
        stat: '30 days',
        accent: 'border-l-amber-500 bg-gradient-to-r from-amber-50/80 to-white',
        icon: '⏳',
    },
    {
        to: '/admin/expired',
        title: 'Expired stock',
        description: 'Past expiry—plan safe removal.',
        stat: 'Archive',
        accent: 'border-l-rose-500 bg-gradient-to-r from-rose-50/80 to-white',
        icon: '⚠️',
    },
];

export default function Admin_dashboard() {
    return (
        <div className="space-y-8 pt-2">
            <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-[0_18px_45px_-12px_rgba(15,23,42,0.12)] sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">
                    Control center
                </p>
                <h1 className="mt-3 text-3xl font-bold text-slate-900">Administration</h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                    Pick a module below. Each screen loads real data when your API and database
                    are running—same polished layout across the app.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {tiles.map((t) => (
                    <NavLink
                        key={t.to}
                        to={t.to}
                        className={`group flex gap-4 rounded-2xl border border-slate-200/90 border-l-[5px] p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-xl ${t.accent}`}
                    >
                        <span
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-slate-100"
                            aria-hidden
                        >
                            {t.icon}
                        </span>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                {t.stat}
                            </p>
                            <h2 className="mt-1 text-lg font-bold text-slate-900">{t.title}</h2>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                {t.description}
                            </p>
                            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                                Open
                                <span className="transition group-hover:translate-x-0.5">→</span>
                            </span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
