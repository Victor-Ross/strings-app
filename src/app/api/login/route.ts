import { NextResponse } from 'next/server';
import { sql } from '@/../db';

export async function POST(request: Request) {
  const json = await request.json();

  const res = await sql(
    'SELECT id, username, password FROM users WHERE username ILIKE $1',
    [json.username]
  );

  return NextResponse.json({ data: res.rows[0] });
}
