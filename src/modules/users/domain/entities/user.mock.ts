import { Role, User } from "./user";

export const MockUser: User = {
  id: '1234567890',
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'hashedpassword123',
  role: Role.USER,
};