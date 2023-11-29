import { getJWTPayload } from '@/app/util/auth';
import { sql } from '@/../db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const jwtPayload = await getJWTPayload();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  const res = await sql(
    'SELECT * FROM follows WHERE user_id = $1 AND follower_id = $2',
    [userId, jwtPayload.sub]
  );

  return NextResponse.json({ data: res.rows });
}

export async function POST(request: Request) {
  const jwtPayload = await getJWTPayload();
  const json = await request.json();

  const res = await sql(
    'SELECT * FROM follows WHERE user_id = $1 AND follower_id = $2',
    [json.user_id, jwtPayload.sub]
  );

  if (res.rowCount! > 0) {
    return NextResponse.json({ error: 'Already following' }, { status: 409 });
  }

  await sql('INSERT INTO follows (user_id, follower_id) VALUES ($1, $2)', [
    json.user_id,
    jwtPayload.sub,
  ]);

  return NextResponse.json({ msg: 'Follow success' });
}
