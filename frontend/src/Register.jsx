import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

const field =
    'mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/25';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        Name: '',
        email: '',
        password: '',
        role: 'user',
        confirm: '',
    });
    const [showPw, setShowPw] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const validate = () => {
        const e = {};
        if (!form.Name.trim()) e.Name = 'Name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.password) e.password = 'Password is required';
        else if (form.password.length < 8) e.password = 'At least 8 characters';
        if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
        if (!form.role) e.role = 'Choose a role';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        const error = validate();
        setErrors(error);
        if (Object.keys(error).length) return;

        setLoading(true);
        try {
            const res = await axios.post(
           
            "http://localhost:3000/user/register",
            { name:form.Name,email:form.email,password:form.password,role:form.role},
            { headers: { "Content-Type": "application/json" } }
             );
          
       
           navigate('/login', { replace: true });
        } catch (ex) {
            const msg =
                ex.response?.data?.error ||
                ex.message ||
                'Registration failed.';
            setApiError(typeof msg === 'string' ? msg : 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl pt-2 sm:pt-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_25px_60px_-15px_rgba(15,118,110,0.18)] backdrop-blur-sm">
                <div className="grid lg:grid-cols-12">
                    <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900 p-10 text-white lg:col-span-5 lg:flex">
                        <div
                            className="pointer-events-none absolute -left-12 bottom-0 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl"
                            aria-hidden
                        />
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">
                                Join
                            </p>
                            <h2 className="mt-4 text-2xl font-bold leading-tight">
                                Create your MediShare profile
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-cyan-100/85">
                                One account to donate, browse inventory, and stay in sync with
                                admins.
                            </p>
                        </div>
                        <p className="text-sm text-cyan-100/70">
                            Tip: use a unique password you do not reuse elsewhere.
                        </p>
                    </div>

                    <div className="p-8 sm:p-10 lg:col-span-7">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Register
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Takes about a minute. Fields marked by validation if empty.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 max-h-[70vh] space-y-4 overflow-y-auto pr-1 sm:max-h-none">
                            {apiError && (
                                <div className="rounded-xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm text-red-800">
                                    {apiError}
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    className={field}
                                    placeholder="Your name"
                                    value={form.Name}
                                    onChange={set('Name')}
                                />
                                {errors.Name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.Name}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className={field}
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={set('email')}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <div className="relative mt-1.5">
                                    <input
                                        type={showPw ? 'text' : 'password'}
                                        className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 pr-20 text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/25"
                                        placeholder="8+ characters"
                                        value={form.password}
                                        onChange={set('password')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPw((v) => !v)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50"
                                    >
                                        {showPw ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    className={field}
                                    value={form.confirm}
                                    onChange={set('confirm')}
                                />
                                {errors.confirm && (
                                    <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Account type
                                </label>
                                <select
                                    value={form.role}
                                    onChange={set('role')}
                                    className={field}
                                >
                                    <option value="user">Community member</option>
                                    <option value="admin">Administrator</option>
                                </select>
                                {errors.role && (
                                    <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:from-teal-700 hover:to-cyan-700 disabled:opacity-60"
                               
                            >
                                {loading ? 'Creating account…' : 'Create account'}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-600">
                            Already registered?{' '}
                            <NavLink
                                to="/login"
                                className="font-semibold text-teal-700 underline decoration-teal-400/40 underline-offset-2 hover:text-teal-900"
                            >
                                Sign in
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
