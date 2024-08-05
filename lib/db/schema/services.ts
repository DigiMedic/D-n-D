import { sql } from "drizzle-orm";
import { text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { nanoid } from "../../utils";
import { providers } from "./providers";

export const services = pgTable("services", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  providerId: varchar("provider_id", { length: 191 })
    .notNull()
    .references(() => providers.id),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const insertServiceSchema = createSelectSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;