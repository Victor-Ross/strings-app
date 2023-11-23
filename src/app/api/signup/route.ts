import { sql } from '@/../db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const requestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  const json = requestSchema.parse(await request.json());

  console.log(json);

  const res = await sql(
    'SELECT id, username FROM users WHERE username ILIKE $1',
    [json.username]
  );

  if (res.rowCount! > 0) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(json.password, saltRounds);

  await sql('INSERT INTO users (username, password) VALUES ($1, $2)', [
    json.username,
    hash,
  ]);

  return NextResponse.json({ msg: 'Registration success' }, { status: 201 });
}
