import { Request, Response } from 'express';
import { getOneUser } from '../../controllers/user.controller';
import * as helpers from '../../helpers/helper.reusableFunctions';
import { mockUser } from '../mocks/mockUser'; 
import * as handleErrorModule from '../../helpers/helper.handleError'; 

describe('getOneUser Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock = jest.fn();
  let handleErrorMock = jest.fn(); //this is a Mock handleError

  beforeEach(() => {
    jsonMock.mockClear();
    handleErrorMock.mockClear(); // Clearing all mock calls before each test

    mockRes = {
      status: jest.fn(() => ({ json: jsonMock })) as any,
    };

    jest.spyOn(handleErrorModule, 'handleError').mockImplementation(handleErrorMock); 
  });

  it('should return a single user by email', () => {
    jest.spyOn(helpers, 'findUserByEmail').mockReturnValue(mockUser);

    mockReq = {
      params: { email: 'anish@gmail.com' }
    };

    getOneUser(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(mockUser);
  });

  it('should return 404 if user not found', () => {
    jest.spyOn(helpers, 'findUserByEmail').mockReturnValue(undefined);

    mockReq = {
      params: { email: 'notfounduser@gmail.com' }
    };

    getOneUser(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('should handle errors and call handleError()', () => {
    (mockRes.status as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Failed to get user by email');
    });

    getOneUser({} as Request, mockRes as Response);

    expect(handleErrorMock).toHaveBeenCalledWith(mockRes as Response);
  });
});
