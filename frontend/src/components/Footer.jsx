import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div className="flex flex-col items-start space-y-3">
          <h1 className="text-2xl font-bold text-primary">NileChat</h1>
          <p className="text-sm text-base-content/70">
            Connect, chat, and share with people around the world in real time.
            Our platform ensures your conversations are smooth, fast, and secure.
          </p>
        </div>

        {/* Navigation / Quick Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="font-semibold text-lg mb-2">Quick Links</h2>
          <div className="flex flex-col space-y-1">
            <button className="btn btn-ghost btn-sm normal-case justify-start">Home</button>
            <button className="btn btn-ghost btn-sm normal-case justify-start">Features</button>
            <button className="btn btn-ghost btn-sm normal-case justify-start">Pricing</button>
            <button className="btn btn-ghost btn-sm normal-case justify-start">Support</button>
          </div>
        </div>

        {/* Socials */}
        <div className="flex flex-col space-y-2">
          <h2 className="font-semibold text-lg mb-2">Follow Us</h2>
          <div className="flex items-center gap-4">
            <button className="btn btn-circle btn-outline btn-sm">
              <Facebook size={18} />
            </button>
            <button className="btn btn-circle btn-outline btn-sm">
              <Twitter size={18} />
            </button>
            <button className="btn btn-circle btn-outline btn-sm">
              <Instagram size={18} />
            </button>
            <button className="btn btn-circle btn-outline btn-sm">
              <Linkedin size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-base-300 text-base-content/70 text-center py-4 mt-6">
        &copy; {new Date().getFullYear()} NileChat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
