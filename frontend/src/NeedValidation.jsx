import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'


const back =
    'inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-teal-800 shadow-sm ring-1 ring-slate-200/90 hover:bg-teal-50/80';

export default function NeedValidation() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await axios.put('http://localhost:3000/user/');
                if (!cancelled) setUsers(Array.isArray(res.data) ? res.data : []);
            } catch (e) {
                if (!cancelled)
                    setError(e.response?.data?.error || 'Could not load members.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="space-y-6 pt-2">
            <div>
                <NavLink to="/admin_dashboard" className={back}>
                    <span aria-hidden>←</span> Overview
                </NavLink>
                <h1 className="mt-4 text-3xl font-bold text-slate-900">Members</h1>
                <p className="mt-1 text-sm text-slate-600">
                    Accounts registered on your MediShare instance.
                </p>
            </div>

            {error && (
                <div className="rounded-2xl border border-red-200/90 bg-red-50 px-5 py-4 text-sm text-red-900">
                    {error}
                </div>
            )}

            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_14px_40px_-14px_rgba(15,23,42,0.12)] ring-1 ring-slate-100">
                {loading ? (
                    <div className="space-y-2 p-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 animate-pulse rounded-lg bg-slate-100" />
                        ))}
                    </div>
                ) : users.length === 0 ? (
                    <p className="p-12 text-center text-slate-500">No users found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                                <tr>
                                    <th className="px-5 py-3.5">Id</th>
                                    <th className="px-5 py-3.5">Name</th>
                                    <th className="px-5 py-3.5">Email</th>
                                    <th className="px-5 py-3.5">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((u) => (
                                    <tr key={u.id} className="transition hover:bg-cyan-50/40">
                                        <td className="px-5 py-3 tabular-nums text-slate-600">
                                            {u.id}
                                        </td>
                                        <td className="px-5 py-3 font-semibold text-slate-900">
                                            {u.name}
                                        </td>
                                        <td className="px-5 py-3 text-slate-700">{u.email}</td>
                                        <td className="px-5 py-3">
                                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-slate-700 ring-1 ring-slate-200/80">
                                                {u.role}
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
