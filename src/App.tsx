import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./features/main";
import Login from "./features/login";
import AuthProvider from "./contexts/useAuthContext"
import ChatProvider from "./contexts/useChatContext";
import Movies from "./features/movies"
import AuthRoute from "./hocs/authRoute"


function App() {

  return (
    <div className='container'>
      <AuthProvider>
        <ChatProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/movies' element={<Movies/>} />
              <Route path='/chat/*' element={<AuthRoute outlet={<Main/>} />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<div>this is error component</div>} />
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
