/** @type { import("drizzle-kit").Config} */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_CTYJ4ARu8doZ@ep-winter-term-a824d5in-pooler.eastus2.azure.neon.tech/cliply-db?sslmode=require',
    }
};