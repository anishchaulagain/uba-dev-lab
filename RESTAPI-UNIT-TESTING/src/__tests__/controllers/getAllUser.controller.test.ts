import { Request, Response } from 'express';
import { getAllUser } from '../../controllers/user.controller';
import { users } from '../../data/users';
import { mockUser } from '../mocks/mockUser';
import * as handleErrorModule from '../../helpers/helper.handleError';

describe('getAllUser Controller', () => {
  let jsonMock = jest.fn();
  let statusMock = jest.fn(() => ({ json: jsonMock }));
  let mockRes: Partial<Response>;
  let handleErrorMock = jest.fn();

  beforeEach(() => {   //to clear all mocks
    users.length = 0;
    users.push(mockUser);
    jsonMock.mockClear();
    statusMock.mockClear();
    handleErrorMock.mockClear();

    mockRes = {
      status: statusMock as any,
    };

    jest.spyOn(handleErrorModule, 'handleError').mockImplementation(handleErrorMock);
  });

  it('should return all users', () => {
    getAllUser({} as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(users);
  });

  it('should handle errors and call handleError()', () => {
    (mockRes.status as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Failed to get all user data');
    });

    getAllUser({} as Request, mockRes as Response);
    //assertions
    expect(handleErrorMock).toHaveBeenCalledWith(mockRes as Response);
  });
});
