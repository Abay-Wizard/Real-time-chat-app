import React, { useState } from "react";
import { userAuthStore } from "../store/userAuthStore";
import { Loader2, Eye, EyeOff, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const { isLoggingIn, login } = userAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleEvent = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 p-6">
      <div className="bg-base-100/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {/* Header / Branding */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="text-primary size-8" />
            <h1 className="text-3xl font-extrabold text-primary">NileChat</h1>
          </div>
          <p className="text-sm text-base-content/70 text-center">
            Welcome back! Sign in to continue your conversations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleEvent}
              className="input input-bordered w-full h-12 focus:input-primary"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleEvent}
                className="input input-bordered w-full h-12 pr-10 focus:input-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-primary"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full h-12 mt-4 text-base font-semibold hover:scale-[1.02] transition-transform duration-200"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-base-content/60 mt-3">
            Don’t have an account?{" "}
            <Link to="/signup" className="link link-primary font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
