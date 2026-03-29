/**
 * Next.js API Route: Get All Items
 * 
 * Handles GET requests to /api/items
 * Returns all items from the database with their associated list information
 * 
 * When to Use:
 * - External API access (mobile apps, third-party integrations)
 * - Client Components that need to fetch data client-side
 * - Note: If using Server Components, prefer direct Prisma queries instead
 * 
 * Prisma Query:
 * - findMany() fetches all items (no filtering)
 * - include: { list: true } performs a SQL JOIN to get related list data
 * - This is a one-to-many relationship: one list has many items
 * 
 * Response Format:
 * Array of item objects, each containing:
 * - Item fields: id, name, quantity, packed, createdAt, updatedAt, listId
 * - Nested list object: { id, title, createdAt, updatedAt, userId }
 * 
 * HTTP Status: 200 OK (implicit)
 */
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  // Fetch all items from database using Prisma
  // include: { list: true } eagerly loads the related list data
  // This avoids N+1 query problem (one query instead of one per item)
  const item = await prisma.item.findMany({
    include: {
      list: true,
    },
  });
  
  // Return JSON response with items array
  // Response.json() automatically sets Content-Type: application/json
  // Status code 200 OK is implicit (successful GET request)
  return Response.json(item);
}
