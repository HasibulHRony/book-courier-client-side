
import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import { useRole } from '../Hooks/useRole';
import { Loading } from '../Pages/Loading/Loading';
import { ForbiddenPage } from '../Components/Forbidden/ForbiddenPage';


export const LibrarianRoute = ({ children }) => {
    const { loading } = useAuth()
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'librarian') {
        return <ForbiddenPage></ForbiddenPage>
    }

    return children;
};

