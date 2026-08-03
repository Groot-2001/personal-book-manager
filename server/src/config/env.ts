import "dotenv/config";
import { z } from "zod";


enum NodeEnv {
  Development = "development",
  Production = "production",
}

const envSchema = z.object({
  PORT: z.string().default("5000"),
  MONGODB_URI: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.Development),
});

export const env = envSchema.parse(process.env);