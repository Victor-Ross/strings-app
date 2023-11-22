CREATE extension IF NOT EXISTS CITEXT;

CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  username CITEXT UNIQUE NOT NULL,
  password TEXT,
  avatar TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.posts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users (id),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.follows (
  user_id BIGINT NOT NULL REFERENCES public.users (id),
  follower_id BIGINT NOT NULL REFERENCES public.users (id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX post_user_id_index ON public.posts (user_id);
CREATE INDEX follows_user_id_index ON public.follows (user_id);
CREATE INDEX follows_follower_id_index ON public.follows (follower_id);