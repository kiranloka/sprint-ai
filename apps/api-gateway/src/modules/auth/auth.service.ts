import { Register, Login } from '@repo/shared-types';
import { prisma } from '@repo/db';
import { encryptPassword, decryptPassword } from 'src/common/crypto/encrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor() {}

  async register(data: Register) {
    const { email, password, name } = data;

    const hashedPassword = await encryptPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword: hashedPassword,
        name: name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    jwt.sign({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return user;
  }

  async login(data: Login) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('User with the given credentials not found!');
    }

    const isPasswordMatched = await decryptPassword(
      password,
      user.hashedPassword,
    );

    if (!isPasswordMatched) {
      throw new Error('User with the given credentials not found!');
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      user,
      token,
    };
  }
}
