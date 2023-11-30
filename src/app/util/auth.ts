import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { sql } from '../../../db';
import { NextResponse } from 'next/server';

export async function getJWTPayload() {
  const cookieStore = cookies();

  const token = cookieStore.get('jwt-token');
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload, protectedHeader } = await jwtVerify(token?.value!, secret);

  return payload;
}

export async function autohrizeAdmin(func: Function) {
  const jwtPayload = await getJWTPayload();

  const res = await sql('SELECT is_admin FROM users WHERE id = $1', [
    jwtPayload.sub,
  ]);

  const data = res.rows[0];

  if (!data.is_admin) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 403 });
  }

  return func();
}
