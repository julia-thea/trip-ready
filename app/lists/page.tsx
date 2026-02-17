import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import CreateListForm from '../components/CreateListForm';

export default async function ListsPage() {
  // Query lists with their items included
  const lists = await prisma.list.findMany({
    include: {
      items: true, // This fetches items for each list
    },
  });

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='max-w-4xl mx-auto px-8 py-12'>
        <h1 className='text-3xl font-bold text-navy mb-2'>Lists
        </h1>
        <div className='grid grid-cols-2 gap-8'>
          <div className='space-y-4'>
            {lists.map((list) => (
              <div key={list.id} className='bg-white border border-silver rounded-xl p-6 hover:shadow-md transition-all duration-200'>
                <Link href={`/lists/${list.id}`} className='block'>
                  <h2 className='text-lg font-semibold text-navy mb-3'>{list.title}</h2>
                </Link>
                {list.items.length > 0 ? (
                  <ul className='space-y-2'>
                    {list.items.map((item) => (
                      <li key={item.id} className='flex items-center justify-between text-sm'>
                        <span className={item.packed ? 'text-steel line-through' : 'text-slate'}>
                          {item.name}
                        </span>
                        <span className='flex items-center gap-3'>
                          <span className='text-steel text-xs'>×{item.quantity}</span>
                          <span className={`text-xs font-medium ${item.packed ? 'text-green-600' : 'text-steel'}`}>
                            {item.packed ? '✓ Packed' : '○ Not packed'}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-sm text-steel'>No items yet</p>
                )}
              </div>
            ))}
          </div>
          <div>
            <CreateListForm />
          </div>
        </div>
      </main>
    </div>
  );
}

// export default async function ListsPage() {
// using client component => api => db
// const data = await fetch('http://localhost:3000/api/lists')
// const lists: List[] = await data.json()
// return (
//     <ul>
//     {lists.map((list) => (
//         <li key={list.id}>{list.title}</li>
//     ))}
//     </ul>
// )

// using server component => db
// const lists = await prisma.list.findMany();

// return (
//     <ul>
//     {lists.map((list) => (
//         <li key={list.id}>{list.title}</li>
//     ))}
//     </ul>
// )

// }
