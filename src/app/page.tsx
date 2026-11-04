"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaArrowRight, FaHandsHelping } from "react-icons/fa";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
}

export default function HomePage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data.slice(0, 3));
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
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-24 px-4 md:px-8 shadow-2xl border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-blue-200 font-semibold text-sm border border-white/20 shadow-inner">
            <FaHandsHelping className="text-yellow-400" /> Welcome to Social Development Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Empowering Communities, <br />
            <span className="text-yellow-400">Changing Lives Together</span>
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg">
            Join hands in social development events, community service, blood donation campaigns, and environmental drives to make a lasting impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/events" className="btn bg-yellow-400 hover:bg-yellow-500 text-slate-950 border-none px-8 text-base shadow-lg font-bold">
              Explore All Events <FaArrowRight />
            </Link>
            <Link href="/create-event" className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-8 text-base font-bold shadow-lg">
              Create an Event
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 md:px-8">
        <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-2">
              <span className="w-3 h-8 bg-blue-500 rounded-full inline-block"></span>
              Recent Social Events
            </h2>
            <p className="text-slate-400 mt-1">Check out the latest community initiatives and participate.</p>
          </div>
          <Link href="/events" className="text-blue-400 font-bold hover:underline flex items-center gap-1 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            View All <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <span className="loading loading-spinner loading-lg text-blue-500"></span>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl max-w-xl mx-auto p-8">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Events Found!</h3>
            <p className="text-slate-400 mb-6">No social events are available right now. Please create a new event to get started.</p>
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
                      <FaMapMarkerAlt className="text-red-400 text-base" />
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
      </section>
    </div>
  );
}