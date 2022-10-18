import request from "supertest";
import color from "colors";
import dotenv from "dotenv";

import app from './app.js';
import {
    mongoConnect,
    mongoDisconnect
} from './services/mongo.js';

dotenv.config();
jest.setTimeout(5000);

describe('Welcome API', () => {
    beforeAll(async () => {
        mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect()
    });

    describe("Welcome to Sami HMS", () => {
        test('It should respond with 200 and welcome message'.green, async () => {
            const {body} = await request(app)
                .get('/api/v1/')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(body.message).toStrictEqual('Welcome to Sami Hospital Managment System!');
        });
    });
});