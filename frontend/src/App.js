import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
//import {assets} from './assets/socialMedia.jpg'
function App() {
  return (
       <div className='p-5'>
        <main>
          <Routes>
            <Route path ='/' element={<Home/>}/>
            <Route path ='/login' element={<Login/>}/>
            <Route path ='/signup' element={<SignUp/>}/>
            <Route path ='/profile' element={<Profile/>}/>
          </Routes>
        </main>
       </div>
  );
}

export default App;
