import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin_dashboard from './Admin_dashboard';
import Request from './Request';
import SeachMedicine from './SeachMedicine';
import NeedValidation from './NeedValidation';
import Requestuser from './Requestuser';
import Expiring_soon from './Expiring_soon';
import Expired_Medicine from './Expired_Medicine';
import User_dashboard from './User_dashboard';
import Login from './Login';
import Register from './Register';
import Layout from './Layout';
import Protectedroute from './Protectedroute';
import ThankYou from './thankyou';

function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (showSplash) {
        return (
            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-cyan-950 px-6 text-center text-white">
                <div
                    className="app-splash-orb pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-teal-400/25 blur-3xl"
                    aria-hidden
                />
                <div
                    className="app-splash-orb pointer-events-none absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl [animation-delay:1s]"
                    aria-hidden
                />
                <div className="relative z-10 max-w-lg">
                    <p className="app-splash-title text-xs font-semibold uppercase tracking-[0.28em] text-teal-300/95 sm:text-sm">
                        Community care
                    </p>
                    <div className="app-splash-title mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg shadow-teal-900/40 backdrop-blur-sm">
                        <span className="text-2xl" aria-hidden>
                            ⚕
                        </span>
                    </div>
                    <h1 className="app-splash-title mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        MediShare
                    </h1>
                    <p className="app-splash-sub mt-5 max-w-md text-pretty text-sm leading-relaxed text-teal-100/88 sm:text-base">
                        Give medicine you no longer need, or discover what others are
                        sharing—clear, calm, and built for trust.
                    </p>
                    <div className="app-splash-sub mx-auto mt-10 flex justify-center gap-1.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300/80 [animation-delay:0ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300/80 [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300/80 [animation-delay:300ms]" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route
                        path="user_dashboard"
                        element={
                            <Protectedroute role="user">
                                <User_dashboard />
                            </Protectedroute>
                        }
                    />
                    <Route
                        path="search"
                        element={
                            <Protectedroute role="user">
                                <SeachMedicine />
                            </Protectedroute>
                        }
                    />
                    <Route
                        path="donate"
                        element={
                            <Protectedroute role="user">
                                <Request />
                            </Protectedroute>
                        }
                    />
                    <Route
                        path="thank_you"
                        element={
                            <Protectedroute role="user">
                                <ThankYou />
                            </Protectedroute>
                        }
                    />

                    <Route
                        path="admin_dashboard"
                        element={
                            <Protectedroute role="admin">
                                <Admin_dashboard />
                            </Protectedroute>
                        }
                    />
                    <Route
                        path="admin/requests"
                        element={
                            <Protectedroute role="admin">
                                <Requestuser />
                            </Protectedroute>
                        }
                    />
                    <Route
                        path="admin/users"
                        element={
                            <Protectedroute role="admin">
                                <NeedValidation />
                            </Protectedroute>
                        }
                    />
                    <Route
                        path="admin/expiring"
                        element={
                            <Protectedroute role="admin">
                                <Expiring_soon />
                            </Protectedroute>
                        }
                    />
                    <Route
                        path="admin/expired"
                        element={
                            <Protectedroute role="admin">
                                <Expired_Medicine />
                            </Protectedroute>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
