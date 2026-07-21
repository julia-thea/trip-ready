import Navbar from '../components/Navbar';

/**
 * Instant loading UI for /lists while the page Server Component fetches data.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/loading
 */
export default function ListsLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='max-w-4xl mx-auto px-8 py-12 animate-pulse'>
        <div className='h-9 w-32 bg-silver/70 rounded-lg mb-8' />
        <div className='grid grid-cols-2 gap-8'>
          <div className='space-y-4'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='bg-white border border-silver rounded-xl p-6 space-y-3'
              >
                <div className='h-5 w-2/3 bg-silver/70 rounded' />
                <div className='h-4 w-full bg-silver/50 rounded' />
                <div className='h-4 w-4/5 bg-silver/50 rounded' />
              </div>
            ))}
          </div>
          <div className='bg-white border border-silver rounded-xl p-6 space-y-4 h-fit'>
            <div className='h-5 w-40 bg-silver/70 rounded' />
            <div className='h-11 w-full bg-silver/50 rounded-xl' />
            <div className='h-11 w-full bg-silver/70 rounded-xl' />
          </div>
        </div>
      </main>
    </div>
  );
}
