import React, { useContext, useReducer } from "react"
import { updateNode } from "../../actionsWithFirestore"

const initAuth = {
  currentUser: {
    id: "",
    admin: false,
    age: null,
    avatar: "",
    email: "",
    name: "",
    password: "",
    friendsList: [],
    status: "inactive"
  },
  isLogin: false,
  isAdmin: false,
  email: "",
  status: "enable",
  count: 0,
  cp1: "",
  cp2: "",
  cp3: "",
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {...state, currentUser: action.payload, isLogin: true};
    case 'LOGOUT':
      localStorage.removeItem("currentUser")
      updateNode("users", state.currentUser.id, {status: "inactive"})
      return {...state, currentUser: initAuth.currentUser, isLogin: false};
    case 'increment':
      return {...state, count: state.count + 1};
    case 'decrement':
      return {...state, count: state.count - 1};
    case 'SET_ADMIN':
      return {...state, isAdmin: action.payload};
    case 'update-cp1':
      return {...state, cp1: action.payload};
    case 'update-cp2':
      return {...state, cp2: action.payload};
    case 'update-cp3':
      return {...state, cp3: action.payload};
    default:
      throw new Error();
  }
}
  
export const AuthContext = React.createContext({...initAuth, onDispatchAuth: (action) => {}});
  
const AuthProvider = ({ children }) => {
    const [state, onDispatchAuth] = useReducer(reducer, initAuth);

    return (
        <AuthContext.Provider value={{
          ...state,
          onDispatchAuth
        }}>
        {
          children
        }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}


export default AuthProvider;