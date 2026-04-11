import { Navigate } from 'react-router-dom';


export default function Protectedroute({ children, role }) {
    const token = localStorage.getItem('token');
  
    const userRole = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    if (role && userRole !== role) {
        const fallback =
            userRole === 'admin' ? '/admin_dashboard' : '/user_dashboard';
        return <Navigate to={fallback} replace />;
    }
    return children;
}
