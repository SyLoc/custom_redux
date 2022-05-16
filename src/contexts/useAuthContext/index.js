import React, { useContext, useReducer } from "react"

const initAuth = {
  userName: "",
  isLogin: false,
  isAdmin: false,
  email: "",
  status: "enable",
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {...state, count: state.count + 1};
    case 'decrement':
      return {...state, count: state.count - 1};
    case 'SET_ADMIN':
      console.log(action)
      return {...state, isAdmin: action.payload};
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