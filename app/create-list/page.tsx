'use client';
import { useState, useActionState } from 'react';
import Navbar from '../components/Navbar';
import { createList } from '../actions/lists';

function CreateListPage() {
  const [title, setTitle] = useState('');
  const [state, formAction, isPending] = useActionState(createList, { error: '' });

  return (
    <>
      <Navbar />
      <div className='min-h-screen flex items-center justify-center px-4'>
        <div className='w-full max-w-md'>
          <h1 className='text-3xl font-bold text-navy text-center mb-8'>Create List</h1>
          <form className='space-y-6' action={formAction}>
            <div>
              <label htmlFor='title' className='block text-sm font-medium text-slate mb-2'>
                Title
              </label>
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
              {state.error && <p className='mt-2 text-sm text-red-500'>{state.error}</p>}
            </div>
            <button
              type='submit'
              className='w-full px-7 py-3 bg-navy text-ivory text-sm font-semibold rounded-xl hover:bg-slate hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none'
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create List'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateListPage;
