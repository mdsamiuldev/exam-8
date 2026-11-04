import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// সব ইভেন্ট ফেচ করার জন্য (GET)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // ডিফল্ট ডেটাবেজ
    const events = await db.collection("events").find({}).sort({ date: 1 }).toArray();

    return NextResponse.json(events, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// নতুন ইভেন্ট তৈরি করার জন্য (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, date, location, category } = body;

    if (!title || !description || !date || !location || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const newEvent = {
      title,
      description,
      date,
      location,
      category,
      createdAt: new Date(),
    };

    const result = await db.collection("events").insertOne(newEvent);

    return NextResponse.json({ message: "Event created successfully", eventId: result.insertedId }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}