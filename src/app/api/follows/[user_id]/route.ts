import { getJWTPayload } from '@/app/util/auth';
import { sql } from '@/../db';
import { NextResponse } from 'next/server';

interface QueryParams {
  params: {
    user_id: number;
  };
}

export async function DELETE(request: Request, { params }: QueryParams) {
  const jwtPayload = await getJWTPayload();
  const userId = params.user_id;

  await sql('DELETE FROM follows WHERE user_id = $1 AND follower_id = $2', [
    userId,
    jwtPayload.sub,
  ]);

  return NextResponse.json({ msg: 'Follow deleted' });
}
