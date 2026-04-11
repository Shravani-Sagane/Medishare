import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col w-full">
            <Navbar />
            <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
