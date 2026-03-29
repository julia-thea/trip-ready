/**
 * Create List Page Component
 * 
 * Dedicated page for creating a new packing list.
 * This is a simple wrapper around the CreateListForm component.
 * 
 * Component Type: Server Component
 * - No 'use client' directive = Server Component
 * - Renders on server, sent as HTML to client
 * - CreateListForm is a Client Component (handles form state)
 * 
 * Note: CreateListForm is also used on /lists page (right column).
 * This page provides a dedicated route for list creation.
 * 
 * Route: /create-list
 * - Accessible via navigation or direct URL
 * - Protected by middleware.ts (requires authentication)
 */
import CreateListForm from '../components/CreateListForm';

import React from 'react'

/**
 * CreateListPage Component
 * 
 * Simple page wrapper that renders the CreateListForm component.
 * The form component handles all the logic (state, validation, submission).
 * 
 * @returns JSX with CreateListForm component
 */
function page() {
  return (
    <div>
      {/* 
        CreateListForm Component:
        - Client Component (uses 'use client')
        - Handles form state with useActionState
        - Calls createList Server Action
        - Redirects to /lists on success
      */}
      <CreateListForm />
    </div>
  )
}

export default page