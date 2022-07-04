import React, { useEffect, useState } from "react";
import { Spin } from 'antd';
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/useAuthContext";

const AuthRoute: React.FC<any> = () => {
    const [loading, setLoading] = useState(true)
    const { isLogin, onDispatchAuth } = useAuthContext()

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser")
        
        if( !isLogin && currentUser) {
            onDispatchAuth({type:"SET_LOGIN"})
        }

        setLoading(false)
    }, [isLogin])

    if(loading) return <div style={{display:"flex", justifyContent:"center", paddingTop:"100px"}}><Spin size="large" /></div>

    // return isLogin ? <Outlet /> : <Navigate to="/login" />
    return <Outlet />

}

export default AuthRoute; 