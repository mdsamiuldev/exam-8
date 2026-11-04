"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // এখানে আপনার রেজিস্টার লজিক বা বেটার-অথ (Better-Auth) কল থাকবে
      // উদাহরণস্বরূপ সফল হলে হোম পেজে রিডাইরেক্ট হবে:
      router.push("/");
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[20vh] py-12 flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-blue-950 px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl text-white">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-3">
            <FaUserPlus className="text-xl text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Create Account</h1>
          <p className="text-blue-200 text-sm mt-1">Join our community platform today</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-200 mb-2">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-300">
                <FaUser />
              </span>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name" 
                required
                className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-200 mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-300">
                <FaEnvelope />
              </span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
                required
                className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-200 mb-2">Password (Min 8 characters)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-300">
                <FaLock />
              </span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required
                minLength={8}
                className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 border-none"
          >
            Register <FaArrowRight className="text-xs" />
          </button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="grow border-t border-white/10"></div>
          <span className="shrink mx-4 text-blue-300 text-xs uppercase tracking-widest font-semibold">OR</span>
          <div className="grow border-t border-white/10"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={async () => {
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/",
            });
          }}
          className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-3 shadow-md cursor-pointer"
        >
          <FcGoogle className="text-xl bg-white rounded-full p-0.5" />
          <span>Continue with Google</span>
        </button>

        {/* Footer Link */}
        <p className="text-center text-sm text-blue-200 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-white font-bold hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}