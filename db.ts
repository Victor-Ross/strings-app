import { loadEnvConfig } from '@next/env';
import { Client, QueryResult } from 'pg';

loadEnvConfig(process.cwd());

export async function getClient(): Promise<Client> {
  // Production
  if (process.env.POSTGRES_URL) {
    const client = new Client({
      connectionString: process.env.POSTGRES_URL + '?sslmode=require',
    });
    return client;
  } else {
    // Development
    const client = new Client({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    });

    return client;
  }
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
