import { NextResponse } from 'next/server';
import { sql } from '../../../../db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get('q');

  if (!search) {
    return NextResponse.json(
      { error: 'Search parameter required' },
      { status: 400 }
    );
  }

  const res = await sql(
    'SELECT id, username, avatar FROM users WHERE username ILIKE $1 LIMIT 10',
    ['%' + search + '%']
  );

  return NextResponse.json({ data: res.rows });
}
