/**
 * CreateListForm Component
 * 
 * Form for creating a new packing list.
 * Uses Server Actions with useActionState for form submission and validation.
 * 
 * Component Type: Client Component
 * - Uses 'use client' directive
 * - Requires client-side because it uses:
 *   - useState for form input
 *   - useActionState for Server Action integration
 *   - Event handlers (onChange)
 * 
 * Features:
 * - Server-side validation (via Server Action)
 * - Loading state during submission
 * - Error display
 * - Automatic redirect on success (handled by Server Action)
 * 
 * Usage:
 * - Used on /create-list page (dedicated page)
 * - Used on /lists page (right column, inline)
 */
'use client';
import { useState, useActionState } from 'react';
import { createList } from '../actions/lists';
import Button from './Button';

/**
 * CreateListForm Component
 * 
 * Form component for creating a new packing list.
 * 
 * State:
 * - title: Controlled input value
 * - state: Server Action state (contains error messages)
 * - formAction: Wrapped Server Action for form submission
 * - isPending: Loading state during submission
 */
function CreateListForm() {
    // Controlled input state
    const [title, setTitle] = useState('');

    /**
     * useActionState Hook
     * 
     * Integrates form with Server Action:
     * - createList: Server Action function (app/actions/lists.ts)
     * - { error: '' }: Initial state (empty error)
     * - Returns: [state, formAction, isPending]
     *   - state: Current state from Server Action (error messages)
     *   - formAction: Wrapped action for form submission
     *   - isPending: True while action is running
     */
    const [state, formAction, isPending] = useActionState(createList, { error: '' });

    return (
        <>
            <div className='bg-white border border-silver rounded-xl p-6'>
                <div className='w-full'>
                    {/* Form with Server Action */}
                    <form className='space-y-6' action={formAction}>
                        <div>
                            {/* List Title Input */}
                            {/* 
                              Controlled input:
                              - value: Controlled by title state
                              - onChange: Updates title state
                              - name: 'title' matches Server Action's formData.get('title')
                              - Conditional styling: Red border if validation error
                            */}
                            <input
                                name='title'
                                id='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border ${state.error
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-silver focus:border-navy focus:ring-navy'
                                    } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
                                placeholder='list title'
                            />
                            {/* Display validation error if present */}
                            {state.error && <p className='mt-2 text-sm text-red-500'>{state.error}</p>}
                        </div>

                        {/* Submit Button */}
                        {/* 
                          Button state:
                          - disabled: Prevents double submission while pending
                          - Text changes: "Creating..." during submission
                          - fullWidth: Takes full width of form
                        */}
                        <Button type='submit' variant='secondary' disabled={isPending} fullWidth>
                            {isPending ? 'Creating...' : 'Create List'}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateListForm;
