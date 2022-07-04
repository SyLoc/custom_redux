import React, { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/useAuthContext'
import { findUserByEmail, updateNode } from "../../actionsWithFirestore"
import { userProps } from "../../contexts/useAuthContext/authInterfaces"


const Login: React.FC<any> = () => {
    const navigate = useNavigate()
    const [isShowPass, setIsShowPass] = useState(false)
    const notifcation = () => alert("Wrong email or password!")
    const { onDispatchAuth } = useAuthContext();

    const RefEmail = useRef<HTMLInputElement>(null) 
    const RefPass = useRef<HTMLInputElement>(null) 


    const handleSubmit = (e: any) => {
        e.preventDefault()

        const email = RefEmail.current!.value;
        const password = RefPass.current!.value;

        if(email && password) {
            findUserByEmail(email).then((user: userProps | null) => {
                if(user) {
                    if(user.password === password) {
                        const payload = {...user, password:"", status:"active"}
                        updateNode("users", user.id, {status: "active"})
                        onDispatchAuth({type:"LOGIN", payload: payload})
                        localStorage.setItem("currentUser", JSON.stringify(payload))
                        navigate('/chat');
    
                        RefEmail.current!.value = ""
                        RefPass.current!.value = ""
                    }
                    else{
                        notifcation()
                    }
                }else{
                    notifcation()
                }
            })
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
                        ref={RefEmail}
                        name="email" 
                        required />
                </div>
                <div className="secondary-field">
                    <label htmlFor="password-field">Password</label>
                    <input 
                        className="input-field"
                        type={`${isShowPass ? "text" : "password"}`} 
                        id="password-field"
                        name="password" 
                        ref={RefPass}
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