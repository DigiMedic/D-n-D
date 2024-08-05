import { sql } from "drizzle-orm";
import { text, varchar, timestamp, integer, pgTable } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@/lib/utils";

export const resources = pgTable("resources", {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  type: varchar("type", { length: 50 }).notNull(),
  MistoPoskytovaniId: integer("MistoPoskytovaniId"),
  ZdravotnickeZarizeniId: integer("ZdravotnickeZarizeniId"),
  Kod: varchar("Kod", { length: 50 }),
  NazevZarizeni: varchar("NazevZarizeni", { length: 255 }),
  DruhZarizeni: varchar("DruhZarizeni", { length: 100 }),
  Obec: varchar("Obec", { length: 100 }),
  Psc: varchar("Psc", { length: 10 }),
  Ulice: varchar("Ulice", { length: 100 }),
  CisloDomovniOrientacni: varchar("CisloDomovniOrientacni", { length: 20 }),
  Kraj: varchar("Kraj", { length: 50 }),
  KrajCode: varchar("KrajCode", { length: 10 }),
  Okres: varchar("Okres", { length: 50 }),
  OkresCode: varchar("OkresCode", { length: 10 }),
  SpravniObvod: varchar("SpravniObvod", { length: 50 }),
  PoskytovatelTelefon: varchar("PoskytovatelTelefon", { length: 20 }),
  PoskytovatelFax: varchar("PoskytovatelFax", { length: 20 }),
  PoskytovatelEmail: varchar("PoskytovatelEmail", { length: 100 }),
  PoskytovatelWeb: varchar("PoskytovatelWeb", { length: 100 }),
  Ico: varchar("Ico", { length: 20 }),
  TypOsoby: varchar("TypOsoby", { length: 50 }),
  PravniFormaKod: varchar("PravniFormaKod", { length: 20 }),
  KrajCodeSidlo: varchar("KrajCodeSidlo", { length: 10 }),
  OkresCodeSidlo: varchar("OkresCodeSidlo", { length: 10 }),
  ObecSidlo: varchar("ObecSidlo", { length: 100 }),
  PscSidlo: varchar("PscSidlo", { length: 10 }),
  UliceSidlo: varchar("UliceSidlo", { length: 100 }),
  CisloDomovniOrientacniSidlo: varchar("CisloDomovniOrientacniSidlo", { length: 20 }),
  OborPece: varchar("OborPece", { length: 100 }),
  FormaPece: varchar("FormaPece", { length: 50 }),
  DruhPece: varchar("DruhPece", { length: 50 }),
  OdbornyZastupce: varchar("OdbornyZastupce", { length: 100 }),
  Lat: varchar("Lat", { length: 20 }),
  Lng: varchar("Lng", { length: 20 }),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`)
});

// Schema for resources - used to validate API requests
export const insertResourceSchema = createSelectSchema(resources)
  .extend({})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

// Type for resources - used to type API request params and within Components
export type NewResourceParams = z.infer<typeof insertResourceSchema>;
