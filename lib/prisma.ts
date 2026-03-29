/**
 * Prisma Client Singleton
 * 
 * This file implements a singleton pattern for Prisma Client to prevent
 * "too many database connections" errors in development.
 * 
 * Problem It Solves:
 * - In development, Next.js hot-reloads modules on file changes
 * - Each reload creates a new PrismaClient instance
 * - Each instance opens a new database connection
 * - Eventually you hit PostgreSQL's connection limit
 * 
 * Solution:
 * - Store PrismaClient instance in globalThis (global object)
 * - Reuse the same instance across hot-reloads
 * - Only create new instance if one doesn't exist
 * 
 * How It Works:
 * 1. Check if PrismaClient already exists in globalThis
 * 2. If yes, reuse it (development hot-reload scenario)
 * 3. If no, create new instance (first load or production)
 * 4. Store instance in globalThis for future reuse (development only)
 * 
 * Usage:
 * ```typescript
 * import { prisma } from '@/lib/prisma';
 * const users = await prisma.user.findMany();
 * ```
 * 
 * Important:
 * - Always import from this file, never create new PrismaClient() directly
 * - In production, Next.js doesn't hot-reload, so singleton isn't critical
 * - But it's still good practice to use this pattern everywhere
 */
import { PrismaClient } from '../app/generated/prisma';

/**
 * Type-safe access to globalThis for storing PrismaClient
 * 
 * globalThis is the global object (works in Node.js, browser, etc.)
 * We cast it to have a prisma property to store our singleton instance.
 * 
 * Why globalThis instead of global?
 * - globalThis works in all JavaScript environments
 * - global is Node.js specific
 * - More portable and future-proof
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/**
 * Prisma Client Singleton Instance
 * 
 * This is the single PrismaClient instance used throughout the application.
 * 
 * Logic:
 * - If globalThis.prisma exists → reuse it (development hot-reload)
 * - If globalThis.prisma doesn't exist → create new instance (first load)
 * 
 * This ensures we never create multiple PrismaClient instances,
 * preventing database connection pool exhaustion.
 */
export const prisma = globalForPrisma.prisma || new PrismaClient();

/**
 * Store Instance in globalThis (Development Only)
 * 
 * In development, Next.js hot-reloads modules when files change.
 * This would normally create a new PrismaClient on each reload.
 * 
 * By storing the instance in globalThis, we preserve it across hot-reloads:
 * - First module load: Creates PrismaClient, stores in globalThis
 * - Hot-reload: Module reloads, but globalThis.prisma still exists
 * - Next line: Reuses existing instance instead of creating new one
 * 
 * Why only in development?
 * - Production doesn't hot-reload, so no need to store in globalThis
 * - Keeps production code cleaner (no global state)
 * - Development is where the connection limit issue occurs
 */
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

