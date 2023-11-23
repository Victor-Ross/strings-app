import { NextResponse } from 'next/server';
import { sql } from '@/../db';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  const json = await request.json();

  const res = await sql(
    'SELECT id, username, password FROM users WHERE username ILIKE $1',
    [json.username]
  );

  if (res.rowCount === 0) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 });
  }

  const user = res.rows[0];
  console.log(json.password, user);
  const match = await bcrypt.compare(json.password, user.password);

  if (!match) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime('2w')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  const response = NextResponse.json({ msg: 'login success' });
  response.cookies.set('jwt-token', token, {
    sameSite: true,
    httpOnly: true,
    secure: true,
  });

  return response;
}
