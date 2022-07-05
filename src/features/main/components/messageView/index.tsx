import React, { useEffect, useState, useRef } from "react";
import { MdInsertEmoticon, MdCameraAlt } from 'react-icons/md'
import { GrSend, GrLocation } from 'react-icons/gr'
import { TiDeleteOutline } from 'react-icons/ti'
import { Avatar, Image } from 'antd';
import Picker from 'emoji-picker-react';
import { useAuthContext } from '../../../../contexts/useAuthContext'
import { updateNode } from "../../../../actionsWithFirestore/index"
import moment from "moment"
import { useParams } from 'react-router-dom'
import { useChatContext } from "../../../../contexts/useChatContext"
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../../firestore"
import onUploadFile, { deleteFile } from "../../../../actionsWithFirestore/uploadFiles"

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
    const fileRef = useRef<HTMLInputElement>(null)
    const [preViewImage, setPreViewImage] = useState<any[]>([])
    const [isUploading, setIsUploading] = useState(false)

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
            return 0
        })

    }, [friendsList, onDispatchChat, roomList, id])

    const handleSendMessage = (e: any) => {
        e.preventDefault()

        if (mess || preViewImage.length > 0) {

            const newMess = {
                id: new Date().getTime(),
                text: mess,
                type: preViewImage.length > 0 ? 'file' : 'text',
                imgs: preViewImage,
                userId: currentUser.id,
                dateSend: moment().format('LLL'),
                dateUpdate: null,
            }

            updateNode("messages", roomId, { contents: [...messList, newMess] })
            setMess('')
            setPreViewImage([])
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

    const handleChange = (event: any) => {

        const file = event.target.files[0]
        if(!file) return 

        onUploadFile(file, 
            (progress: number) => {
                setIsUploading(true)
            },
            (downloadURL: string) => {
                const img = {
                    name: file.name,
                    url: downloadURL
                }
                setPreViewImage([...preViewImage, img])
                setIsUploading(false)
            }
        )
    }

    const handleDeleteImage = (name: string) => {
        if(!name) return
        deleteFile(name, 
            (text: string) => {
                setPreViewImage(
                    preViewImage.filter((img) => img.name !== name)
                )
            },
            (error: any) => {
                console.log(error);
            }
        )
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
                                {
                                    mess?.type === 'file' && (
                                        mess?.imgs.map((img:any) => (
                                            <Image key={img.name} width="245px" src={img.url} />
                                        ))
                                    )
                                }
                                {mess.text}
                            </div>
                        </div>
                        )
                    })
                }
                <div ref={refBoxMess} />
            </div>
            <div className="box-message-input">
                {
                    isUploading && <span className="uploading">uploading...</span>
                }
                <div className="input-bonus" ref={refOutside}>

                    <MdCameraAlt onClick={() => {
                        if(fileRef) fileRef.current?.click()
                    }} />
                    <input style={{display:"none"}} ref={fileRef} onChange={handleChange} type="file" />
                    <MdInsertEmoticon onClick={() => setShowEmoji(true)} />
                    <GrLocation />
                    {
                        showEmoji && (
                            <div className="emoji-box">
                                <Picker onEmojiClick={onEmojiClick} pickerStyle={{ MaxWidth: '80%' }} />
                            </div>
                        )
                    }

                    <div className="preview-image">
                    {
                        preViewImage.length > 0 && (
                            preViewImage.map((img) => (
                                <span key={img?.name} className="img-wrap">
                                    <Image src={img?.url} width="60px" height="60px" alt="" />
                                    <TiDeleteOutline onClick={() => handleDeleteImage(img?.name)} className="delete-icon"/>
                                </span>
                            ))
                        )
                    }
                    </div>

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