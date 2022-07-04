import React, { useEffect } from "react";
import { Avatar } from 'antd';
import { Link } from 'react-router-dom'
import { useChatContext } from '../../../../contexts/useChatContext'
import { Spin } from "antd"



const FriendsList:React.FC<any> = () => {
    const { onDispatchChat, friendsList } = useChatContext()

    useEffect(() => {
        onDispatchChat({type:"RESET_FRIEND-ID"})
    }, [onDispatchChat])

    return (
        <div className="friends-list-box web-view-scrollbar">
        <div className="friends-list">
            <div className="first-bar">
                <h3>Your friends list </h3>
            </div>
            {
                friendsList.length > 0 ? 
                friendsList.map((fr:any) => (
                    <Link key={fr.id} className="friends-list-item" to={`friend_id=${fr.id}`}>
                        <Avatar className="friend-item-image" style={{ width: "35px", height: "35px" }} src={fr.avatar} >
                        </Avatar>
                        <div className={`badge-1 ${fr.status === 'active' && 'badge-1--active'}`}/>
                        <div className="friend-item-info">
                            <h4>{fr.name}</h4>
                            <p>...| see you later</p>
                        </div>
                    </Link>
                ))
                :  (
                    <div className="loading">
                        <Spin size="large" />
                    </div>
                )
            }

        </div>
    </div>
    )
}

export default FriendsList;