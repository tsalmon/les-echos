import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { UsersModule } from "../../src/users/users.module";
import { SignUpDto } from "../../src/users/authentication/dto/sign-up.dto";
import { SignInDto } from "../../src/users/authentication/dto/sign-in.dto";

describe('[Feature] authentication - /authentication', () => {
  const user = {
    nickname: 'cdupont',
    name: 'Charles Dupont',
    address: 'Paris 11, France',
    comment: 'Développeur React',
    password: '_motdepasse$MotDePasse!',
    role: 'user',
  };
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
  });

  it('Sign Up [POST /]', async () => {
    return request(app.getHttpServer())
      .post('/authentication/sign-up')
      .send(user as SignUpDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedUser = expect.objectContaining({});
        expect(body).toEqual({ expectedUser });
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
