//import ThemeSwitcher from "./components/ThemeSwitcher"
import {Routes,Route,Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import { userAuthStore } from './store/userAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
function App() {
   const {authUser,checkAuth,isChekingAuth} =userAuthStore()
   useEffect(()=>{
    checkAuth()
   },[])
  console.log(authUser)
   if(isChekingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-8 animate-spin' />
      </div>
    )
   }
  return (
    <div>
      <Navbar/>
      <main>
        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Navigate to='/login' />}/>
          <Route path='/signup' element={!authUser ? <SignUp/> : <Navigate to='/' />}/>
          <Route path='/login' element={!authUser ? <Login/> : <Navigate to='/' />}/>
          <Route path='/profile' element={authUser ? <Profile/> :<Navigate to='/login' />}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
