import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  user: defineTable(
    v.union(
      v.object({
        timestamp: v.number(),
        type: v.literal('without_age'),
        name: v.string(),
      }),
      v.object({
        timestamp: v.number(),
        type: v.literal('with_age'),
        name: v.string(),
        add_info: v.object({
          age: v.number(),
        }),
      })
    )
  ).index('by_age_timestamp', ['add_info.age', 'timestamp']),
});
