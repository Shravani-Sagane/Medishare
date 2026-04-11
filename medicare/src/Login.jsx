import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from "axios";


const inputClass =
    'mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/25';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const validate = () => {
        const err = {};
        const trimmed = email.trim();
        if (!trimmed) err.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(trimmed)) err.email = 'Enter a valid email';
        if (!password) err.password = 'Password is required';
        return err;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const err = validate();
        setErrors(err);
        if (Object.keys(err).length) return;

        setLoading(true);
        try {
            console.log(email);
           const res=await axios.post("http://localhost:3000/user/login",{
            email:email,password:password},{
             headers:{"Content-Type":"application/json"}
            }
           )
            const { token, role } = res.data;
            console.log(token);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            if (role === 'admin') navigate('/admin_dashboard');
            else navigate('/user_dashboard');
        } catch (ex) {
            const msg =
                ex.response?.data?.error ||
                ex.message ||
                'Could not sign in. Try again.';
            setApiError(typeof msg === 'string' ? msg : 'Could not sign in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl pt-2 sm:pt-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_25px_60px_-15px_rgba(15,118,110,0.18)] backdrop-blur-sm">
                <div className="grid lg:grid-cols-12">
                    <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 p-10 text-white lg:col-span-5 lg:flex">
                        <div
                            className="pointer-events-none absolute -right-16 top-8 h-48 w-48 rounded-full bg-teal-400/20 blur-3xl"
                            aria-hidden
                        />
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200/90">
                                Welcome
                            </p>
                            <h2 className="mt-4 text-2xl font-bold leading-tight">
                                Your community medicine hub
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-teal-100/85">
                                List what you can give, request what you need—clearly and
                                respectfully.
                            </p>
                        </div>
                        <ul className="space-y-2 text-sm text-teal-100/80">
                            <li className="flex items-center gap-2">
                                <span className="text-teal-300">✓</span> Secure sign-in
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-teal-300">✓</span> Simple dashboard
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 sm:p-10 lg:col-span-7">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Sign in
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Enter your credentials to continue.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            {apiError && (
                                <div className="rounded-xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm text-red-800">
                                    {apiError}
                                </div>
                            )}

                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputClass}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Password
                                </label>
                                <div className="relative mt-1.5">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 pr-24 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/25"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:from-teal-700 hover:to-teal-800 disabled:opacity-60"
                            >
                                {loading ? 'Signing in…' : 'Sign in'}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-slate-600">
                            No account?{' '}
                            <NavLink
                                to="/register"
                                className="font-semibold text-teal-700 underline decoration-teal-400/40 underline-offset-2 hover:text-teal-900"
                            >
                                Create one
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
