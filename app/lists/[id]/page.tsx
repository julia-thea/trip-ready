import { prisma } from '@/lib/prisma';
import Navbar from '@/app/components/Navbar';
import AddItemForm from '@/app/components/AddItemForm';
import EditableListTitle from '@/app/components/EditableListTitle';
import ItemListWithSearch from '@/app/components/ItemListWithSearch';
import Link from 'next/link';

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
    return <div>List not found</div>;
  }

  const totalItems = list.items.length;
  const packedItems = list.items.filter((item) => item.packed).length;
  const progressPercent = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='max-w-4xl mx-auto px-8 pt-12'>
        <div className='mb-4'>
          <Link href='/lists' className='text-sm text-steel hover:text-navy'>
            Back to Lists
          </Link>
        </div>
        <EditableListTitle listId={list.id} title={list.title} />
        <div className='mb-6'>
          <div className='flex justify-between text-sm text-steel mb-1'>
            <span>Packing progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className='w-full h-2 bg-silver rounded-full overflow-hidden'>
            <div className='h-full bg-royal rounded-full' style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-8'>
          <ItemListWithSearch listId={list.id} items={list.items} />
          <div>
            <AddItemForm listId={list.id} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ListDetailPage;
