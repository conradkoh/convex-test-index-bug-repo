import { describe, it, expect } from 'vitest';
import schema from './schema';
import { convexTest } from 'convex-test';
import { api } from './_generated/api';

describe('list user by age', () => {
  const createUserParams = { name: 'John ' };
  const queryParams = { age: 10 };
  it('local: should not return users that have no age', async () => {
    const t = convexTest(schema);
    await t.mutation(api.user.create, createUserParams);
    const users = await t.query(api.user.list, queryParams);
    expect(users).toEqual([]);
  });

  it('remote: should not return users that have no age', async () => {
    const deploymentURL = 'https://diligent-lemur-977.convex.cloud';
    // reset
    await fetch(`${deploymentURL}/api/mutation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'path': 'user:reset',
        'args': {},
        'format': 'json',
      }),
    });

    // create user
    await fetch(`${deploymentURL}/api/mutation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'path': 'user:create',
        'args': createUserParams,
        'format': 'json',
      }),
    });

    const res = await fetch(`${deploymentURL}/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'path': 'user:list',
        'args': queryParams,
        'format': 'json',
      }),
    });
    const resBody = await res.json();
    const users = resBody.value;

    expect(users).toEqual([]);
  });
});
