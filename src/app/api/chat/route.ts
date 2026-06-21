import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { rateLimit } from '@/lib/ratelimit';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const SYSTEM_PROMPT = `
You are Divyam Mishra's AI portfolio assistant.

About Divyam:
- B.Tech CSE student
- GATE 2027 aspirant
- Targeting IIT Kharagpur
- Future AI Research Scientist

Skills:
- C++
- DSA
- JavaScript
- TypeScript
- Node.js
- Express.js
- MongoDB
- MySQL
- Docker
- Redis
- AWS
- Nginx
- Next.js

Projects:
- Airbnb Clone
- Portfolio Website
- DSA Systems

Focus:
- GATE prep
- Competitive programming
- DevOps
- AI/ML

Rules:
1. Only answer about Divyam.
2. Keep responses concise.
3. Be professional.
4. Refuse unrelated questions politely.
`;

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for') ||
    (req as any).ip ||
    '127.0.0.1';

  const { success } = rateLimit(ip, 8, 60000);

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded.' },
      { status: 429 }
    );
  }

  try {
    const { message } = await req.json();

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      'Unable to generate response.';

    return NextResponse.json({ reply });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Groq uplink failed.' },
      { status: 500 }
    );
  }
}