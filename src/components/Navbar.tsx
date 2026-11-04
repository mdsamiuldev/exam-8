"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHandsHelping, FaHome, FaCalendarAlt, FaPlusCircle, FaUser, FaUserPlus } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-white/10 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-wide">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md">
            <FaHandsHelping className="text-white text-xl" />
          </div>
          <span className="bg-linear-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
            Social Events
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-2 font-medium">
          <Link 
            href="/" 
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              isActive("/") ? "bg-blue-600 text-white shadow-md" : "text-blue-200 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaHome /> Home
          </Link>
          <Link 
            href="/events" 
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              isActive("/events") ? "bg-blue-600 text-white shadow-md" : "text-blue-200 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaCalendarAlt /> All Events
          </Link>
          <Link 
            href="/create-event" 
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              isActive("/create-event") ? "bg-blue-600 text-white shadow-md" : "text-blue-200 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaPlusCircle /> Create Event
          </Link>
        </div>

        {/* Auth Buttons (Login & Register) */}
        <div className="flex items-center gap-3">
          <Link 
            href="/login" 
            className={`px-5 py-2.5 rounded-xl font-semibold border border-blue-400/30 transition-all flex items-center gap-2 ${
              isActive("/login") ? "bg-blue-600 text-white" : "text-blue-200 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaUser className="text-xs" /> Login
          </Link>
          
          <Link 
            href="/register" 
            className="btn bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 rounded-xl font-semibold shadow-md border-none flex items-center gap-2"
          >
            <FaUserPlus className="text-xs" /> Register
          </Link>
        </div>

      </div>
    </nav>
  );
}