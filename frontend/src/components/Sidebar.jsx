import React, { useEffect, useState } from 'react'
import { messageStore } from '../store/messageStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import { Users } from 'lucide-react'
import { userAuthStore } from '../store/userAuthStore'

const Sidebar = () => {
  const { fetchUsers, users, selectedUser, isLoadingUsers, setSelectedUser } = messageStore()
  const { onlineUsers } = userAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (isLoadingUsers) {
    return <SidebarSkeleton />
  }

  return (
    <aside className="h-full w-20 sm:w-24 md:w-64 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-4 sm:p-5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 sm:w-6 sm:h-6" />
          <span className="font-medium hidden md:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length > 1 ? onlineUsers.length - 1:0} online)</span>
        </div>
      </div>

      {/* Scrollable user list */}
      <div className="flex-1 overflow-y-auto w-full py-3 space-y-2 px-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''}
            `}
          >
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic || '/avatar.png'}
                alt={user.name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-3 sm:h-3 bg-green-500 rounded-full ring-2 ring-base-900" />
              )}
            </div>

            <div className="hidden md:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <h1 className="text-center text-sm text-zinc-500">No online users</h1>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
