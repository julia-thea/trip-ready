/**
 * CreateListForm
 *
 * full: empty-state card with helper copy (first list).
 * compact: inline title + button (returning users).
 */
'use client';

import { useState, useActionState } from 'react';
import { createList } from '../actions/lists';
import Button from './Button';

type CreateListFormProps = {
  variant?: 'full' | 'compact';
};

function CreateListForm({ variant = 'full' }: CreateListFormProps) {
  const [title, setTitle] = useState('');
  const [state, formAction, isPending] = useActionState(createList, { error: '' });

  const inputClass = `w-full px-4 py-3 rounded-xl border bg-ivory focus:bg-white ${
    state.error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-silver focus:border-navy focus:ring-navy'
  } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`;

  if (variant === 'compact') {
    return (
      <div className='rounded-xl border border-silver bg-white px-4 py-3 shadow-sm'>
        <form
          className='flex flex-col gap-3 sm:flex-row sm:items-start'
          action={formAction}
        >
          <div className='min-w-0 flex-1'>
            <label htmlFor='title' className='sr-only'>
              List title
            </label>
            <input
              name='title'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder='New list title'
              autoComplete='off'
            />
            {state.error && (
              <p className='mt-2 text-sm text-red-500' role='alert'>
                {state.error}
              </p>
            )}
          </div>
          <Button type='submit' variant='primary' disabled={isPending}>
            {isPending ? 'Creating...' : 'Create list'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className='rounded-xl border border-silver bg-white p-6 shadow-sm'>
      <h2 className='text-base font-semibold text-navy mb-1'>Create a list</h2>
      <p className='text-sm text-steel mb-4'>Give the trip a name you will recognize later.</p>
      <form className='space-y-4' action={formAction}>
        <div>
          <label htmlFor='title' className='block text-sm font-medium text-slate mb-2'>
            List title
          </label>
          <input
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder='e.g. Weekend in Iceland'
            autoComplete='off'
          />
          {state.error && (
            <p className='mt-2 text-sm text-red-500' role='alert'>
              {state.error}
            </p>
          )}
        </div>

        <Button type='submit' variant='primary' disabled={isPending} fullWidth>
          {isPending ? 'Creating...' : 'Create list'}
        </Button>
      </form>
    </div>
  );
}

export default CreateListForm;
