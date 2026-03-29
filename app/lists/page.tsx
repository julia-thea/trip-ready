/**
 * Lists Page Component
 * 
 * Displays all packing lists with their items in a two-column layout.
 * Left column: List of all lists with their items
 * Right column: Form to create a new list
 * 
 * Component Type: Server Component
 * - No 'use client' directive = Server Component
 * - Can directly query database with Prisma (no API route needed)
 * - Renders on server, sent as HTML to client
 * - Better performance (no client-side data fetching)
 * 
 * Data Fetching:
 * - Uses Prisma to query database directly
 * - Includes related items using Prisma's include feature
 * - No API route needed (Server Component pattern)
 * 
 * Layout:
 * - Two-column grid: lists on left, create form on right
 * - Each list is a card showing title, items, and packed status
 * - Lists link to detail pages (/lists/[id])
 */
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import CreateListForm from '../components/CreateListForm';
import ListRow from '../components/ListRow';

/**
 * ListsPage Component
 * 
 * Fetches all lists with their items and displays them.
 * 
 * @returns JSX for the lists page
 */
export default async function ListsPage() {
  /**
   * Prisma Query: Fetch All Lists with Items
   * 
   * Uses Prisma's include feature to perform a JOIN query.
   * This fetches lists and their related items in a single database query.
   * 
   * include: { items: true }
   * - Performs SQL JOIN to get items for each list
   * - Avoids N+1 query problem (one query instead of one per list)
   * - Items are nested in list.items array
   * 
   * Result Structure:
   * [
   *   {
   *     id: "...",
   *     title: "...",
   *     items: [
   *       { id: "...", name: "...", packed: true, ... },
   *       ...
   *     ]
   *   },
   *   ...
   * ]
   */
  const lists = await prisma.list.findMany({
    include: {
      items: true, // This fetches items for each list
    },
  });

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      {/* Global Navigation */}
      <Navbar />

      <main className='max-w-4xl mx-auto px-8 py-12'>
        <h1 className='text-3xl font-bold text-navy mb-2'>Lists</h1>

        {/* Two-Column Layout: Lists on Left, Create Form on Right */}
        <div className='grid grid-cols-2 gap-8'>
          {/* Left Column: List of All Lists */}
          <div className='space-y-4'>
            {lists.length === 0 ? (
              <p className='text-sm text-steel'>No lists yet</p>
            ) : (
              lists.map((list) => (
                <ListRow key={list.id} list={list} />
              ))
            )}
          </div>

          {/* Right Column: Create New List Form */}
          <div>
            {/* CreateListForm is a Client Component (uses useActionState) */}
            <CreateListForm />
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Learning Reference: Evolution of This Component
 * 
 * This commented code shows the evolution from Client Component to Server Component.
 * 
 * Approach 1: Client Component with API Route
 * - Component marked with 'use client'
 * - Uses fetch() to call /api/lists endpoint
 * - API route queries database
 * - More network requests, slower
 * 
 * Approach 2: Server Component with Direct Prisma (Current)
 * - No 'use client' directive
 * - Directly queries database with Prisma
 * - No API route needed
 * - Faster, better performance
 * 
 * Why Server Component is Better:
 * - Renders on server (faster initial load)
 * - No client-side JavaScript needed for data fetching
 * - Better SEO (content in HTML)
 * - Simpler code (no API route needed)
 */
