import React from 'react'
import { assets } from '../assets/Assets'
const ChatContainer = ({selectedUser,setSelectedUser}) => {
  return selectedUser? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* ...header... */}
       <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img className='w-8 rounded-full' src={assets.p4} alt='' />
         <p className='flex text-lg flex-1 items-center gap-2'>
           Martine Johnson
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
         </p>
         <img onClick={()=>setSelectedUser(null)} className='md:hidden max-w-7' src={assets.arrow} alt=''/>
         <img className='max-md:hidden max-w-5' src={assets.help} alt='' />
       </div>
      {/*...chat area... */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
      </div>
    </div>
  ):(
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo} alt='logo' className='max-w-16'/>
      <p className='text-xl font-medium'>Chat anytime, anywhere.</p>
    </div>
  )
}

export default ChatContainer
