import Navbar from '../../components/Navbar';

/**
 * Skeleton loading UI for /lists/[id] while the list is fetched.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/loading
 */
export default function ListDetailLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='max-w-4xl mx-auto px-8 pt-12 animate-pulse'>
        <div className='h-4 w-24 bg-silver/60 rounded mb-6' />
        <div className='h-9 w-64 bg-silver/70 rounded-lg mb-6' />
        <div className='mb-6 space-y-2'>
          <div className='flex justify-between'>
            <div className='h-4 w-32 bg-silver/50 rounded' />
            <div className='h-4 w-10 bg-silver/50 rounded' />
          </div>
          <div className='h-2 w-full bg-silver/60 rounded-full' />
        </div>
        <div className='grid grid-cols-2 gap-8'>
          <div className='bg-white border border-silver rounded-xl p-6 space-y-3'>
            <div className='h-10 w-full bg-silver/50 rounded-xl mb-2' />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='h-8 w-full bg-silver/40 rounded' />
            ))}
          </div>
          <div className='bg-white border border-silver rounded-xl p-6 space-y-4 h-fit'>
            <div className='h-5 w-36 bg-silver/70 rounded' />
            <div className='h-11 w-full bg-silver/50 rounded-xl' />
            <div className='h-11 w-full bg-silver/70 rounded-xl' />
          </div>
        </div>
      </main>
    </div>
  );
}
