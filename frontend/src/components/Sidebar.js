import React, { useState } from "react";
import { assets } from "../assets/Assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Example users (filterable by search)
  const users = [
    { id: 1, name: "Alice", avatar: assets.p1 },
    { id: 2, name: "Bob", avatar: assets.p2 },
    { id: 3, name: "Charlie", avatar: assets.p3 },
  ].filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white border-r border-gray-200 flex flex-col h-full shadow-md">
      
      {/* Header: Logo + App Name + Menu */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img className="w-10 h-10" src={assets.logo} alt="logo" />
          <span className="text-xl font-bold text-gray-800">Nile-Chat</span>
        </div>

        <div className="relative group">
          <img
            className="w-6 h-6 cursor-pointer"
            src={assets.menu2}
            alt="menu"
          />
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
            <p
              onClick={() => navigate("/profile")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
            >
              Edit Profile
            </p>
            <hr className="border-t border-gray-200" />
            <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
              Logout
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <img src={assets.search} alt="search" className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto mt-2">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-lg mb-1 transition-all duration-150 ${
                selectedUser?.id === user.id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 px-4 py-2">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
