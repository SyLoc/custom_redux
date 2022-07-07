import React, { useEffect } from "react";
import { useAuthContext } from '../../contexts/useAuthContext'
import { useChatContext } from '../../contexts/useChatContext'
import { getNote, getNotes } from "../../actionsWithFirestore/index"
import MessageView from './components/messageView'
import FriendsList from "./components/friendsList";
import { Routes, Route} from "react-router-dom"
import AuthRoute from "../../hocs/authRoute"
import MessageStatusBar from "./components/messageStatusBar"
import { Button } from "antd";


const Main: React.FC<any> = () => {
    const { onDispatchAuth, currentUser } = useAuthContext();
    const { onDispatchChat, currentFriend, friendId } = useChatContext();

    useEffect(() => {
        getNote('users', currentUser.id).then((data) => {
            return data?.friendsList
        }).then((frList) => {
            onDispatchChat({type:"UPDATE_ROOMS-LIST", payload: frList})
            const frs = frList.map((fr:any) => fr.id)
            getNotes('users').then((users) => {
                const friends = users.filter((user) => frs.includes(user.id))
                return friends
            }).then((data) => {
                onDispatchChat({type:"UPDATE_FRIENDS-LIST", payload: data})
            })
        })
    }, [currentUser.id, onDispatchChat])

    // const handleAdd = () => {
    // //     // createNote('users', {
    // //     //     admin: false,
    // //     //     age: 32,
    // //     //     avatar: "https://i.pravatar.cc/210",
    // //     //     email: "rose@gmail.com",
    // //     //     name: "rose",
    // //     //     password: "rose321",
    // //     //     messages:[],
    // //     //     status: "inactive"
    // //     // })

    //     updateNode("users", "slLdZ3cCqcoXQFX1DnYc", {
    //         friendsList: [
    //             {
    //                 id:"rTQRP1ANTgF8x7iQrrjj",
    //                 roomId:"KjziQPq6fuoc3YI5BvVM"
    //             },
    //             {
    //                 id:"kmxuGVzZ7GRwy1TDo1kp",
    //                 roomId:"UIszHg4gLlLQNohBfGcn"
    //             }
    //         ]
    //     })
    // }


    return (
        <div className="main">
            {/* <button type="button" onClick={handleAdd}>click me</button> */}
            <div className="justify-center">
                <Button type="primary" onClick={() => onDispatchAuth({ type: "LOGOUT" })}>Logout</Button>
            </div>
            <div className="box-message">
                <MessageStatusBar userInfo={friendId ? currentFriend : currentUser} />
                {
                    <Routes>
                        <Route path='/' element={<AuthRoute outlet={<FriendsList/>} />} />

                        <Route path='/friend_id=:id' element={<AuthRoute outlet={<MessageView/>} />} />

                        {/* <Route path="/" element={<Redirect to="friends" />} /> */}
                    </Routes>
                }
            </div>
        </div>
    )
}

export default Main;