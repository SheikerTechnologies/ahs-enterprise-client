import mongoose from "mongoose";

type Cache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const g = globalThis as typeof globalThis & { _mongooseCache?: Cache };
const cache: Cache = g._mongooseCache ?? (g._mongooseCache = { conn: null, promise: null });

export function isDbConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (cache.conn) return cache.conn;

  cache.promise ??= mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || "ahs_enterprise",
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
  });

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }
  return cache.conn;
}
