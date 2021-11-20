import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import appRouter from '../routes';
import App from '../app';
import CarModel from '../models/car.model';
import { Car } from '../schemas/types';
import { MOCK_DATA } from './cars.mock';
import { dbName, dbPort } from '../configs/db.config';

describe('cars', () => {
  let app: Express.Application;

  beforeAll(async () => {
    await MongoMemoryServer.create({ instance: { port: dbPort, dbName } });

    app = new App(appRouter).app;
  });

  beforeEach(async () => {
    await resetDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('GET /cars', () => {
    describe('get all cars', () => {
      it('should return a 200 and empty array given db is empty', async () => {
        const expectedStatus = 200;
        const expectedBody = [];

        // when
        await supertest(app).get(`/cars`).expect(expectedStatus, expectedBody);
      });

      it('should return a 200 and available records given db is not empty', async () => {
        // given
        insertRecords([MOCK_DATA[0], MOCK_DATA[1]]);

        const expectedStatusCode = 200;
        const expectedBody = [MOCK_DATA[0], MOCK_DATA[1]];

        // when
        const { statusCode: actualStatusCode, body } = await supertest(app).get(`/cars`);
        const actualBody = body.map((car) => stripExtraMongoProperties(car));

        // then
        expect(actualStatusCode).toBe(expectedStatusCode);
        expect(actualBody).toEqual(expectedBody);
      });
    });
  });

  describe('GET /cars/:carId', () => {
    describe('get one car', () => {
      it('should return a 404 given id is not found', async () => {
        const carId = new mongoose.Types.ObjectId().toString();
        const expectedStatus = 404;
        const expectedBody = { message: `Car not found with id ${carId}` };

        // given
        insertRecords([MOCK_DATA[1], MOCK_DATA[2]]);

        // when
        const { statusCode: actualStatusCode, body: actualBody } = await supertest(app).get(`/cars/${carId}`);

        // then
        expect(actualStatusCode).toBe(expectedStatus);
        expect(actualBody).toEqual(expectedBody);
      });

      it('should return a 200 and car given there is a matching id', async () => {
        const carId = MOCK_DATA[2]._id;
        const expectedStatusCode = 200;
        const expectedBody = MOCK_DATA[2];

        // given
        insertRecords([MOCK_DATA[1], MOCK_DATA[2]]);

        // when
        const { statusCode: actualStatusCode, body } = await supertest(app).get(`/cars/${carId}`);
        const actualBody = stripExtraMongoProperties(body);

        // then
        expect(actualStatusCode).toBe(expectedStatusCode);
        expect(actualBody).toEqual(expectedBody);
      });
    });
  });

  describe('POST /cars', () => {
    describe('insert one car', () => {
      it('should return a 201 and the inserted car', async () => {
        const { _id, ...mockCarWithoutId } = MOCK_DATA[2]; // eslint-disable-line @typescript-eslint/no-unused-vars
        const expectedStatus = 201;
        const expectedBody = mockCarWithoutId;

        // when
        const { statusCode: actualStatusCode, body } = await supertest(app).post(`/cars`).send(mockCarWithoutId);
        const actualBody = stripExtraMongoProperties(body, true);

        // then
        expect(actualStatusCode).toBe(expectedStatus);
        expect(actualBody).toEqual(expectedBody);
      });

      it('should return a 201 and the inserted car given inserting a car without a not required property', async () => {
        const { _id, countryOfOrigin, ...mockCarWithoutCountry } = MOCK_DATA[2]; // eslint-disable-line @typescript-eslint/no-unused-vars
        const expectedStatus = 201;
        const expectedBody = mockCarWithoutCountry;

        // when
        const { statusCode: actualStatusCode, body } = await supertest(app).post(`/cars`).send(mockCarWithoutCountry);
        const actualBody = stripExtraMongoProperties(body, true);

        // then
        expect(actualStatusCode).toBe(expectedStatus);
        expect(actualBody).toEqual(expectedBody);
      });

      it('should return a 400 when inserting car with additional properties', async () => {
        const expectedStatus = 400;
        const expectedBody = { message: 'must NOT have additional properties' };

        // when
        const { statusCode: actualStatusCode, body: actualBody } = await supertest(app)
          .post(`/cars`)
          .send(MOCK_DATA[2]);

        // then
        expect(actualStatusCode).toBe(expectedStatus);
        expect(actualBody).toEqual(expectedBody);
      });

      it('should return a 400 when inserting car with missing required property (brand)', async () => {
        const { _id, brand, ...mockCarWithoutRequiredProperty } = MOCK_DATA[2]; // eslint-disable-line @typescript-eslint/no-unused-vars
        const expectedStatus = 400;
        const expectedBody = { message: "must have required property 'brand'" };

        // when
        const { statusCode: actualStatusCode, body: actualBody } = await supertest(app)
          .post(`/cars`)
          .send(mockCarWithoutRequiredProperty);

        // then
        expect(actualStatusCode).toBe(expectedStatus);
        expect(actualBody).toEqual(expectedBody);
      });
    });
  });

  describe('PUT /cars/:carId', () => {
    describe('update a car', () => {
      it('should return a 200 and the updated car', async () => {
        // given
        insertRecords([MOCK_DATA[0], MOCK_DATA[1], MOCK_DATA[2]]);

        const expectedStatus = 200;
        const { _id, ...mockCarWithoutId } = MOCK_DATA[2];
        const updatedBrand = `updated ${mockCarWithoutId.brand}`;
        mockCarWithoutId.brand = updatedBrand;
        const expectedBody = mockCarWithoutId;

        // when
        const { statusCode: actualStatusCode, body } = await supertest(app)
          .put(`/cars/${_id}`)
          .send({ brand: updatedBrand });
        const actualBody = stripExtraMongoProperties(body, true);

        // then
        expect(actualStatusCode).toBe(expectedStatus);
        expect(actualBody).toEqual(expectedBody);
      });

      it('should return a 404 given updating a car that does not exist', async () => {
        const carId = new mongoose.Types.ObjectId().toString();
        const expectedStatus = 404;
        const expectedBody = { message: `Car not found with id ${carId}` };

        // given
        insertRecords([MOCK_DATA[0], MOCK_DATA[1], MOCK_DATA[2]]);

        // when
        const { statusCode: actualStatusCode, body } = await supertest(app)
          .put(`/cars/${carId}`)
          .send({ brand: 'updatedBrand' });
        const actualBody = stripExtraMongoProperties(body, true);

        // then
        expect(actualStatusCode).toBe(expectedStatus);
        expect(actualBody).toEqual(expectedBody);
      });

      it('should return a 400 when updating a car with additional properties', async () => {
        const expectedStatus = 400;
        const expectedBody = { message: 'must NOT have additional properties' };

        // given
        insertRecords([MOCK_DATA[0], MOCK_DATA[1], MOCK_DATA[2]]);

        // when
        const { statusCode: actualStatusCode, body: actualBody } = await supertest(app)
          .put(`/cars/${MOCK_DATA[2]._id}`)
          .send({ additionalProperty: 'testValue' });

        // then
        expect(actualStatusCode).toBe(expectedStatus);
        expect(actualBody).toEqual(expectedBody);
      });
    });
  });

  describe('DELETE /cars/:carId', () => {
    describe('delete a car', () => {
      it('should return a 200 and the successful message', async () => {
        // given
        insertRecords([MOCK_DATA[0], MOCK_DATA[1], MOCK_DATA[2]]);

        const expectedStatus = 200;
        const expectedBody = { message: 'Car deleted successfully!' };

        // when
        const { statusCode: actualStatusCode, body: actualBody } = await supertest(app).delete(
          `/cars/${MOCK_DATA[0]._id}`
        );

        // then
        expect(actualStatusCode).toBe(expectedStatus);
        expect(actualBody).toEqual(expectedBody);
      });

      it('should return a 404 given deleting a car that does not exist', async () => {
        const carId = new mongoose.Types.ObjectId().toString();
        const expectedStatus = 404;
        const expectedBody = { message: `Car not found with id ${carId}` };

        // given
        insertRecords([MOCK_DATA[0], MOCK_DATA[1], MOCK_DATA[2]]);

        // when
        const { statusCode: actualStatusCode, body: actualBody } = await supertest(app).delete(`/cars/${carId}`);

        // then
        expect(actualStatusCode).toBe(expectedStatus);
        expect(actualBody).toEqual(expectedBody);
      });
    });
  });

  async function resetDB() {
    await CarModel.deleteMany();
  }

  async function insertRecords(records: (mongoose.AnyObject | mongoose.AnyKeys<Car>)[]) {
    await CarModel.insertMany(records);
  }

  function stripExtraMongoProperties(record, removeId = false) {
    const { __v, createdAt, updatedAt, ...recordWithId } = record; // eslint-disable-line @typescript-eslint/no-unused-vars
    const { _id, ...recordWithoutId } = recordWithId; // eslint-disable-line @typescript-eslint/no-unused-vars

    return removeId === true ? recordWithoutId : recordWithId;
  }
});
