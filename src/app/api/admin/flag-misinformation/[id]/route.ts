import { autohrizeAdmin } from '@/app/util/auth';
import { sql } from '../../../../../../db';
import { NextResponse } from 'next/server';

interface QueryParams {
  params: {
    id: number;
  };
}

export async function PATCH(request: Request, { params }: QueryParams) {
  return autohrizeAdmin(async () => {
    console.log(`Flagging ${params.id} as misinformation`);
    await sql(
      'UPDATE posts SET is_misinformation = true, is_misinformation_flagged_at = now() WHERE id = $1',
      [params.id]
    );

    return NextResponse.json({ msg: 'Flagged as misinformation' });
  });
}
