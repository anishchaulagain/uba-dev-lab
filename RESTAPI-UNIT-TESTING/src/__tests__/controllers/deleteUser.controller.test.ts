import request from 'supertest';
import app from '../../app';
import { users } from '../../data/users';
import * as userData from '../../data/users';
import * as handleErrorModule from '../../helpers/helper.handleError';

describe('Delete User Controller', () => {
  beforeEach(() => {
    users.push({ id: 1, name: 'Anish', email: 'anish@examplemail.com', salary: 60000 });
  });

  afterEach(() => {
    users.length = 0;
    jest.restoreAllMocks(); // clean up mocks after each test
  });

  it('should delete a user', async () => {
    const response = await request(app).delete('/users/anish@examplemail.com');
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/deleted successfully/i);
  });

  it('should return 404 for non-existent user', async () => {
    const response = await request(app).delete('/users/nouser@examplemail.com');
    expect(response.status).toBe(404);
  });

  it('should handle internal server error on delete', async () => {
    jest.spyOn(userData.users, 'findIndex').mockImplementation(() => {
      throw new Error('Failed to delete user');
    });

    const handleErrorSpy = jest
      .spyOn(handleErrorModule, 'handleError')
      .mockImplementation((res) => {
        res.status(500).json({ message: 'Internal Server Error' });
        return res;
      });

    const response = await request(app).delete('/users/anish@examplemail.com');

    expect(handleErrorSpy).toHaveBeenCalled();
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });
});
