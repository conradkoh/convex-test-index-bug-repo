import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  user: defineTable({
    timestamp: v.number(),
    name: v.string(),
    add_info: v.optional(
      v.object({
        age: v.number(),
      })
    ),
  }).index('by_age_timestamp', ['add_info.age', 'timestamp']),
});
