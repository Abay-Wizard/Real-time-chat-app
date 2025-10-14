import React, { useState } from "react";
import { Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { userAuthStore } from "../store/userAuthStore";

const SignUp = () => {
    const { signup, isSigningUp } = userAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const formValidator = () => {
        if (!formData.fullName || !formData.email || !formData.password) {
            return toast.error("All fields are required");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return toast.error("Please enter a valid email address");
        }
        if (formData.password.length < 8) {
            return toast.error("Password must be at least 8 characters long!");
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValidator()) return;
        signup(formData);
        setFormData({
            fullName:'',
            email:'',
            password:''
        })
    };

    return (
        <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-base-100">
            {/* LEFT — SIGNUP FORM */}
            <div className="flex items-center justify-center p-6 sm:p-10">
                <div className="w-full max-w-md space-y-6">
                    {/* Logo + Heading */}
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full">
                            <MessageSquare className="size-7 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold">Create an Account</h1>
                        <p className="text-base-content/60 text-sm">
                            Get started with your free account
                        </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="input input-bordered w-full h-12"
                                required
                            />
                        </div>

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
                                onChange={handleChange}
                                className="input input-bordered w-full h-12"
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
                                    onChange={handleChange}
                                    className="input input-bordered w-full h-12 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-primary"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full h-12 mt-3 text-base font-semibold"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center pt-4">
                        <p className="text-sm text-base-content/70">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary font-medium">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT — Illustration */}
            <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 relative overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-60"></div>

                {/* Floating shapes for a dynamic look */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-10 w-64 h-64 bg-secondary/20 blur-3xl rounded-full"></div>

                {/* Content */}
                <div className="relative max-w-lg text-center p-10 space-y-6 animate-fade-in">
                    <p className="mb-6 text-primary font-semibold text-lg tracking-wide uppercase">
                        Discover Amazing People
                    </p>

                    <div className="relative group">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6nfx8ZgjYmtQ7xIt003ArOkdhoK-S1gUtMg&s"
                            alt="Community Showcase"
                            className="w-full h-auto rounded-2xl shadow-xl transform transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-base-100/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <h2 className="text-3xl font-bold text-primary drop-shadow-sm">
                        Welcome to Our Community
                    </h2>

                    <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
                        Connect, create, and grow with a network of inspiring individuals.
                        Together, we’re building something truly extraordinary.
                    </p>

                    {/* Decorative divider */}
                    <div className="flex justify-center">
                        <div className="w-16 h-[2px] bg-primary/50 rounded-full"></div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SignUp;
