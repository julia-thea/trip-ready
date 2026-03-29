/**
 * Next.js API Route: Lists Management
 * 
 * Handles GET and POST requests to /api/lists
 * 
 * GET /api/lists:
 * - Returns all lists from the database
 * - No filtering or pagination (returns all lists)
 * 
 * POST /api/lists:
 * - Creates a new packing list
 * - Requires: title (string), optional: userId (string)
 * - Validates title is not empty
 * 
 * When to Use:
 * - External API access (mobile apps, third-party integrations)
 * - Client Components that need to fetch data client-side
 * - Note: If using Server Components, prefer direct Prisma queries
 * - Note: For form submissions, Server Actions (app/actions/lists.ts) are preferred
 * 
 * HTTP Status Codes:
 * - 200 OK: Successful GET request
 * - 201 Created: Successful POST request (list created)
 * - 400 Bad Request: Validation error (missing/invalid title)
 * - 500 Internal Server Error: Database or server error
 */
import { prisma } from '@/lib/prisma';

/**
 * GET Handler: Fetch All Lists
 * 
 * Returns all lists in the database without any filtering.
 * Consider adding pagination or filtering if the number of lists grows large.
 */
export async function GET(request: Request) {
  // Fetch all lists from database
  // No include needed - just returning basic list data
  const lists = await prisma.list.findMany();
  
  // Return JSON response with lists array
  // Status code 200 OK is implicit
  return Response.json(lists);
}

/**
 * POST Handler: Create New List
 * 
 * Creates a new packing list with the provided title.
 * userId is optional - can be null for unauthenticated lists (if your schema allows).
 */
export async function POST(request: Request) {
  try {
    // Parse JSON body from request
    const res = await request.json();

    // Validation: Ensure title is provided and not empty
    // Returns 400 Bad Request if validation fails
    if (!res.title || res.title.trim() === '') {
      return Response.json({ error: 'Title is required' }, { status: 400 });
    }

    // Create new list in database
    // userId can be null if not provided (optional field in schema)
    const list = await prisma.list.create({
      data: {
        title: res.title,
        userId: res.userId,
      },
    });

    // Return success response with created list data
    // 201 Created = resource successfully created
    return Response.json(list, { status: 201 });
  } catch (error) {
    // Catch any unexpected errors (database connection issues, constraint violations, etc.)
    // Return generic error message to avoid leaking implementation details
    return Response.json({ error: 'Failed to create list' }, { status: 500 });
  }
}
