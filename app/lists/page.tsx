/**
 * Dashboard (lists index)
 *
 * Logged-in home: existing lists first when present; create is full only when empty.
 */
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Navbar from '../components/Navbar';
import CreateListForm from '../components/CreateListForm';
import ListRow from '../components/ListRow';

type ListWithItems = {
  id: string;
  title: string;
  updatedAt: Date;
  items: Array<{ id: string; name: string; packed: boolean; quantity: number }>;
};

function isComplete(list: ListWithItems): boolean {
  return list.items.length > 0 && list.items.every((item) => item.packed);
}

/** Incomplete (and empty) lists first, then most recently updated. */
function sortForDashboard(lists: ListWithItems[]): ListWithItems[] {
  return [...lists].sort((a, b) => {
    const aDone = isComplete(a);
    const bDone = isComplete(b);
    if (aDone !== bDone) return aDone ? 1 : -1;
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });
}

export default async function ListsPage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const lists = sortForDashboard(
    await prisma.list.findMany({
      include: {
        items: true,
      },
    })
  );

  const hasLists = lists.length > 0;

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />

      <main className='mx-auto max-w-3xl px-8 py-8 sm:py-10'>
        <header className={hasLists ? 'mb-6' : 'mb-6'}>
          <h1 className='text-3xl font-bold text-navy'>Dashboard</h1>
          {!hasLists && (
            <p className='mt-2 text-steel text-sm leading-relaxed'>
              Create a list to start packing.
            </p>
          )}
        </header>

        {hasLists ? (
          <>
            <section className='mb-8' aria-labelledby='create-list-heading'>
              <h2 id='create-list-heading' className='text-sm font-medium text-steel mb-3'>
                New list
              </h2>
              <CreateListForm variant='compact' />
            </section>

            <section aria-labelledby='lists-heading'>
              <h2 id='lists-heading' className='text-sm font-medium text-steel mb-3'>
                {lists.length === 1 ? '1 list' : `${lists.length} lists`}
              </h2>
              <ul className='space-y-2.5'>
                {lists.map((list) => (
                  <li key={list.id}>
                    <ListRow list={list} />
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <section aria-labelledby='create-list-heading'>
            <h2 id='create-list-heading' className='sr-only'>
              Create a list
            </h2>
            <CreateListForm variant='full' />
          </section>
        )}
      </main>
    </div>
  );
}
