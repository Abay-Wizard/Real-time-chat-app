import { userAuthStore } from "../store/userAuthStore";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { MessageSquare, LogOut, User, Settings } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, authUser } = userAuthStore();

  return (
    <nav className="w-full bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <MessageSquare className="text-primary w-6 h-6" />
            <h1 className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
              NileChat
            </h1>
          </Link>
        </div>

        {/* Center: Hidden on mobile */}
        <div className="hidden md:flex flex-1 justify-center">
          <p className="text-sm text-base-content/70 italic">
            Connect, chat, and share in real time 🌍
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          {authUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                  <img
                    alt="user avatar"
                    src={
                      authUser?.profilePic ||
                      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                    }
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-lg w-52 border border-base-300"
              >
                <li onClick={() => navigate("/profile")}>
                  <a className="flex items-center gap-2 hover:bg-primary/10 transition-colors">
                    <User size={16} /> Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-error hover:bg-error/10 transition-colors w-full text-left px-2 py-1 rounded"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => navigate('/signup')}
              className="
    rounded-xl
    px-6
    py-2
    bg-gradient-to-r from-purple-500 to-indigo-500
    text-white
    font-semibold
    shadow-lg
    hover:shadow-xl
    hover:scale-105
    transition
    duration-300
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-purple-400
    focus:ring-offset-2
  "
            >
              Sign Up
            </button>

          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
