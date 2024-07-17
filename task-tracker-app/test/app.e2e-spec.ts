import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dbConnection = moduleFixture.get(getConnectionToken());
  });

  beforeEach(async () => {
    const collections = await dbConnection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    await dbConnection.close();
    await app.close();
  });

  it('/auth/signup-user (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signup-user')
      .send({ username: 'shivam', password: '1234' })
      .expect(201);

    expect(response.body).toMatchObject({
      statusCode: 201,
      message: 'User created successfully',
      user: expect.any(Object),
    });
  });

  it('/auth/login-user (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup-user')
      .send({ username: 'shivam', password: '1234' })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/auth/login-user')
      .send({ username: 'shivam', password: '1234' })
      .expect(201); // Expect 201 OK for successful login

    expect(response.body).toHaveProperty('token');
  });

  it('/tasks/create (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup-user')
      .send({ username: 'shivam', password: '1234' })
      .expect(201);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login-user')
      .send({ username: 'shivam', password: '1234' })
      .expect(201); // Expect 200 OK for successful login

    const token = loginResponse.body.token;

    const response = await request(app.getHttpServer())
      .post('/tasks/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', description: 'Test Task Description' })
      .expect(201); // Expect 201 Created for successful task creation

    expect(response.body).toMatchObject({
      statusCode: 201,
      message: 'Task created successfully',
      task: expect.any(Object),
    });
  });

  it('/tasks (GET)', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup-user')
      .send({ username: 'shivam', password: '1234' })
      .expect(201);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login-user')
      .send({ username: 'shivam', password: '1234' })
      .expect(201); // Expect 200 OK for successful login

    const token = loginResponse.body.token;

    // Create a task
    await request(app.getHttpServer())
      .post('/tasks/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', description: 'Test Task Description' })
      .expect(201);

    // Retrieve tasks
    const response = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200); // Expect 200 OK to retrieve tasks

    expect(response.body).toHaveProperty('tasks');
  });
});
