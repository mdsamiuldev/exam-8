"use client";
import Link from "next/link";
import { FaHandsHolding, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/10 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5 text-xl font-extrabold text-white">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md">
              <FaHandsHolding className="text-white text-xl" />
            </div>
            <span>Social Events</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Empowering communities, organizing social welfare initiatives, and bringing people together for positive change.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wider uppercase">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link href="/events" className="hover:text-blue-400 transition-colors">All Events</Link></li>
            <li><Link href="/create-event" className="hover:text-blue-400 transition-colors">Create Event</Link></li>
            <li><Link href="/login" className="hover:text-blue-400 transition-colors">Login</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wider uppercase">Event Categories</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>Community Service</li>
            <li>Blood Donation</li>
            <li>Environmental Drive</li>
            <li>Education & Skill</li>
          </ul>
        </div>

        {/* Social Connect */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wider uppercase">Connect With Us</h4>
          <p className="text-sm text-slate-400 mb-4">Stay connected through our social media channels.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-blue-600 flex items-center justify-center text-white transition-all shadow-md">
              <FaFacebook />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-sky-500 flex items-center justify-center text-white transition-all shadow-md">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-pink-600 flex items-center justify-center text-white transition-all shadow-md">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-blue-700 flex items-center justify-center text-white transition-all shadow-md">
              <FaLinkedin />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
        &copy; 2026 Social Development Events Platform. All rights reserved.
      </div>
    </footer>
  );
}