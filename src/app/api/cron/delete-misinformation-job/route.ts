import { NextResponse } from 'next/server';
import { sql } from '../../../../../db';

export async function GET(request: Request) {
  console.log('Executing delete misinformation job');

  const res = await sql(
    "DELETE FROM posts WHERE is_misinformation = true AND is_misinformation_flagged_at <= now() - interval '1 minute'"
  );

  return NextResponse.json({
    msg: `Misinformation posts deleted ${res.rowCount}`,
  });
}
