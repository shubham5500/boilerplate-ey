import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/Layout';

interface ProtectedRouteProps {
    isAuthenticated: boolean,
}

const ProtectedRoutes: FC<ProtectedRouteProps> = ({isAuthenticated}) => {

    return (isAuthenticated ? <Layout><Outlet/></Layout> : <Navigate to={'/login'}/>)
}

export default ProtectedRoutes;