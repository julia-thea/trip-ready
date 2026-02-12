'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';

function validateTitle(title: string): string {
  if (!title) return 'Title is required';
  return '';
}

function CreateList() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ title?: string }>({});

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const titleError: string = validateTitle(title);

    if (titleError) {
      setFieldErrors({ title: titleError });
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setError('');

    try {
      console.log('Successful title submission');
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className='min-h-screen flex items-center justify-center px-4'>
        <div className='w-full max-w-md'>
          <h1 className='text-3xl font-bold text-navy text-center mb-8'>Create List</h1>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='title' className='block text-sm font-medium text-slate mb-2'>
                Title
              </label>
              <input
                name='title'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.title
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-silver focus:border-navy focus:ring-navy'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
                placeholder='list title'
              />
              {fieldErrors.title && <p className='mt-2 text-sm text-red-500'>{fieldErrors.title}</p>}
            </div>
            <button
              type='submit'
              disabled={loading}
              className='w-full px-7 py-3 bg-navy text-ivory text-sm font-semibold rounded-xl hover:bg-slate hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none'
            >
              {loading ? 'Creating List...' : 'Create List'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateList;
