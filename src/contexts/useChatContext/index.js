import React, { useContext, useReducer } from "react"


const initChat = {
  friendsList:[],
  friendId:"",
  currentFriend:{
    friendsList:[],
    avatar:""
  },
  roomChating: {},
  roomList:[]
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FRIENDS-LIST':
        return {...state, friendsList: action.payload };
    case 'UPDATE_FRIEND-ID':
        const id = action.payload;
        const currentFriend = state.friendsList.find((friend) => friend?.id === id)
        return {...state, friendId: id, currentFriend };
    case 'RESET_FRIEND-ID':
        return {...state, friendId:"", currentFriend:{} };
    case 'UPDATE_ROOMS-LIST':
        return {...state, roomList:action.payload };
    default:
      throw new Error();
  }
}
  
export const ChatContext = React.createContext({...initChat, onDispatchChat: (action) => {}});
  
const ChatProvider = ({ children }) => {
    const [state, onDispatchChat] = useReducer(reducer, initChat);

    return (
        <ChatContext.Provider value={{
          ...state,
          onDispatchChat
        }}>
        {
          children
        }
        </ChatContext.Provider>
    )
}

export const useChatContext = () => {
  return useContext(ChatContext)
}


export default ChatProvider;