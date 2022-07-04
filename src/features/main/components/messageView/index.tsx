import React, { useEffect, useState, useRef } from "react";
import { MdInsertEmoticon, MdCameraAlt } from 'react-icons/md'
import { GrSend, GrLocation } from 'react-icons/gr'
import { Avatar } from 'antd';
import Picker from 'emoji-picker-react';
import { useAuthContext } from '../../../../contexts/useAuthContext'
import { updateNode } from "../../../../actionsWithFirestore/index"
import moment from "moment"
import { useParams } from 'react-router-dom'
import { useChatContext } from "../../../../contexts/useChatContext"
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../../firestore"

const MessageView: React.FC<any> = () => {
    const [mess, setMess] = useState<string>('');
    const refBoxMess = useRef<any>(null)
    const [showEmoji, setShowEmoji] = useState(false)
    const refOutside = useRef<any>(null)
    const { currentUser } = useAuthContext();
    const { onDispatchChat, roomList, currentFriend, friendsList } = useChatContext();
    const { id } = useParams();
    const [messList, setMessList] = useState<object[]>([])
    const [roomId, setRoomId] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const idFromPathName = window.location.pathname.split('friend_id=')[1]
        const UserId = id || idFromPathName

        onDispatchChat({type:"UPDATE_FRIEND-ID", payload: UserId})

        roomList.find((item: any) => {
            if(item.id === UserId) {
                setRoomId(item.roomId);
                onSnapshot(doc(db, "messages", item.roomId), (doc) => {
                    setMessList(doc.data()?.contents)
                });
            }
        })

    }, [friendsList, onDispatchChat])

    const handleSendMessage = (e: any) => {
        e.preventDefault()

        if (mess) {
            const newMess = {
                id: new Date().getTime(),
                text: mess,
                userId: currentUser.id,
                dateSend: moment().format('LLL'),
                dateUpdate: null,
            }
            const data = [...messList, newMess ]
            updateNode("messages", roomId, { contents: data })
            setMess('')
            inputRef.current?.focus()
        }

    }

    useEffect(() => {
        if (refBoxMess) {
            refBoxMess.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        }
    }, [messList])

    const onEmojiClick = (event: any, emojiObject: any) => {
        setMess(mess + emojiObject.emoji)
    };

    useEffect(() => {
        if (showEmoji) {
            document.addEventListener('click', handleOutside)
        }

        return () => document.removeEventListener('click', handleOutside)
    }, [showEmoji])

    const handleOutside = (event: any) => {
        const { target } = event
        if (!refOutside.current.contains(target)) {
            setShowEmoji(false)
        }
    }

    return (
        <div>
            <div className="box-message-view web-view-scrollbar">
                {
                    messList.length > 0 && messList.map((mess: any, index: number) => {
                        let isCurrentUser = mess.userId === currentUser.id ? true : false
                        return (
                            <div key={mess.id} className={`message-item ${isCurrentUser && "message-item--sender"}`}>
                            <div className="message-item-avatar">
                                <Avatar style={{ width: "100%", height: "100%" }} src={isCurrentUser ?currentUser?.avatar : currentFriend?.avatar} />
                            </div>
                            <div className="message-item-text">
                                {mess.text}
                            </div>
                        </div>
                        )
                    })
                }
                <div ref={refBoxMess} />
            </div>
            <div className="box-message-input">
                <div className="input-bonus" ref={refOutside}>
                    <MdCameraAlt />
                    <MdInsertEmoticon onClick={() => setShowEmoji(true)} />
                    <GrLocation />
                    {
                        showEmoji && (
                            <div className="emoji-box">
                                <Picker onEmojiClick={onEmojiClick} pickerStyle={{ MaxWidth: '80%' }} />
                            </div>
                        )
                    }
                </div>
                <form className="input-bar" onSubmit={handleSendMessage}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type your message"
                        value={mess}
                        className="input-field"
                        onChange={(e: any) => setMess(e.target.value)}
                    />
                    <button type="submit" className="btn-send"><GrSend /></button>
                </form>
            </div>
        </div>
    )
}

export default MessageView;