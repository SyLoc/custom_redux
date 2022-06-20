import React from "react";
import { Avatar } from 'antd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const FriendsList:React.FC<any> = (props) => {
    const { friendsList } = props

    console.log("friendsList", friendsList);

    return (
        <div className="friends-list-box web-view-scrollbar">
        <div className="friends-list">
            <div className="first-bar">
                <h3>Your friends list </h3>
            </div>

            {
                friendsList.map((fr:any) => (
                    <Link key={fr.id} className="friends-list-item" to={`/chatting/${fr.id}`}>
                        <Avatar className="friend-item-image" style={{ width: "35px", height: "35px" }} src={fr.avatar} >
                        </Avatar>
                        <div className="friend-item-info">
                            <h4>{fr.name}</h4>
                            <p>...| see you later</p>
                        </div>
                    </Link>
                ))
            }

        </div>
    </div>
    )
}

FriendsList.propTypes = {
    friendsList: PropTypes.array.isRequired
}

export default FriendsList;