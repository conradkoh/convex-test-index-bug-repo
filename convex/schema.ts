import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  user: defineTable({
    timestamp: v.number(),
    name: v.string(),
    age: v.optional(v.number()),
  }).index('by_age_timestamp', ['age', 'timestamp']),
});
