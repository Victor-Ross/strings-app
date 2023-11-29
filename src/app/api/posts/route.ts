import { getJWTPayload } from '@/app/util/auth';
import { sql } from '@/../db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const jwtPayload = await getJWTPayload();
  const { searchParams } = new URL(request.url);

  const username = searchParams.get('username');
  const page =
    (searchParams.get('page') && parseInt(searchParams.get('page')!)) || 0;
  const limit = 3;
  const offset = page * 3;

  const statement = `
    SELECT 
          p.*, 
          u.avatar, 
          u.username 
    FROM 
          posts p 
    INNER JOIN
          users u ON u.id = p.user_id
    WHERE
          p.user_id = $1
    ORDER BY
          p.created_at DESC
    LIMIT
          $2
    OFFSET
          $3
    `;

  if (username) {
    const userRes = await sql('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (userRes.rowCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const user = userRes.rows[0];
    const postsRes = await sql(statement, [user.id, limit, offset]);

    return NextResponse.json({ data: postsRes.rows });
  }

  const res = await sql(statement, [jwtPayload.sub, limit, offset]);

  return NextResponse.json({ data: res.rows });
}

export async function POST(request: Request) {
  const body = await request.json();

  const jwtPayload = await getJWTPayload();

  const res = await sql(
    'INSERT INTO posts(user_id, content) VALUES($1, $2) RETURNING *',
    [jwtPayload.sub, body.content]
  );

  return NextResponse.json({ data: res.rows[0] }, { status: 201 });
}
