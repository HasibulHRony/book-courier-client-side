
import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import { useRole } from '../Hooks/useRole';
import { Loading } from '../Pages/Loading/Loading';
import { ForbiddenPage } from '../Components/Forbidden/ForbiddenPage';


export const AdminRoute = ({ children }) => {
    const { loading } = useAuth()
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <ForbiddenPage></ForbiddenPage>
    }

    return children;
};

