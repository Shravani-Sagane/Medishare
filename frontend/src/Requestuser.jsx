import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'


const back =
    'inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-teal-800 shadow-sm ring-1 ring-slate-200/90 hover:bg-teal-50/80';

export default function Requestuser() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const load = async () => {
        setLoading(true);
        setMessage('');
        try {
            const token=localStorage.getItem('token');
            const res=await axios.get('http://localhost:3000/user/getrequest',{
                headers:{
                Authorization: `Bearer ${token}`
               }
            }
            );
            setRows(Array.isArray(res.data) ? res.data : []);
            console.log(rows);
        } catch (err) {
            setMessage(err.response?.data?.error || 'Could not load requests.');
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

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
    return (
        <div className="space-y-6 pt-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <NavLink to="/admin_dashboard" className={back}>
                        <span aria-hidden>←</span> Overview
                    </NavLink>
                    <h1 className="mt-4 text-3xl font-bold text-slate-900">Requests</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Incoming medicine requests from the community.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={load}
                    className="shrink-0 self-start rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 hover:bg-slate-50"
                >
                    Refresh
                </button>
            </div>

            {message && (
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50/90 px-5 py-4 text-sm text-slate-800 ring-1 ring-slate-100">
                    {message}
                </div>
            )}
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.1)] ring-1 ring-slate-100">
                {loading ? (
                    <TableSkeleton />
                ) : rows.length === 0 ? (
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
                                    <th className="px-5 py-4">Address</th>
                                    
                                    <th className="px-5 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {rows.map((row) => {
                                    const id = row.request_id ?? row.id;
                                    return (
                                        <tr
                                            key={id ?? row.name}
                                            className="bg-white transition hover:bg-teal-50/40"
                                        >
                                            <td className="px-5 py-4 font-semibold text-slate-900">
                                                {row.name}
                                            </td>
                                            <td className="px-5 py-4 text-slate-700">{row.quantity}</td>
                                            
                                            <td className="px-5 py-4 tabular-nums text-slate-600">
                                                {row.adddress}
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    type="button"
                                                   
                                                    onClick={() =>{<div>Assiged the volunteer</div>}}
                                                    className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-50"
                                                >
                                                    assign volunteer
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

