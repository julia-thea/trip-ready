/**
 * AddItemForm Component
 * 
 * Form for adding a new item to a packing list.
 * Uses Server Actions with useActionState for form submission.
 * 
 * Component Type: Client Component
 * - Uses 'use client' directive
 * - Requires client-side because it uses:
 *   - useActionState for Server Action integration
 *   - useRef for input focus management
 *   - useEffect for side effects
 * 
 * Features:
 * - Server-side validation (via Server Action)
 * - Loading state during submission
 * - Error display
 * - Auto-clear and refocus input on success
 * - Quantity input with default value
 * 
 * Props:
 * - listId: ID of the list to add the item to (required)
 * 
 * Usage:
 * - Used on list detail page (/lists/[id]) in right column
 */
'use client';
import React, { useActionState, useRef, useEffect } from 'react';
import { createItem } from '../actions/items';
import Button from './Button';

/**
 * AddItemForm Component
 * 
 * Form component for adding items to a list.
 * 
 * @param listId - ID of the list to add the item to
 */
function AddItemForm({ listId }: { listId: string }) {
  /**
   * useActionState Hook
   * 
   * Integrates form with Server Action:
   * - createItem: Server Action function (app/actions/items.ts)
   * - { error: '' }: Initial state (empty error)
   * - Returns: [state, formAction, isPending]
   */
  const [state, formAction, isPending] = useActionState(createItem, { error: '' });

  /**
   * useRef for Input Element
   * 
   * Allows direct access to the input DOM element.
   * Used to clear and refocus the input after successful submission.
   */
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * useEffect: Clear and Refocus Input on Success
   * 
   * Runs after form submission completes:
   * - Watches isPending and state.error
   * - If submission succeeded (!isPending && !state.error):
   *   - Clears input value
   *   - Refocuses input for next item entry
   * 
   * This improves UX by allowing rapid item entry.
   */
  useEffect(() => {
    if (!isPending && !state.error) {
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
  }, [isPending, state]);

  return (
    <div className='bg-white border border-silver rounded-xl p-6 shadow-sm'>
      <h2 className='text-sm font-semibold uppercase tracking-wide text-steel mb-4'>Add item</h2>
      <form className='space-y-4' action={formAction}>
        {/* Item Name Input */}
        <div>
          <label htmlFor='itemName' className='block text-sm font-medium text-slate mb-2'>
            Item name
          </label>
          <input
            type='text'
            name='itemName'
            id='itemName'
            className={`w-full px-4 py-3 rounded-xl border bg-ivory focus:bg-white ${state.error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-silver focus:border-navy focus:ring-navy'
              } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
            placeholder='e.g. Phone charger'
            ref={inputRef}
          />
          {state.error && <p className='mt-2 text-sm text-red-500'>{state.error}</p>}
        </div>

        <div>
          <label htmlFor='quantity' className='block text-sm font-medium text-slate mb-2'>
            Quantity
          </label>
          <input
            type='number'
            name='quantity'
            id='quantity'
            min='0'
            defaultValue='1'
            className='w-full px-4 py-3 rounded-xl border border-silver bg-ivory focus:bg-white focus:border-navy focus:ring-navy focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all'
          />
        </div>

        <input type='hidden' name='listId' value={listId} />

        <Button type='submit' variant='secondary' disabled={isPending} fullWidth>
          {isPending ? 'Adding...' : 'Add Item'}
        </Button>
      </form>
    </div>
  );
}

export default AddItemForm;
