import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/useAuthContext'

const users = [
    {
        id: "user001",
        name: "john",
        email: "john@gmail.com",
        avatar: "https://i.pravatar.cc/210",
        password: "john123"
    },
    {
        id: "user002",
        name: "lisa",
        email: "lisa@gmail.com",
        avatar: "https://i.pravatar.cc/210",
        password: "lisa123"
    }
]

const Login: React.FC<any> = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPass, setIsShowPass] = useState(false)
    const notifcation = () => alert("Wrong email or password!")
    const { count, onDispatchAuth } = useAuthContext();

    console.log("login count", count)


    const handleSubmit = (e: any) => {
        e.preventDefault()

        if(email && password) {
            const user = users.find((item) => item.email === email)
            if(user) {
                if(user.password === password) {
                    onDispatchAuth({type:"SET_ADMIN", payload:true})
                    navigate('/chat');
                }
                else{
                    notifcation()
                }
            }else{
                notifcation()
            }
        }
    }

    const handleShowPass = () => {
        setIsShowPass(!isShowPass)
    }

    return (
        <div className="login">
            <h2 className="login-title">login</h2>

            <form action="" className="login-form" onSubmit={handleSubmit}>
                <div className="first-field">
                    <label htmlFor="email-field">Email</label>
                    <input 
                        className="input-field"
                        id="email-field"
                        type="email" 
                        value={email}
                        onChange={(event: any) => setEmail(event.target.value)}
                        name="email" 
                        required />
                </div>
                <div className="secondary-field">
                    <label htmlFor="password-field">Password</label>
                    <input 
                        className="input-field"
                        type={`${isShowPass ? "text" : "password"}`} 
                        id="password-field"
                        value={password}
                        onChange={(event: any) => setPassword(event.target.value)}
                        name="password" 
                        required />
                    {
                        isShowPass ? <AiFillEyeInvisible onClick={handleShowPass} className="secondary-field-eye"/> 
                            : <AiFillEye onClick={handleShowPass} className="secondary-field-eye"/>
                    }
                </div>
                <button className="btn-submit">login</button>
            </form>
        </div>
    )
}

export default Login;