import { MongoClient, ObjectId } from "mongodb";

// In-memory fallback mock database for development / preview environments
export interface MockEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  createdAt?: Date;
  attendees?: number;
  [key: string]: unknown;
}

const initialEvents: MockEvent[] = [
  {
    _id: "67c12a819b01f40012345671",
    title: "Community Clean-up & Tree Plantation",
    description: "Join our green initiative to plant 500 indigenous trees and clean up Riverside Park. Gloves, shovels, and saplings provided. Let's make our neighborhood cleaner and greener!",
    date: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 16),
    location: "Riverside Eco Park, Sector 4",
    category: "Environmental Drive",
    createdAt: new Date(),
    attendees: 38,
  },
  {
    _id: "67c12a819b01f40012345672",
    title: "Annual Free Blood Donation Camp",
    description: "In collaboration with the Red Cross, we are organizing a free blood donation drive. Certified medical personnel will be present. Refreshments and donor certificates provided.",
    date: new Date(Date.now() + 86400000 * 6).toISOString().slice(0, 16),
    location: "Community Health Center, Block B",
    category: "Blood Donation",
    createdAt: new Date(),
    attendees: 52,
  },
  {
    _id: "67c12a819b01f40012345673",
    title: "Youth Digital Literacy Workshop",
    description: "Empowering underprivileged youth with fundamental computer literacy and coding skills. Volunteers and mentors are welcome to teach basic web development.",
    date: new Date(Date.now() + 86400000 * 9).toISOString().slice(0, 16),
    location: "Public Library Learning Hall",
    category: "Education & Skill",
    createdAt: new Date(),
    attendees: 24,
  },
  {
    _id: "67c12a819b01f40012345674",
    title: "Winter Clothing & Blanket Drive",
    description: "Collecting and distributing warm clothes, jackets, and blankets to homeless families and shelter homes before the peak winter cold. Every warm piece matters.",
    date: new Date(Date.now() + 86400000 * 12).toISOString().slice(0, 16),
    location: "City Central Square",
    category: "Charity & Relief",
    createdAt: new Date(),
    attendees: 45,
  },
  {
    _id: "67c12a819b01f40012345675",
    title: "Elder Care & Community Social Day",
    description: "Spending a joyful day with elderly residents at the Golden Age Care Home. Activities include story reading, board games, music performance, and healthy tea time.",
    date: new Date(Date.now() + 86400000 * 15).toISOString().slice(0, 16),
    location: "Golden Age Care Home, North Wing",
    category: "Community Service",
    createdAt: new Date(),
    attendees: 19,
  },
];

type StoreRecord = Record<string, unknown>;

// Persistent global mock storage across hot reloads and worker threads
const globalWithStore = global as typeof globalThis & {
  _mockCollections?: Record<string, StoreRecord[]>;
};

if (!globalWithStore._mockCollections) {
  globalWithStore._mockCollections = {
    events: [...initialEvents],
    users: [],
    sessions: [],
    accounts: [],
    verifications: [],
  };
}

function matchFilter(item: StoreRecord, filter: Record<string, unknown>): boolean {
  return Object.entries(filter).every(([k, v]) => {
    if (v === undefined) return true;
    return item[k] === v || String(item[k]) === String(v);
  });
}

function createMockCollection(name: string) {
  const collections = globalWithStore._mockCollections!;
  if (!collections[name]) {
    collections[name] = [];
  }
  const store = collections[name];

  return {
    find: (filter: Record<string, unknown> = {}) => {
      let filtered = store.filter((item) => matchFilter(item, filter));
      return {
        sort: (sortSpec: Record<string, number> = {}) => {
          const entries = Object.entries(sortSpec);
          if (entries.length > 0) {
            const [sortKey, sortDir] = entries[0];
            filtered = [...filtered].sort((a, b) => {
              const aVal = String(a[sortKey] ?? "");
              const bVal = String(b[sortKey] ?? "");
              if (aVal < bVal) return sortDir === -1 ? 1 : -1;
              if (aVal > bVal) return sortDir === -1 ? -1 : 1;
              return 0;
            });
          }
          return {
            toArray: async () => [...filtered],
          };
        },
        toArray: async () => [...filtered],
      };
    },
    findOne: async (filter: Record<string, unknown> = {}) => {
      return store.find((item) => matchFilter(item, filter)) || null;
    },
    insertOne: async (doc: StoreRecord) => {
      const _id = doc._id || new ObjectId().toHexString();
      const newDoc = { ...doc, _id };
      store.push(newDoc);
      return { insertedId: _id, acknowledged: true };
    },
    insertMany: async (docs: StoreRecord[]) => {
      const insertedIds: Record<number, unknown> = {};
      docs.forEach((d, idx) => {
        const _id = d._id || new ObjectId().toHexString();
        store.push({ ...d, _id });
        insertedIds[idx] = _id;
      });
      return { insertedIds, acknowledged: true };
    },
    updateOne: async (
      filter: Record<string, unknown>,
      update: Record<string, unknown>
    ) => {
      const index = store.findIndex((item) => matchFilter(item, filter));
      if (index !== -1) {
        const setOps = (update.$set as StoreRecord) || update;
        store[index] = { ...store[index], ...setOps };
        return { modifiedCount: 1, matchedCount: 1, acknowledged: true };
      }
      return { modifiedCount: 0, matchedCount: 0, acknowledged: true };
    },
    deleteOne: async (filter: Record<string, unknown>) => {
      const index = store.findIndex((item) => matchFilter(item, filter));
      if (index !== -1) {
        store.splice(index, 1);
        return { deletedCount: 1, acknowledged: true };
      }
      return { deletedCount: 0, acknowledged: true };
    },
    deleteMany: async (filter: Record<string, unknown>) => {
      let count = 0;
      for (let i = store.length - 1; i >= 0; i--) {
        if (matchFilter(store[i], filter)) {
          store.splice(i, 1);
          count++;
        }
      }
      return { deletedCount: count, acknowledged: true };
    },
    createIndex: async () => "idx_ok",
    indexes: async () => [],
    countDocuments: async () => store.length,
  };
}

function createMockDb() {
  return {
    collection: (name: string) => createMockCollection(name),
  };
}

function createMockClient(): MongoClient {
  return {
    db: () => createMockDb(),
    close: async () => {},
  } as unknown as MongoClient;
}

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let clientPromise: Promise<MongoClient>;

if (process.env.MONGODB_URI) {
  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 2000,
        connectTimeoutMS: 2000,
      });
      globalWithMongo._mongoClientPromise = client.connect().catch((err) => {
        console.warn("[AI Studio] MongoDB connection failed, using in-memory mock store:", err.message);
        return createMockClient();
      });
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    });
    clientPromise = client.connect().catch((err) => {
      console.warn("[AI Studio] MongoDB connection failed, using in-memory mock store:", err.message);
      return createMockClient();
    });
  }
} else {
  // Safe in-memory fallback when external MongoDB URI is not set
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = Promise.resolve(createMockClient());
  }
  clientPromise = globalWithMongo._mongoClientPromise;
}

export default clientPromise;