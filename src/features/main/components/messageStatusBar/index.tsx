import React from "react"
import { Avatar } from 'antd';
import { TbArrowBackUp } from "react-icons/tb"
import { SiAuthy } from "react-icons/si"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/useAuthContext"

const BackIcon = (props: any) => {
    const { skipPath = "" } = props
    const navigate = useNavigate()

    const handleBack = () => {
        if(skipPath) {
            const pathName = window.location.pathname
            if(pathName === skipPath) return
        }
        
        navigate(-1)
    }

    return (
        <TbArrowBackUp onClick={handleBack} style={{width:"25px", height:"25px"}} />
    )
}

const MessageStatusBar: React.FC<any> = (props) => {
    const { currentUser } = useAuthContext();
    const { userInfo } = props

    return (
        <div className="box-message-status">
            <div className="chat-user">
                <div className={`${currentUser?.id !== userInfo?.id && 'badge'} ${userInfo?.status === "active" ? "badge--active" : ""}`} />
                <Avatar className="user-image" style={{ width: "40px", height: "40px" }} src={userInfo?.avatar} >
                </Avatar>
                <div className="user-name">
                    {userInfo?.name}
                </div>
            </div>
            <div className="redirect-icons">
                <BackIcon skipPath="/chat"/>
                <SiAuthy/>
            </div>
        </div>
    )
}

export default MessageStatusBar;