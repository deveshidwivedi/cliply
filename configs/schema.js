import { json, integer } from "drizzle-orm/pg-core";
import { pgTable, varchar, serial, boolean } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageUrl: varchar('imageUrl'),
    subscription:boolean('subscription').default(false),
    credits: integer('credits').default(40), //40 credits= 4 videos
})

export const VideoData = pgTable("video_data", {
    id: serial("id").primaryKey(),
    script: json("script").notNull(),
    audioFileUrl: varchar("audio_file_url", { length: 255 }).notNull(),
    captions: json("captions").notNull(),
    imageList: varchar("image_list", { length: 255 }).array().notNull(),
    createdBy: varchar("created_by", { length: 255 }).notNull(),
});