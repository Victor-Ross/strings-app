import { Post } from '@/app/components/Post';
import { sql } from '../../../../db';

async function getData() {
  const res = await sql(`
    SELECT
          p.*,
          u.avatar,
          u.username
    FROM
          posts p
    INNER JOIN
          users u ON p.user_id = u.id
    ORDER BY
          p.created_at DESC
    LIMIT
          10
  `);

  return res.rows;
}

export default async function PublicFeed() {
  const posts = await getData();

  return (
    <main>
      <h1>Strings</h1>
      <div>
        <h2>Recent Posts from the Community</h2>
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </main>
  );
}
