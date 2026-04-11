import { useEffect, useState } from 'react';
import axios from "axios"

function formatDate(d) {
    if (!d) return '—';
    const s = typeof d === 'string' ? d.slice(0, 10) : String(d);
    return s;
}

function StatusPill({ children }) {
    return (
        <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200/60">
            {children}
        </span>
    );
}

function TableSkeleton() {
    return (
        <div className="space-y-3 p-10">
            <div className="h-4 w-40 animate-pulse rounded-full bg-slate-200" />
            <div className="space-y-2 pt-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="h-10 animate-pulse rounded-lg bg-slate-100"
                        style={{ animationDelay: `${i * 80}ms` }}
                    />
                ))}
            </div>
        </div>
    );
}

export default function SeachMedicine() {
    const [medicine, setMedicine] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState(null);
    const [toast, setToast] = useState('');

    const loadAll = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3000/user/getmedicine'
            );
            setData(Array.isArray(res.data) ? res.data : []);
        } catch {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAll();
    }, []);

    const onSearch = async (e) => {
        e.preventDefault();
        setToast('');
        setLoading(true);
        try {
            const q = medicine.trim();
            const res = await axios.get('http://localhost:3000/user/search', {
                params: q ? { medicine: q } : {},
            });
            setData(Array.isArray(res.data) ? res.data : []);
        } catch {
            setData([]);
        } finally {
            setLoading(false);
        }
    };
 
    const requestItem = async (row) => {
        {
           <div>
                <label className="text-sm font-medium text-slate-700">Quantity</label>
                    <input
                        type="number"
                        required
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className={input}
                        placeholder="number of unit "
                        />
                    
                     <input
                        type="number"
                        required
                       
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        className={input}
                        placeholder="Enter your address "
                        />
            </div>
        }
        const id = row.medicine_id ?? row.id;
        if (id == null) {
            setToast('This listing is missing an id — check your database schema.');
            return;
        }
        setBusyId(id);
        setToast('');
        try {
            await axios.post('/requests', { medicine_id: id });
            setToast('Request sent. The admin team will follow up.');
        } catch (err) {
            setToast(
                err.response?.data?.error ||
                    'Could not submit request. Are you signed in?'
            );
        } finally {
            setBusyId(null);
        }
    };

    return (
        <div className="space-y-8 pt-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-900 ring-1 ring-teal-200/70">
                        Live inventory
                    </span>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                        Find medicine
                    </h1>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                        Search by name or leave the field empty to load everything currently
                        listed as available.
                    </p>
                </div>
            </div>

            <form
                onSubmit={onSearch}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-md ring-1 ring-slate-100 sm:flex-row sm:items-end"
            >
                <div className="min-w-0 flex-1">
                    <label className="text-sm font-medium text-slate-700">
                        Name contains
                    </label>
                    <input
                        type="text"
                        value={medicine}
                        onChange={(e) => setMedicine(e.target.value)}
                        placeholder="Leave empty to show all"
                        className="mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/25"
                    />
                </div>
                <button
                    type="submit"
                    className="shrink-0 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 hover:from-teal-700 hover:to-teal-800"
                >
                    Search
                </button>
            </form>

            {toast && (
                <div className="rounded-2xl border border-teal-200/80 bg-teal-50/90 px-5 py-4 text-sm text-teal-900 shadow-sm ring-1 ring-teal-100/80">
                    {toast}
                </div>
            )}

            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.1)] ring-1 ring-slate-100">
                {loading ? (
                    <TableSkeleton />
                ) : data.length === 0 ? (
                    <div className="px-8 py-16 text-center">
                        <p className="text-lg font-medium text-slate-700">No listings found</p>
                        <p className="mt-2 text-sm text-slate-500">
                            Try another name or check back after new donations arrive.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="sticky top-0 z-10 bg-slate-50/95 text-xs font-bold uppercase tracking-wider text-slate-500 backdrop-blur-sm">
                                <tr>
                                    <th className="px-5 py-4">Name</th>
                                    <th className="px-5 py-4">Qty</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4">Expiry</th>
                                    <th className="px-5 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((row) => {
                                    const id = row.medicine_id ?? row.id;
                                    return (
                                        <tr
                                            key={id ?? row.name}
                                            className="bg-white transition hover:bg-teal-50/40"
                                        >
                                            <td className="px-5 py-4 font-semibold text-slate-900">
                                                {row.name}
                                            </td>
                                            <td className="px-5 py-4 text-slate-700">{row.quantity}</td>
                                            <td className="px-5 py-4 text-slate-700">
                                                <StatusPill>{row.status || '—'}</StatusPill>
                                            </td>
                                            <td className="px-5 py-4 tabular-nums text-slate-600">
                                                {formatDate(row.expiry_date)}
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    type="button"
                                                    disabled={busyId === id}
                                                    onClick={() => requestItem(row)}
                                                    className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-50"
                                                >
                                                    {busyId === id ? '…' : 'Request'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
