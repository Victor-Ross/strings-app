import { NextResponse } from 'next/server';
import { sql } from '../../../../db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username filter required' },
      { status: 400 }
    );
  }

  const statement =
    'SELECT id, username, avatar FROM users WHERE username ILIKE $1';
  const values = [username];

  const res = await sql(statement, values);

  return NextResponse.json({ data: res.rows });
}
