import { PrismaClient } from '../../../generated/prisma';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const res = await request.json();

    // Validation
    if (!res.email || !res.password) {
      return Response.json({ error: 'Email and password is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: res.email },
    });

    if (user) {
      return Response.json({ error: 'User already exists' }, { status: 400 });
    } else {
      const hashedPassword = await bcrypt.hash(res.password, 10);

      const user = await prisma.user.create({
        data: {
          email: res.email,
          password: hashedPassword,
        },
      });
    }

    return Response.json({ message: 'User created' }, { status: 201 });
  } catch {
    return Response.json({ error: 'Signup failed' }, { status: 500 });
  }
}
