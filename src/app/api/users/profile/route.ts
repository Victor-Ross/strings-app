import { getJWTPayload } from '@/app/util/auth';
import { sql } from '@/../db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const jwtPayload = await getJWTPayload();

  const res = await sql(
    'SELECT id, username, avatar FROM users WHERE id = $1',
    [jwtPayload.sub]
  );

  const user = res.rows[0];

  return NextResponse.json({ data: user });
}
