import { NavLink, useNavigate } from 'react-router-dom';

const pill =
    'rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200';
const inactive =
    'text-teal-100/90 hover:bg-white/12 hover:text-white hover:shadow-sm';
const active = 'bg-white/18 text-white shadow-md shadow-black/10 ring-1 ring-white/20';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gradient-to-r from-teal-950/92 via-slate-900/92 to-teal-950/92 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                <NavLink
                    to={
                        token
                            ? role === 'admin'
                                ? '/admin_dashboard'
                                : '/user_dashboard'
                            : '/login'
                    }
                    className="group flex items-center gap-2.5 text-white"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 text-lg font-bold text-teal-950 shadow-lg shadow-teal-900/30 transition group-hover:scale-105">
                        M
                    </span>
                    <span className="text-lg font-bold tracking-tight">MediShare</span>
                </NavLink>

                <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
                    {!token && (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `${pill} ${isActive ? active : inactive}`
                                }
                            >
                                Sign in
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `${pill} ${isActive ? active : inactive}`
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                    {token && role === 'user' && (
                        <>
                            <NavLink
                                to="/user_dashboard"
                                end
                                className={({ isActive }) =>
                                    `${pill} ${isActive ? active : inactive}`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/search"
                                className={({ isActive }) =>
                                    `${pill} ${isActive ? active : inactive}`
                                }
                            >
                                Find
                            </NavLink>
                            <NavLink
                                to="/donate"
                                className={({ isActive }) =>
                                    `${pill} ${isActive ? active : inactive}`
                                }
                            >
                                Donate
                            </NavLink>
                        </>
                    )}

                    {token && role === 'admin' && (
                        <NavLink
                            to="/admin_dashboard"
                            className={({ isActive }) =>
                                `${pill} ${isActive ? active : inactive}`
                            }
                        >
                            Dashboard
                        </NavLink>
                    )}

                    {token && (
                        <button
                            type="button"
                            onClick={logout}
                            className={`${pill} ${inactive} border border-white/25 bg-white/5`}
                        >
                            Log out
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
