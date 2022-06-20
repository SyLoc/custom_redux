import { useEffect, useState } from 'react'
import { useAuthContext } from "../contexts/useAuthContext"
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

type AuthRouteProps = {
    outlet: JSX.Element;
};

export default function AuthRoute({ outlet } : AuthRouteProps) {
    const { isLogin, onDispatchAuth } = useAuthContext()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser')
        
        if(!isLogin && !currentUser) {
            navigate('/login')
            return
        }

        if(!isLogin && currentUser) {
            const user = JSON.parse(currentUser)
            onDispatchAuth({ type:"LOGIN", payload: {...user, password:"", status:"active"} })
        }

        setLoading(false)

    }, [isLogin])
    
    if (loading) return (
        <div style={{textAlign:"center"}}><Spin size="large" /></div>
    )

    return outlet
}