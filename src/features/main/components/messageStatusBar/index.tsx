import React from "react"
import { Avatar } from 'antd';
import { TbArrowBackUp } from "react-icons/tb"
import { SiAuthy } from "react-icons/si"
// import { RiSettings3Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/useAuthContext"

const BackIcon = (props: any) => {
    const { backToPath = "" } = props
    const navigate = useNavigate()

    const handleBack = () => {
        if(document.location.pathname === backToPath) return

        backToPath ? navigate(backToPath) : navigate('/')
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
                <BackIcon backToPath="/chat"/>
                <SiAuthy/>
                {/* <RiSettings3Line style={{ width: "22px", height: "22px" }} /> */}
            </div>
        </div>
    )
}

export default MessageStatusBar;