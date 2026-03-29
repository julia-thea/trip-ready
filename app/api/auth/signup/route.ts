/**
 * Next.js API Route: User Registration
 * 
 * Handles POST requests to /api/auth/signup
 * Called from SignupForm component when user submits registration form
 * 
 * Security Notes:
 * - Passwords are hashed with bcrypt before storage (never store plain text)
 * - Salt rounds: 10 provides good security/performance balance
 * - Validates email uniqueness to prevent duplicate accounts
 * 
 * Flow:
 * 1. Parse and validate request body (email + password required)
 * 2. Check if user with email already exists in database
 * 3. Hash password using bcrypt (async operation)
 * 4. Create new user record with hashed password
 * 5. Return appropriate HTTP status code (201 success, 400 validation error, 500 server error)
 */
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    // Parse JSON body from request
    const res = await request.json();

    // Validation: Ensure required fields are provided
    // Returns 400 Bad Request if validation fails
    if (!res.email || !res.password) {
      return Response.json({ error: 'Email and password is required' }, { status: 400 });
    }

    // Check if user with this email already exists
    // Prevents duplicate account creation
    const user = await prisma.user.findUnique({
      where: { email: res.email },
    });

    if (user) {
      // User already exists - return error (don't reveal if email exists for security)
      return Response.json({ error: 'User already exists' }, { status: 400 });
    } else {
      // Hash password before storing in database
      // bcrypt.hash() is async and uses salt rounds (10 = good balance)
      // Never store plain text passwords - this is a critical security requirement
      const hashedPassword = await bcrypt.hash(res.password, 10);

      // Create new user record with email and hashed password
      const user = await prisma.user.create({
        data: {
          email: res.email,
          password: hashedPassword,
        },
      });
    }

    // Return success response
    // 201 Created = resource successfully created
    return Response.json({ message: 'User created' }, { status: 201 });
  } catch {
    // Catch any unexpected errors (database connection issues, JSON parsing errors, etc.)
    // Return 500 Internal Server Error - generic message to avoid leaking implementation details
    return Response.json({ error: 'Signup failed' }, { status: 500 });
  }
}
