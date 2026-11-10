"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
  FaUsers,
  FaArrowLeft,
  FaCheckCircle,
  FaShareAlt,
} from "react-icons/fa";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  attendees?: number;
}

function EventDetailContent() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) {
          throw new Error("Event not found");
        }
        const data = await res.json();
        setEvent(data);
      } catch {
        setError("Event could not be found or loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleJoin = async () => {
    if (!id || hasJoined) return;
    setJoining(true);
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "POST",
      });
      if (res.ok) {
        setHasJoined(true);
        if (event) {
          setEvent({
            ...event,
            attendees: (event.attendees || 0) + 1,
          });
        }
      }
    } catch {
      // Fallback optimistic update
      setHasJoined(true);
    } finally {
      setJoining(false);
    }
  };

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // clipboard unavailable
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-blue-950 text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm font-medium cursor-pointer"
          >
            <FaArrowLeft className="text-xs" /> Back to Events
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <span className="loading loading-spinner loading-lg text-blue-400"></span>
          </div>
        ) : error || !event ? (
          <div className="text-center py-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">Event Not Found</h3>
            <p className="text-blue-200 mb-6">{error || "The requested event could not be found."}</p>
            <Link
              href="/events"
              className="btn bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-bold shadow-lg border-none"
            >
              Browse All Events
            </Link>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header / Hero */}
            <div className="p-8 md:p-12 border-b border-white/10 bg-linear-to-b from-blue-950/60 to-transparent">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <span className="badge bg-blue-500/30 text-blue-200 font-semibold px-3 py-3 rounded-full flex items-center gap-1.5 border border-blue-400/30 text-sm">
                  <FaTag className="text-xs" /> {event.category}
                </span>

                <button
                  onClick={handleShare}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <FaShareAlt className="text-xs" /> {copied ? "Link Copied!" : "Share Event"}
                </button>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                {event.title}
              </h1>

              {/* Meta items */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <div className="text-xs text-blue-300 uppercase tracking-wider font-semibold">Date & Time</div>
                    <div className="text-sm font-medium text-white">{new Date(event.date).toLocaleString()}</div>
                  </div>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-400/30 flex items-center justify-center text-rose-400">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <div className="text-xs text-rose-300 uppercase tracking-wider font-semibold">Location</div>
                    <div className="text-sm font-medium text-white">{event.location}</div>
                  </div>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <FaUsers />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-300 uppercase tracking-wider font-semibold">Participants</div>
                    <div className="text-sm font-medium text-white">{(event.attendees || 0) + (hasJoined ? 1 : 0)} Attending</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Action */}
            <div className="p-8 md:p-12 space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                  About This Initiative
                </h3>
                <p className="text-blue-100/90 leading-relaxed text-base whitespace-pre-line bg-black/20 p-6 rounded-2xl border border-white/10">
                  {event.description}
                </p>
              </div>

              {/* Join action banner */}
              <div className="bg-linear-to-r from-blue-900/40 via-indigo-900/40 to-slate-900/40 border border-blue-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    {hasJoined ? "You are participating in this event!" : "Ready to make an impact?"}
                  </h4>
                  <p className="text-sm text-blue-200">
                    {hasJoined
                      ? "Thank you for volunteering! Bring your friends and meet at the designated location."
                      : "Join your fellow community members and volunteers for this event."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleJoin}
                  disabled={joining || hasJoined}
                  className={`px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 text-sm shrink-0 border-none cursor-pointer ${
                    hasJoined
                      ? "bg-emerald-600 text-white cursor-default"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {hasJoined ? (
                    <>
                      <FaCheckCircle /> Joined!
                    </>
                  ) : joining ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <FaUsers /> Join This Event
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-blue-950 flex justify-center items-center py-24">
          <span className="loading loading-spinner loading-lg text-blue-400"></span>
        </div>
      }
    >
      <EventDetailContent />
    </Suspense>
  );
}
