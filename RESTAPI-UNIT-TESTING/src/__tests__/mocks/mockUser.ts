import { User } from '../../utils/user.type';

export const mockUser: User = {
  id: 1,
  name: 'First Mock User',
  email: 'mockuser@example.com',
  salary: 15000
};

export const anotherMockUser: User = {
  id: 2,
  name: 'Second Mock User',
  email: 'another@example.com',
  salary: 20000
};

export const mockUserList: User[] = [mockUser, anotherMockUser];
