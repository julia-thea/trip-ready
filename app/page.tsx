import Link from 'next/link';
import Button from './components/Button';
import Navbar from './components/Navbar';

export default function HomePage() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      {/* Hero */}
      <section className='mx-auto px-8 pt-24 pb-20 text-center'>
        <h1 className='text-7xl font-bold text-navy leading-tight mb-8'>
          Smart Packing Lists for Every Trip
        </h1>
        <p className='text-xl text-slate/80 leading-relaxed mb-12 max-w-2xl mx-auto'>
          Never forget an item again. Create customized packing lists in seconds and travel with
          confidence.
        </p>
        <Link href='/create-list'>
          <Button variant='primary'>Create Your List</Button>
        </Link>
      </section>
      {/* Features */}
      <section className='max-w-6xl mx-auto px-8 pt-10'>
        <div className='grid md:grid-cols-3 gap-12'>
          <div className='text-center'>
            <div className='text-4xl mb-4'>🤖</div>
            <h3 className='text-lg font-semibold text-navy mb-3'>AI-Powered Suggestions</h3>
            <p className='text-slate/70 leading-relaxed'>
              Smart recommendations based on your destination and trip type.
            </p>
          </div>
          <div className='text-center'>
            <div className='text-4xl mb-4'>⚙️</div>
            <h3 className='text-lg font-semibold text-navy mb-3'>Trip-Specific Lists</h3>
            <p className='text-slate/70 leading-relaxed'>
              Tailored for beach trips, business travel, or adventures.
            </p>
          </div>
          <div className='text-center'>
            <div className='text-4xl mb-4'>💾</div>
            <h3 className='text-lg font-semibold text-navy mb-3'>Save and Reuse</h3>
            <p className='text-slate/70 leading-relaxed'>
              Build once, reuse for every future trip.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
