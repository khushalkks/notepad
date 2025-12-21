import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/navbar' element={<Navbar />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App