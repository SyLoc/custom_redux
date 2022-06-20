import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./features/main";
import Login from "./features/login";
import AuthProvider from "./contexts/useAuthContext"
import Movies from "./features/movies"
import TestTS from "./features/textTS"
import AuthRoute from "./hocs/authRoute"
import MessageView from "./features/main/components/messageView";


function App() {

  return (
    <div className='container'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/products' element={<Movies/>} />
            <Route path='/about' element={<Movies/>} />
            <Route path='/location' element={<Movies/>} />
            <Route path='/cart' element={<Movies/>} />
            <Route path='/chat' element={<AuthRoute outlet={<Main/>} />} />
            {/* <Route path="/:city/partner_cashback/:id" component={PartnerCashback} /> */}
            <Route path='/chatting/:id' element={<AuthRoute outlet={<MessageView/>} />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<div>this is error component</div>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
