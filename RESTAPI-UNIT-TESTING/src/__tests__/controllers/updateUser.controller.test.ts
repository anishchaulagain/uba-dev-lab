import request from 'supertest';
import app from '../../app';
import { users } from '../../data/users';
import * as userData from '../../data/users';
import * as handleErrorModule from '../../helpers/helper.handleError';

describe('Update User', () => {
  beforeEach(() => {
    users.push({ id: 1, name: 'Anish', email: 'anish@examplemail.com', salary: 40000 });
  });

  afterEach(() => {
    users.length = 0;
    jest.restoreAllMocks(); //reseting all the mocks
  });

  it('should update user details', async () => {
    const response = await request(app)
      .put('/users/anish@examplemail.com')
      .send({ name: 'Anish Updated', salary: 60000 });

    expect(response.status).toBe(200);
    expect(response.body.user.salary).toBe(50000);
  });

  it('should return 404 if user does not exist', async () => {
    const response = await request(app)
      .put('/users/nouserexist@examplemail.com')
      .send({ name: 'No User' });

    expect(response.status).toBe(404);  //404 status code as user doesn't exist
  });

  it('should handle internal server error on update', async () => {
    jest.spyOn(userData.users, 'findIndex').mockImplementation(() => {
      throw new Error('Failed to update user');   //Replacing findIndex with mock that throws error
    });

    const handleErrorSpy = jest
      .spyOn(handleErrorModule, 'handleError')
      .mockImplementation((res) => {
        res.status(500).json({ message: 'Internal Server Error' });
        return res;
      });

    const response = await request(app)
      .put('/users/anish@examplemail.com')
      .send({ name: 'Should Fail' });   
     //assertions
    expect(handleErrorSpy).toHaveBeenCalled();  //Because of the mocked error in findIndex, the operation will fail internally and trigger the mocked handleError.
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });
});
