import { prisma } from '@/lib/prisma';
import Navbar from '@/app/components/Navbar';
import AddItemForm from '@/app/components/AddItemForm';
import EditableListTitle from '@/app/components/EditableListTitle';
import ItemListWithSearch from '@/app/components/ItemListWithSearch';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

async function ListDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const list = await prisma.list.findUnique({
    where: {
      id: id,
    },
    include: {
      items: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });
  if (!list) {
    notFound();
  }

  const totalItems = list.items.length;
  const packedItems = list.items.filter((item) => item.packed).length;
  const progressPercent = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='max-w-4xl mx-auto px-8 pt-8 pb-16'>
        <div className='mb-6'>
          <Link
            href='/lists'
            className='inline-flex items-center gap-1.5 text-sm font-medium text-steel hover:text-navy transition-colors'
          >
            <ArrowLeft className='h-4 w-4' aria-hidden />
            Back to dashboard
          </Link>
        </div>

        <EditableListTitle listId={list.id} title={list.title} />

        <div className='mb-8 rounded-xl border border-silver bg-white p-4 shadow-sm'>
          <div className='flex justify-between text-sm text-steel mb-2'>
            <span>Packing progress</span>
            <span className='font-medium text-navy'>
              {packedItems}/{totalItems} · {progressPercent}%
            </span>
          </div>
          <div className='w-full h-2 bg-silver rounded-full overflow-hidden'>
            <div
              className='h-full bg-royal rounded-full transition-all duration-300'
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <ItemListWithSearch listId={list.id} items={list.items} />
          <AddItemForm listId={list.id} />
        </div>
      </main>
    </div>
  );
}

export default ListDetailPage;
