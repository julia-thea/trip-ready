import {
  ListChecks,
  Map,
  Sparkles,
} from 'lucide-react';
import HeroAuthActions from './components/HeroAuthActions';
import LandingFooter from './components/LandingFooter';
import Navbar from './components/Navbar';
import PackingListCard from './components/PackingListCard';
import ScrollPackDemo from './components/ScrollPackDemo';

const HERO_LIST_ITEMS = [
  { name: 'Passport', packed: true },
  { name: 'Phone charger', packed: true },
  { name: 'Rain jacket', packed: false },
  { name: 'Hiking boots', packed: false },
  { name: 'Travel adapter', packed: true },
  { name: 'Toiletry kit', packed: false },
];

export default function HomePage() {
  return (
    <div className='min-h-screen bg-ivory text-slate'>
      <Navbar />

      <section className='relative overflow-hidden border-b border-silver/80'>
        <div
          className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky/80 via-ivory to-ivory'
          aria-hidden
        />
        <div
          className='pointer-events-none absolute inset-0 opacity-[0.35]'
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(30,58,95,0.12) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden
        />

        <div className='relative mx-auto grid max-w-6xl items-center gap-12 px-8 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24'>
          <div>
            <h1 className='text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl'>
              Never forget a{'\u00A0'}charger again.
            </h1>
            <p className='mt-5 max-w-lg text-lg leading-relaxed text-steel'>
              Trip Ready turns a messy mental checklist into a packing list you can finish.
              Track progress, search items, reuse what worked last trip.
            </p>
            <HeroAuthActions />
          </div>

          <PackingListCard items={HERO_LIST_ITEMS} />
        </div>
      </section>

      <ScrollPackDemo />

      <section className='mx-auto max-w-6xl px-8 py-16 lg:py-20'>
        <div className='max-w-2xl'>
          <h2 className='text-2xl font-bold text-navy sm:text-3xl'>How it works</h2>
          <p className='mt-2 text-steel'>Three steps from empty list to packed bag.</p>
        </div>
        <ol className='mt-10 grid gap-8 sm:grid-cols-3'>
          {[
            {
              step: '01',
              title: 'Create a list',
              body: 'Name the trip and open a checklist in seconds.',
            },
            {
              step: '02',
              title: 'Add and check off',
              body: 'Add items, mark them packed, and watch progress fill.',
            },
            {
              step: '03',
              title: 'Reuse next time',
              body: 'Come back to saved lists instead of starting from zero.',
            },
          ].map((item) => (
            <li key={item.step}>
              <p className='text-xs font-semibold tracking-widest text-royal'>{item.step}</p>
              <h3 className='mt-2 text-lg font-semibold text-navy'>{item.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-steel'>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className='border-y border-silver bg-white'>
        <div className='mx-auto max-w-6xl px-8 py-16 lg:py-20'>
          <div className='max-w-2xl'>
            <h2 className='text-2xl font-bold text-navy sm:text-3xl'>Built for real trips</h2>
            <p className='mt-2 text-steel'>
              What works today, and what is next on the roadmap.
            </p>
          </div>
          <div className='mt-10 grid gap-8 sm:grid-cols-3'>
            <div>
              <div className='mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky text-navy'>
                <ListChecks className='h-5 w-5' aria-hidden />
              </div>
              <h3 className='text-lg font-semibold text-navy'>Packing progress</h3>
              <p className='mt-2 text-sm leading-relaxed text-steel'>
                Check items off and see how close you are to fully packed.
              </p>
            </div>
            <div>
              <div className='mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky text-navy'>
                <Map className='h-5 w-5' aria-hidden />
              </div>
              <h3 className='text-lg font-semibold text-navy'>Trip-specific lists</h3>
              <p className='mt-2 text-sm leading-relaxed text-steel'>
                Separate lists for beach weekends, business travel, or adventures.
              </p>
            </div>
            <div>
              <div className='mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky text-navy'>
                <Sparkles className='h-5 w-5' aria-hidden />
              </div>
              <div className='flex flex-wrap items-center gap-2'>
                <h3 className='text-lg font-semibold text-navy'>AI-powered suggestions</h3>
                <span className='rounded-full border border-silver bg-ivory px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-steel'>
                  Coming soon
                </span>
              </div>
              <p className='mt-2 text-sm leading-relaxed text-steel'>
                Smart recommendations from destination and trip type. Planned next, not live yet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
