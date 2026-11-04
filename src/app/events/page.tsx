"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaArrowRight } from "react-icons/fa";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
}

export default function AllEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
        }
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-blue-950 text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-10 rounded-3xl shadow-2xl text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">🌍 All Social Events</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Join hands, participate in community service, and make a lasting difference.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-blue-400"></span>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl max-w-xl mx-auto p-8">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Events Found!</h3>
            <p className="text-blue-200 mb-6">No social events are available right now. Please create a new event to get started.</p>
            <Link href="/create-event" className="btn bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-bold shadow-lg border-none">
              Create Event <FaArrowRight />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id} className="card bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl hover:bg-white/15 transition-all rounded-2xl overflow-hidden flex flex-col justify-between">
                <div className="card-body p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="badge bg-blue-500/30 text-blue-200 font-semibold px-3 py-3 rounded-full flex items-center gap-1 border border-blue-400/30">
                      <FaTag className="text-xs" /> {event.category}
                    </span>
                  </div>

                  <h2 className="card-title text-2xl font-bold text-white mb-2">{event.title}</h2>
                  <p className="text-blue-200 text-sm line-clamp-3 mb-6 leading-relaxed">{event.description}</p>

                  <div className="space-y-3 text-sm text-blue-100 bg-black/20 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2.5">
                      <FaCalendarAlt className="text-blue-400 text-base" />
                      <span className="font-medium">{new Date(event.date).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <FaMapMarkerAlt className="text-rose-400 text-base" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-black/30 border-t border-white/10">
                  <Link href={`/events/${event._id}`} className="btn bg-blue-600 hover:bg-blue-700 text-white w-full rounded-xl shadow-md font-semibold border-none">
                    View Details & Join
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}