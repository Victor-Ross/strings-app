import { loadEnvConfig } from '@next/env';
import { Client, QueryResult } from 'pg';

loadEnvConfig(process.cwd());

export async function getClient(): Promise<Client> {
  const client = new Client({
    host: process.env.NEXT_PUBLIC_POSTGRES_HOST,
    port: Number(process.env.NEXT_PUBLIC_POSTGRES_PORT),
    user: process.env.NEXT_PUBLIC_POSTGRES_USER,
    password: process.env.NEXT_PUBLIC_POSTGRES_PASSWORD,
    database: process.env.NEXT_PUBLIC_POSTGRES_DATABASE,
  });

  return client;
}

export async function sql(
  sql: string,
  values?: Array<any>
): Promise<QueryResult<any>> {
  const client = await getClient();

  try {
    await client.connect();

    await client.query('BEGIN');

    const res = await client.query(sql, values);

    await client.query('COMMIT');

    return res;
  } catch (error) {
    await client.query('ROLLBACK');

    throw error;
  } finally {
    await client.end();
  }
}
