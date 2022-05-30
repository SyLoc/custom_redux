import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./features/main";
import Login from "./features/login";
import AuthProvider from "./contexts/useAuthContext"
import Movies from "./features/movies"
import TestTS from "./features/textTS"

function App() {
  return (
    <div className='container'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<TestTS/>} />
            <Route path='/products' element={<Movies/>} />
            <Route path='/about' element={<Movies/>} />
            <Route path='/location' element={<Movies/>} />
            <Route path='/cart' element={<Movies/>} />
            <Route path='/chat' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<div>this is error component</div>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
