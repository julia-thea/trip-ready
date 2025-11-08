import app from '../../app.js'
import supertest from 'supertest'

const request = supertest

describe('Tests for index.js', () => {
    test('GET /', async () => {
        await request(app)
        .get('/')
        .expect(200)
    })

    test('GET /health', async () => {
        await request(app)
        .get('/health')
        .expect(200)
    })
  }
)