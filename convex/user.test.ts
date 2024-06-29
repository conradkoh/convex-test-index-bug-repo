import { describe, it, expect } from 'vitest';
import schema from './schema';
import { convexTest } from 'convex-test';
import { api } from './_generated/api';

describe('list user by age', () => {
  it('should not return  users that have no age', async () => {
    const t = convexTest(schema);
    await t.mutation(api.user.create, { name: 'John' });
    const users = await t.query(api.user.list, { age: 10 });
    expect(users).toEqual([]);
  });
});
