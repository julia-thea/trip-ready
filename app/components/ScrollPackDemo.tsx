'use client';

import { useEffect, useRef, useState } from 'react';
import PackingListCard from './PackingListCard';

const DEMO_ITEMS = [
  'Passport',
  'Phone charger',
  'Rain jacket',
  'Hiking boots',
  'Travel adapter',
  'Toiletry kit',
];

/**
 * Sticky scroll demo: as the user scrolls, packing items check off and progress fills.
 * Respects prefers-reduced-motion (shows final packed state immediately).
 */
export default function ScrollPackDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [packedCount, setPackedCount] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setPackedCount(DEMO_ITEMS.length);
      return;
    }

    let frame = 0;

    function update() {
      const el = sectionRef.current;
      if (!el) return;

      const viewport = window.innerHeight;
      const total = el.offsetHeight - viewport;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      const progress = total > 0 ? scrolled / total : 1;
      setPackedCount(Math.round(progress * DEMO_ITEMS.length));
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduceMotion]);

  const items = DEMO_ITEMS.map((name, index) => ({
    name,
    packed: index < packedCount,
  }));

  return (
    <section
      ref={sectionRef}
      className='relative h-[220vh] border-b border-silver/80 bg-gradient-to-b from-white to-ivory'
      aria-label='Packing progress demo'
    >
      <div className='sticky top-24 mx-auto flex max-w-md flex-col items-center px-8 py-12 lg:max-w-lg'>
        <p className='mb-6 text-sm font-semibold tabular-nums text-navy' aria-live='polite'>
          {packedCount} of {DEMO_ITEMS.length} packed
        </p>
        <PackingListCard items={items} className='mx-auto w-full' />
      </div>
    </section>
  );
}
