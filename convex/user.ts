import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
export const create = mutation({
  args: {
    name: v.string(),
    age: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { name, age } = args;
    return ctx.db.insert('user', { name, age, timestamp: Date.now() });
  },
});

export const list = query({
  args: {
    age: v.number(),
  },
  handler: async (ctx, args) => {
    const { age } = args;
    const users = await ctx.db
      .query('user')
      .withIndex('by_age_timestamp', (f) => f.eq('age', age).gt('timestamp', 0))
      .collect();
    return users;
  },
});
