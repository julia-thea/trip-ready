import Navbar from '../components/Navbar';

/**
 * Instant loading UI for /lists while the page Server Component fetches data.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/loading
 */
export default function ListsLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='mx-auto max-w-3xl px-8 py-8 sm:py-10 animate-pulse'>
        <div className='mb-6 h-9 w-40 bg-silver/70 rounded-lg' />
        <div className='mb-3 h-4 w-20 bg-silver/50 rounded' />
        <div className='mb-8 h-14 w-full rounded-xl border border-silver bg-white' />
        <div className='mb-3 h-4 w-16 bg-silver/50 rounded' />
        <div className='space-y-2.5'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='rounded-xl border border-silver bg-white p-4 space-y-3 shadow-sm'
            >
              <div className='h-5 w-2/3 bg-silver/70 rounded' />
              <div className='h-4 w-36 bg-silver/50 rounded' />
              <div className='h-1.5 w-full bg-silver/40 rounded-full' />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
