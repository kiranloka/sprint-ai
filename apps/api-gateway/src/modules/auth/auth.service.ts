import { Register, Login } from '@repo/shared-types';
import { prisma, User } from '@repo/db';

export class AuthService {
  constructor() {}

  async register(data: Register) {
    const { email, password } = data; // Note: 'username' was in your code but not in 'Register' schema (which has 'name')

    const user: User = await prisma.user.create({
      data: {
        email,
        hashedPassword: password,
        name: data.name, // Assuming 'name' maps to 'name'
      },
    });
    return user;
  }
}
