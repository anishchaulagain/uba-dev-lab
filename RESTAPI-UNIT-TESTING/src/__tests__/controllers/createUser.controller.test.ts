import request from 'supertest';
import app from '../../app';
import { users } from '../../data/users';
import * as userData from '../../data/users';
import * as handleErrorModule from '../../helpers/helper.handleError';

describe('Create User Controller', () => {
    beforeEach(() => {
        users.length = 0;
    });

    afterEach(() => {
        jest.restoreAllMocks(); //this to clean up all mocks
    });

    it('should create a user successfully', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'Anish', email: 'anish@examplemail.com', salary: 50000 });

        expect(response.status).toBe(201);
        expect(response.body.user.name).toBe('Anish');
    });

    it('should not allow duplicate email', async () => {
        await request(app)
            .post('/users')
            .send({ name: 'Test User1', email: 'test@examplemail.com', salary: 30000 });

        const response = await request(app)
            .post('/users')
            .send({ name: 'Test User2', email: 'test@examplemail.com', salary: 20000 });

        expect(response.status).toBe(409);
        expect(response.body.message).toMatch(/already exists/i);
    });

    it('should handle missing fields and trigger validation error', async () => {
        const response = await request(app)
            .post('/users')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Validation error');  //testing validation error passing empty object
        expect(response.body.errors).toBeDefined();
    });

    it('should handle internal server error during user creation', async () => {

        jest.spyOn(userData.users, 'push').mockImplementation(() => {
            throw new Error('Failed to insert user data');
        });

        const handleErrorSpy = jest
            .spyOn(handleErrorModule, 'handleError')
            .mockImplementation((res) => {
                res.status(500).json({ message: 'Internal Server Error' });
                return res;
            });

        const response = await request(app)
            .post('/users')
            .send({ name: 'Crash', email: 'crash@examplemail.com', salary: 10000 });

            //assertions
        expect(handleErrorSpy).toHaveBeenCalled();   
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal Server Error');
    });
});