import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


const back =
    'inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-teal-800 shadow-sm ring-1 ring-slate-200/90 hover:bg-teal-50/80';

export default function Expiring_soon() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
               
                setRows(Array.isArray(res.data) ? res.data : []);
            } catch (e) {
                setError(e.response?.data?.error || 'Could not load data.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="space-y-6 pt-2">
            <div>
                <NavLink to="/admin_dashboard" className={back}>
                    <span aria-hidden>←</span> Overview
                </NavLink>
                <h1 className="mt-4 text-3xl font-bold text-slate-900">Expiring soon</h1>
                <p className="mt-1 text-sm text-slate-600">
                    Available items expiring within the next 30 days—act before waste.
                </p>
            </div>

            {error && (
                <div className="rounded-2xl border border-amber-200/90 bg-amber-50 px-5 py-4 text-sm text-amber-950">
                    {error}
                </div>
            )}

            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_14px_40px_-14px_rgba(180,83,9,0.08)] ring-1 ring-amber-100/80">
                {loading ? (
                    <div className="space-y-2 p-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-10 animate-pulse rounded-lg bg-amber-50/80" />
                        ))}
                    </div>
                ) : rows.length === 0 ? (
                    <p className="p-12 text-center text-slate-500">Nothing expiring in this window.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-amber-50/90 text-xs font-bold uppercase tracking-wider text-amber-900/70">
                                <tr>
                                    <th className="px-5 py-3.5">Name</th>
                                    <th className="px-5 py-3.5">Qty</th>
                                    <th className="px-5 py-3.5">Status</th>
                                    <th className="px-5 py-3.5">Expiry</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-amber-100/80">
                                {rows.map((r) => (
                                    <tr key={r.medicine_id} className="transition hover:bg-amber-50/50">
                                        <td className="px-5 py-3 font-semibold text-slate-900">
                                            {r.name}
                                        </td>
                                        <td className="px-5 py-3 text-slate-700">{r.quantity}</td>
                                        <td className="px-5 py-3 text-slate-700">{r.status}</td>
                                        <td className="px-5 py-3">
                                            <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-bold tabular-nums text-amber-900 ring-1 ring-amber-200/70">
                                                {String(r.expiry_date).slice(0, 10)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
