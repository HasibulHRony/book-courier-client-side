import React, { useContext } from 'react'
import { AuthContext } from '../Providers/AuthContext'

export const useAuth = () => {
    const authInfo = useContext(AuthContext)
    return authInfo
}
