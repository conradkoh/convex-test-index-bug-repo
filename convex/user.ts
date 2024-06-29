import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
export const create = mutation({
  args: {
    name: v.string(),
    age: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { name, age } = args;
    let add_info = undefined;
    if (age !== undefined) {
      add_info = { age };
    }
    return ctx.db.insert('user', {
      name,
      type: 'without_age',
      timestamp: Date.now(),
    });
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
      .withIndex('by_age_timestamp', (f) =>
        f.eq('add_info.age', age).gt('timestamp', 0)
      )
      .collect();
    return users;
  },
});
