import React, { useEffect, useState } from "react";
import { Avatar } from 'antd';
import { useAuthContext } from '../../contexts/useAuthContext'
import { getNote, updateNode, createNote, getNotes } from "../../actionsWithFirestore/index"
import MessageView from './components/messageView'
import FriendsList from "./components/friendsList";


const Main: React.FC<any> = () => {
    const { onDispatchAuth, currentUser } = useAuthContext();
    const [messList, setMessList] = useState<any>([])
    const [resMsList, setResMsList] = useState<any>([])
    const [friendsList, setFriendsList] = useState<any>([])



    const getFriendsList = () => {
        getNote('users', currentUser.id).then((data) => {
            setMessList(data?.messages)
            return data?.friendsList
        }).then((frList) => {
            getNotes('users').then((users) => {
                const friends = users.filter((user) => frList.includes(user.id))
                return friends
            }).then((data) => {
                setFriendsList(data);
            })
        })

        
        // .then((msList) => {
        //     getNotes('messages').then((data) => {
        //         const friends = data.filter((mess) => msList.includes(mess?.id))
        //         return friends
        //     }).then((friends: any[]) => {
        //         let arr:any[] = []
        //         friends.map((fr) => {
        //             const abc = fr?.usersID.filter((id:string) => id !== currentUser.id)
        //             arr.push(...abc)
        //         })
        //         return arr
        //     }).then((data) => console.log(data))
        // })
    }

    useEffect(() => {
        getFriendsList()
    }, [])

    const handleAdd = () => {
        // createNote('users', {
        //     admin: false,
        //     age: 32,
        //     avatar: "https://i.pravatar.cc/210",
        //     email: "rose@gmail.com",
        //     name: "rose",
        //     password: "rose321",
        //     listMessage: [],
        //     messages:[],
        //     status: "inactive"
        // })
    }


    return (
        <div className="main">
            <button type="button" onClick={handleAdd}>click me</button>
            <button type="button" onClick={() => onDispatchAuth({ type: "LOGOUT" })}>logout</button>
            <div className="box-message">
                <div className="box-message-status">
                    <div className="chat-user">
                        <div className={`badge ${currentUser.status === "active" ? "badge--active" : ""}`} />
                        <Avatar className="user-image" style={{ width: "40px", height: "40px" }} src={currentUser.avatar} >
                        </Avatar>
                        <div className="user-name">
                            {currentUser.name}
                        </div>
                    </div>
                    <div>
                        {/* <BiMinus />
                    <IoMdClose /> */}
                    </div>
                </div>
                    <FriendsList friendsList={friendsList}/>
                {/* <MessageView messList={messList} getMessages={getMessages}/> */}
            </div>
        </div>
    )
}

export default Main;