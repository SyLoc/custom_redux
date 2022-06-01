import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from 'react-icons/io'
import { BiMinus } from 'react-icons/bi'
import { MdInsertEmoticon, MdCameraAlt } from 'react-icons/md'
import { GrSend, GrLocation } from 'react-icons/gr'
import { Avatar } from 'antd';
import Picker from 'emoji-picker-react';
import { useAuthContext } from '../../contexts/useAuthContext'
import { useNavigate } from 'react-router-dom'

const Main: React.FC<any> = () => {
    const [mess, setMess] = useState<string>('');
    const refBoxMess = useRef<any>(null)
    const [showEmoji, setShowEmoji] = useState(false)
    const refOutside = useRef<any>(null)
    const { count, isLogin, onDispatchAuth } = useAuthContext();
    const navigate = useNavigate()


    console.log("count", count)
    console.log("isLogin", isLogin)


    const [messList, setMessList] = useState([
        {
            id: 1,
            avatar: "https://i.pravatar.cc/200",
            message: "hellooooooooo",
            isSender: false,
        },
        {
            id: 2,
            avatar: "https://i.pravatar.cc/210",
            message: "hi",
            isSender: true,
        },
    ])

    const handleSendMessage = (e: any) => {
        e.preventDefault()
        if(mess) {
            const newMess = {
                id: new Date().getTime(),
                avatar: "https://i.pravatar.cc/210",
                message: mess,
                isSender: true,
            }
            setMessList([...messList, newMess])
            setMess('')
        }

    }

    useEffect(() => {
        if(refBoxMess) {
            refBoxMess.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
        }
    }, [messList])

    const onEmojiClick = (event: any, emojiObject: any) => {
        setMess(mess + emojiObject.emoji)
    };

    useEffect(() => {
        if(showEmoji) {
            document.addEventListener('click', handleOutside)
        }

        return () => document.removeEventListener('click', handleOutside)
    },[showEmoji])

    const handleOutside = (event: any) => {
        const { target } = event
        if (!refOutside.current.contains(target)) {
            setShowEmoji(false)
        }
    }

    return (
        <div className="main">
            <button type="button" onClick={() => onDispatchAuth({type: 'increment'})}>click me</button>
            <button type="button" onClick={() => navigate("/login")}>go to login page</button>
            <div className="box-message">
                <div className="box-message-status">
                    <BiMinus />
                    <IoMdClose />
                </div>
                <div className="box-message-view" id="web-view">
                    {
                        messList.map((mess) => (
                            <div key={mess.id} className={`message-item ${mess.isSender && "message-item--sender"}`}>
                                <div className="message-item-avatar">
                                    <Avatar style={{ width:"100%", height:"100%" }} src={mess.avatar} />
                                </div>
                                <div className="message-item-text">
                                    {mess.message}
                                </div>
                            </div>
                        ))
                    }
                    <div ref={refBoxMess}/>
                    
                </div>
                <div className="box-message-input">
                    <div className="input-bonus" ref={refOutside}>
                        <MdCameraAlt />
                        <MdInsertEmoticon onClick={() => setShowEmoji(true)} />
                        <GrLocation />
                        {
                            showEmoji && (
                                <div className="emoji-box">
                                    <Picker onEmojiClick={onEmojiClick} pickerStyle={{ MaxWidth: '80%'}} />
                                </div>
                            )
                        }
                    </div>
                    <form className="input-bar" onSubmit={handleSendMessage}>
                        <input type="text" placeholder="Type your message" value={mess} className="input-field" onChange={(e: any) => setMess(e.target.value)} />
                        <button type="submit" className="btn-send"><GrSend /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Main;