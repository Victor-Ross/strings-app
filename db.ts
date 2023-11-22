import { loadEnvConfig } from '@next/env';
import { Client } from 'pg';

loadEnvConfig(process.cwd());

export async function getClient() {
  const client = new Client({
    host: process.env.NEXT_PUBLIC_POSTGRES_HOST,
    port: Number(process.env.NEXT_PUBLIC_POSTGRES_PORT),
    user: process.env.NEXT_PUBLIC_POSTGRES_USER,
    password: process.env.NEXT_PUBLIC_POSTGRES_PASSWORD,
    database: process.env.NEXT_PUBLIC_POSTGRES_DATABASE,
  });

  return client;
}
