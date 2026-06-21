import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (!MONGODB_URI) {
    // Return mock database connector if MONGODB_URI is not set
    // This ensures no crash on build/development when environment variables aren't provided
    return { isMock: true };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// ---------------- Models ----------------

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MessageModel = mongoose.models.Message || mongoose.model('Message', MessageSchema);

const VisitorSchema = new mongoose.Schema({
  ip: { type: String, default: 'anonymous' },
  userAgent: { type: String },
  path: { type: String, default: '/' },
  timestamp: { type: Date, default: Date.now },
});

export const VisitorModel = mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
