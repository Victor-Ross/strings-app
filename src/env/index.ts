import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_POSTGRES_HOST: z.string(),
  NEXT_PUBLIC_POSTGRES_USER: z.string(),
  NEXT_PUBLIC_POSTGRES_PASSWORD: z.string(),
  NEXT_PUBLIC_POSTGRES_DATABASE: z.string(),
  NEXT_PUBLIC_POSTGRES_PORT: z.coerce.number(),
});

console.log('AAAAAAAAAAAAAAAAAAA   ', process.env.NEXT_PUBLIC_POSTGRES_HOST);

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.log(_env.error.flatten().fieldErrors);

  throw _env.error;
}

export const env = _env.data;
