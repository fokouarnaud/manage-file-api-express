/* eslint-env jest */
const supertest = require('supertest');
const server = require('./index');

const requestWithSupertest = supertest(server);

describe('Documents API', () => {
  it('GET /documents --> array documents', async () => {
    const res = await requestWithSupertest.get('/documents');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('data');
  });

  it('GET /documents/id --> specific document by ID', async () => {
    const res = await requestWithSupertest.get('/documents/3');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });

  it('POST /documents --> created documents', () => {

  });

  it('PUT /documents/id --> updated specific document by ID ', () => {

  });
});
