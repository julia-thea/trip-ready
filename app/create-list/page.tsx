import CreateListForm from '../components/CreateListForm';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function CreateListPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='max-w-md mx-auto px-8 pt-8 pb-16'>
        <Link
          href='/lists'
          className='inline-flex items-center gap-1.5 text-sm font-medium text-steel hover:text-navy transition-colors mb-6'
        >
          <ArrowLeft className='h-4 w-4' aria-hidden />
          Back to lists
        </Link>
        <h1 className='text-3xl font-bold text-navy mb-6'>Create a list</h1>
        <CreateListForm />
      </main>
    </div>
  );
}

export default CreateListPage;
