import { getJWTPayload } from '@/app/util/auth';
import { sql } from '@/../db';
import { NextResponse } from 'next/server';

interface QueryParams {
  params: {
    id: number;
  };
}

export async function GET(request: Request, { params }: QueryParams) {
  const jwtPayload = await getJWTPayload();
  const res = await sql(
    'SELECT * FROM posts p WHERE p.id = $1 AND p.user_id = $2',
    [params.id, jwtPayload.sub]
  );

  if (res.rowCount === 0) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  return NextResponse.json({ data: res.rows[0] });
}

export async function PATCH(request: Request, { params }: QueryParams) {
  const body = await request.json();

  const jwtPayload = await getJWTPayload();

  const res = await sql(
    'SELECT * FROM posts p WHERE p.user_id = $1 AND p.id = $2',
    [jwtPayload.sub, params.id]
  );

  if (res.rowCount === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await sql('UPDATE posts SET content = $1 WHERE user_id = $2 AND id = $3', [
    body.content,
    jwtPayload.sub,
    params.id,
  ]);

  return NextResponse.json({ message: 'Updated with success' });
}
