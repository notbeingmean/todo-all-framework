import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { env } from "../env";
import * as schema from "./schema/schema";

const client = new Client({
  connectionString: env.DATABASE_URL,
});

client.connect();

export const db = drizzle(client, { schema: schema });
