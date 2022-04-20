const { app } = require('./app')
const supertest = require('supertest')

describe('server', () => {

  it('/login should respond 200 for new creds', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({
        username: 'test',
        password: 'test'
      })

    expect(res.status).toBe(200)
    expect(res.body.token).toEqual(expect.any(String))
  })

  it('/login should respond 400 for created user, new password', async () => {
    const agent = supertest(app)
    const res = await agent
      .post('/login')
      .send({
        username: 'test',
        password: 'test'
      })

    expect(res.status).toBe(200)
    expect(res.body.token).toEqual(expect.any(String))

    const res2 = await agent
      .post('/login')
      .send({
        username: 'test',
        password: 'testA'
      })

    expect(res2.status).toBe(401)
    expect(res2.body).toEqual({
      error: 'invalid credentials'
    })
  })

  it('/login token should allow access to /me', async () => {
    const agent = supertest(app)

    const res = await agent
      .post('/login')
      .send({
        username: 'test',
        password: 'test'
      })

    expect(res.status).toBe(200)

    const res2 = await agent
      .get('/me')
      .set('authorization', `Bearer ${res.body.token}`)

    expect(res2.status).toBe(200)
    expect(res2.body.name).toEqual(expect.any(String))
  })

  it('should respond 401 for /me not logged in user', async () => {
    const res = await supertest(app).get('/me')
    expect(res.status).toBe(403)
    expect(res.body).toEqual({
      error: 'please authorise first'
    })
  })

  it('should respond 400 for /me invalid token', async () => {
    const res = await supertest(app).get('/me')
      .set('Authorization', 'invalid')
    expect(res.status).toBe(401)
    expect(res.body).toEqual({
      error: 'invalid token'
    })
  })

})