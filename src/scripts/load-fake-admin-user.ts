import bcrypt from 'bcrypt';
import { getClient } from '../../db';

async function loadFakeAdminUser(username: string, password: string) {
  const client = await getClient();

  try {
    await client.connect();

    const saltRounds = 10;
    const hash = bcrypt.hash(password, saltRounds);

    await client.query('BEGIN');

    await client.query(
      'INSERT INTO public.users (username, password, is_admin) values ($1, $2, $3)',
      [username, hash, true]
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    await client.end();
  }
}

const username = process.argv[2];
const password = process.argv[3];
loadFakeAdminUser(username, password);
