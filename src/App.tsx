import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./features/main";
import Login from "./features/login";
import AuthProvider from "./contexts/useAuthContext"

function App() {
  return (
    <div className='container'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
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
