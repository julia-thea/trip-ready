'use client';
import React, { useActionState, useRef, useEffect } from 'react';
import { createItem } from '../actions/items';
import Button from './Button';

function AddItemForm({ listId }: { listId: string }) {
  const [state, formAction, isPending] = useActionState(createItem, { error: '' });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isPending && !state.error) {
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
  }, [isPending, state]);

  return (
    <div className='bg-white border border-silver rounded-xl p-6 hover:shadow-md transition-all duration-200'>
      <form className='space-y-4' action={formAction}>
        <div>
          <label htmlFor='itemName' className='block text-sm font-medium text-slate mb-2'>
            Item Name
          </label>
          <input
            type='text'
            name='itemName'
            id='itemName'
            className={`w-full px-4 py-3 rounded-xl border ${state.error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-silver focus:border-navy focus:ring-navy'
              } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
            placeholder='e.g. Phone charger'
            ref={inputRef}
          />
          {state.error && <p className='mt-2 text-sm text-red-500'>{state.error}</p>}
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
