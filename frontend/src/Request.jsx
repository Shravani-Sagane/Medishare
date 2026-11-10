import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const input =
    'mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/25';

export default function Request() {
    
    const [medname, setMedname] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const sendRequest = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
             const token=localStorage.getItem('token');
            await axios.post('http://localhost:3000/user/medicine', {
              medname: medname.trim(),
                quantity: Number(quantity),
               expiry_date:expiry_date}, {
                headers:{
                
                Authorization: `Bearer ${token}`
               }
               }
            );
        
            navigate('/thank_you');
        } catch (error) {
            console.error(error);
            setMessage(
                error.response?.data?.error ||
                    'Could not add medicine. Check you are signed in as a user and DB is running.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-lg pt-2">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_22px_55px_-15px_rgba(15,118,110,0.14)]">
                <div className="border-b border-slate-100 bg-gradient-to-r from-teal-50/90 to-cyan-50/50 px-8 py-7">
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                        Contribution
                    </p>
                    <h1 className="mt-2 text-2xl font-bold text-slate-900">Donate medicine</h1>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        List only items you are legally allowed to share—unopened when possible,
                        stored correctly, and not expired.
                    </p>
                </div>
                <form onSubmit={sendRequest} className="space-y-5 px-8 py-8">
                    {message && (
                        <div className="rounded-xl border border-amber-200/90 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                            {message}
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Medicine name
                        </label>
                        <input
                            type="text"
                            required
                            value={medname}
                            onChange={(e) => setMedname(e.target.value)}
                            className={input}
                            placeholder="e.g. Paracetamol 500mg"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700">Quantity</label>
                        <input
                            type="number"
                            required
                            min={1}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className={input}
                            placeholder="Number of units"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700">Expiry date</label>
                        <input
                            type="date"
                            required
                            value={expiry_date}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className={input}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:from-teal-700 hover:to-teal-800 disabled:opacity-60"
                    >
                        {loading ? 'Submitting…' : 'List donation'}
                    </button>
                </form>
            </div>
        </div>
    );
}
