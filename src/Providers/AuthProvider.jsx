import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { auth } from '../Firebase/firebase.init'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'


export const AuthProvider = ({ children }) => {
    
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUserByEmailPassWord = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginByPassword = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateProfileInfo = (profile) => {
        // setLoading(true)
       return updateProfile(auth.currentUser, profile)
    }

    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        createUserByEmailPassWord,
        loginByPassword,
        loginWithGoogle,
        updateProfileInfo,
        logOut,
        user,
        loading,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}

