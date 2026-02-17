import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Navbar from '../components/Navbar';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='max-w-4xl mx-auto px-8 pt-12'>
        <h1 className='text-3xl font-bold text-navy mb-2'>
          Welcome back{session.user?.name ? `, ${session.user.name}` : ''}
        </h1>
        <p className='text-steel mb-8'>{session.user?.email}</p>

        <div className='grid md:grid-cols-2 gap-6'>
          <a
            href='/lists'
            className='p-6 bg-white rounded-xl border border-silver hover:border-navy/30 hover:shadow-md transition-all'
          >
            <h2 className='text-lg font-semibold text-navy mb-2'>My Lists</h2>
            <p className='text-steel text-sm'>View and manage your packing lists</p>
          </a>
        </div>
      </main>
    </div>
  );
}
