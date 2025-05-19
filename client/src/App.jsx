import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'
import ChatRoom from './HomeChatPage'
import RightSidebar from './NavBar'
import ProtectedRoute from './Auth0ProtectedRoute'
import AuthStatusPage from './Authenticate'
import NotFoundPage from './NotFound'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute><ChatRoom/></ProtectedRoute>}></Route>
        <Route path='/authenticate' element={<AuthStatusPage/>}></Route>
        <Route path='*' element={<NotFoundPage/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
