//import ThemeSwitcher from "./components/ThemeSwitcher"
import {Routes,Route,Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { userAuthStore } from './store/userAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
function App() {
   const {authUser,checkAuth,isChekingAuth,onlineUsers} =userAuthStore()
   useEffect(()=>{
    checkAuth()
   },[])
  //console.log(authUser)
  console.log(onlineUsers)
   if(isChekingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-8 animate-spin' />
      </div>
    )
   }
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Navigate to='/login' />}/>
          <Route path='/signup' element={!authUser ? <SignUp/>:<Navigate to ='/'/>}/>
          <Route path='/login' element={!authUser ? <Login/> : <Navigate to='/' />}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </main>
      <Footer />
      <Toaster/>
    </div>
  )
}

export default App
