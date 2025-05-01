export interface UserType {
  email: string;
  name: string;
  age: number;
}

export interface CreateUserInput {
  email: string;
  name: string;
  age: string | number;
}

export interface UpdateUserInput {
  name?: string;
  age?: string | number;
}
export interface UserResponse {
  message: string;
  user: UserType | null;
}
