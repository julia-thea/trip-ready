/**
 * UpdateItemRow Component
 * 
 * Displays a single item in a list with packed status toggle and delete button.
 * Uses optimistic UI updates for instant feedback.
 * 
 * Component Type: Client Component
 * - Uses 'use client' directive
 * - Requires client-side because it uses:
 *   - useOptimistic for optimistic UI updates
 *   - useTransition for async actions
 *   - Event handlers (onChange, onClick)
 * 
 * Features:
 * - Optimistic UI: Checkbox updates instantly before server responds
 * - Packed status toggle: Updates item.packed in database
 * - Delete functionality: Removes item with confirmation
 * - Visual feedback: Strikethrough for packed items, color changes
 * 
 * Props:
 * - item: Item object with id, name, quantity, packed
 * - listId: ID of the list (needed for revalidatePath in Server Actions)
 * 
 * Usage:
 * - Used in list detail page (/lists/[id]) to display items
 * - Rendered in a <ul> list, one component per item
 */
'use client'
import { updateItem, deleteItem } from "../actions/items";
import { useOptimistic, useTransition } from 'react';

/**
 * UpdateItemRow Component
 * 
 * Renders a single item row with packed toggle and delete button.
 * 
 * @param item - Item object with id, name, quantity, packed status
 * @param listId - ID of the list this item belongs to
 */
function UpdateItemRow({ item, listId }: { item: { id: string, name: string, quantity: number, packed: boolean }; listId: string }) {
    /**
     * useOptimistic Hook
     * 
     * Provides optimistic UI updates for packed status:
     * - item.packed: Real value from database
     * - (currentPacked) => !currentPacked: Update function (toggles value)
     * - optimisticPacked: Value to display (optimistic or real)
     * - setOptimisticPacked: Function to trigger optimistic update
     * 
     * How it works:
     * 1. User clicks checkbox
     * 2. setOptimisticPacked() updates UI immediately (optimistic)
     * 3. Server Action updates database
     * 4. When server responds, optimisticPacked syncs back to real value
     * 
     * This gives instant feedback while server processes the request.
     */
    const [optimisticPacked, setOptimisticPacked] = useOptimistic(item.packed, (currentPacked) => !currentPacked);

    /**
     * useTransition Hook
     * 
     * Marks async operations as transitions:
     * - startTransition: Wraps async operations
     * - Required for useOptimistic (setter must be called in transition)
     * - Prevents blocking UI updates
     */
    const [, startTransition] = useTransition();

    /**
     * Handle Packed Status Toggle
     * 
     * Toggles the packed status of an item.
     * 
     * Flow:
     * 1. Wraps in startTransition (required for useOptimistic)
     * 2. Triggers optimistic update (UI updates instantly)
     * 3. Calls updateItem Server Action (updates database)
     * 4. Server Action calls revalidatePath (refreshes page data)
     */
    function handleToggle() {
        startTransition(async () => {
            // Trigger optimistic update (UI changes immediately)
            setOptimisticPacked(null);
            // Update database via Server Action
            await updateItem(item.id, listId);
        });
    };

    /**
     * Handle Item Deletion
     * 
     * Deletes an item from the list with confirmation.
     * 
     * Flow:
     * 1. Shows browser confirm dialog
     * 2. If confirmed, wraps in startTransition
     * 3. Calls deleteItem Server Action (deletes from database)
     * 4. Server Action calls revalidatePath (refreshes page, item disappears)
     */
    function handleDelete() {
        if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
            startTransition(async () => {
                await deleteItem(item.id, listId);
            });
        }
    };

    return (
        <li key={item.id} className='flex items-center justify-between text-lg'>
            {/* Item Name */}
            {/* Strikethrough styling applied via CSS classes */}
            <span className={'text-slate'}>
                {item.name}
            </span>

            {/* Right Side: Quantity, Packed Status, Delete */}
            <span className='flex items-center gap-3'>
                {/* Quantity Display */}
                <span className='text-steel text-xs'>×{item.quantity}</span>

                {/* Packed Status and Checkbox */}
                <span className={`text-xs font-medium ${optimisticPacked ? 'text-green-600' : 'text-steel'}`}>
                    {/* Status Text: Changes based on optimisticPacked */}
                    {optimisticPacked ? 'Packed' : 'Not packed'}
                    {/* Checkbox: Controlled by optimisticPacked */}
                    <input
                        type='checkbox'
                        checked={optimisticPacked}
                        onChange={handleToggle}
                        className='ml-2'
                    />
                </span>

                {/* Delete Button */}
                <button
                    className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded bg-red-100 transition-colors"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </span>
        </li>
    )
};

export default UpdateItemRow;