import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

/**
 * Shown when notFound() is called for an invalid list id.
 * @see https://nextjs.org/docs/app/api-reference/functions/not-found
 */
export default function ListNotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='max-w-4xl mx-auto px-8 pt-12'>
        <div className='bg-white border border-silver rounded-2xl shadow-sm p-8 sm:p-10 max-w-md'>
          <h1 className='text-2xl font-bold text-navy mb-2'>List not found</h1>
          <p className='text-sm text-steel mb-6'>
            This packing list doesn&apos;t exist or may have been deleted.
          </p>
          <Link href='/lists'>
            <Button variant='primary'>Back to lists</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
