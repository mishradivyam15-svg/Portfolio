import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, VisitorModel } from '@/lib/db';

let mockVisitorCount = 2048; // Cyberpunk base counter

export async function GET(req: NextRequest) {
  try {
    const connection = await dbConnect();

    if (connection && !connection.isMock) {
      const totalVisits = await VisitorModel.countDocuments();
      return NextResponse.json({ count: Math.max(totalVisits, mockVisitorCount) });
    }

    // Local increment fallback
    mockVisitorCount += Math.floor(Math.random() * 3) + 1;
    return NextResponse.json({ count: mockVisitorCount });
  } catch (error) {
    console.error('Analytics endpoint error:', error);
    return NextResponse.json({ count: mockVisitorCount });
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || (req as any).ip || '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'unknown';

  try {
    const connection = await dbConnect();

    if (connection && !connection.isMock) {
      await VisitorModel.create({
        ip,
        userAgent,
        path: '/',
      });
      const count = await VisitorModel.countDocuments();
      return NextResponse.json({ success: true, count });
    }

    mockVisitorCount += 1;
    return NextResponse.json({ success: true, count: mockVisitorCount });
  } catch (error) {
    console.error('Analytics post endpoint error:', error);
    return NextResponse.json({ success: false, count: mockVisitorCount });
  }
}
