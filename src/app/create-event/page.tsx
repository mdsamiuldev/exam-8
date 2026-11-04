"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaHeading, FaAlignLeft, FaPlusCircle, FaArrowRight } from "react-icons/fa";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Community Service");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, date, location, category }),
      });

      if (!res.ok) {
        throw new Error("Failed to create event");
      }

      router.push("/events");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-blue-950 px-4">
      <div className="max-w-2xl w-full bg-white/15 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-3xl shadow-2xl text-white">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-3">
            <FaPlusCircle className="text-2xl text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Create New Social Event</h1>
          <p className="text-blue-200 text-sm mt-1">Organize a community initiative and inspire others to join</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-200 mb-2">Event Title</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-300">
                <FaHeading />
              </span>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Free Blood Donation Campaign" 
                required
                className="w-full pl-11 pr-4 py-3.5 bg-black/30 border border-white/10 rounded-xl text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-blue-200 mb-2">Date & Time</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-300">
                  <FaCalendarAlt />
                </span>
                <input 
                  type="datetime-local" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-blue-200 mb-2">Category</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-300">
                  <FaTag />
                </span>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
                >
                  <option value="Community Service">Community Service</option>
                  <option value="Blood Donation">Blood Donation</option>
                  <option value="Environmental Drive">Environmental Drive</option>
                  <option value="Education & Skill">Education & Skill</option>
                  <option value="Charity & Relief">Charity & Relief</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-200 mb-2">Location</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-300">
                <FaMapMarkerAlt />
              </span>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Central Park, Dhaka" 
                required
                className="w-full pl-11 pr-4 py-3.5 bg-black/30 border border-white/10 rounded-xl text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-200 mb-2">Description</label>
            <div className="relative">
              <span className="absolute top-3.5 left-0 pl-4 flex items-start text-blue-300">
                <FaAlignLeft />
              </span>
              <textarea 
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write details about the event..." 
                required
                className="w-full pl-11 pr-4 py-3.5 bg-black/30 border border-white/10 rounded-xl text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-500 transition-all text-sm"
              ></textarea>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 border-none cursor-pointer"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                Create Event <FaArrowRight className="text-xs" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}