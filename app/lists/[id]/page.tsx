import { prisma } from '@/lib/prisma';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import AddItemForm from '@/app/components/AddItemForm';


async function ListDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const list = await prisma.list.findUnique({
        where: {
            id: id
        },
        include: {
            items: true,
        },
    })
    if (!list) {
        return <div>List not found</div>;
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
            <Navbar />
            <main className='max-w-4xl mx-auto px-8 pt-12'>
                <h1 className='text-3xl font-bold text-navy mb-6'>{list.title}</h1>

                <div className='grid grid-cols-2 gap-8'>
                    <div>
                        {list.items.length === 0 ? (
                            <div className='bg-white border border-silver rounded-xl p-6'>
                                <p className='text-sm text-steel'>No items yet</p>
                            </div>
                        ) : (
                            <ul>
                                {list.items.map((item) => (
                                    <li key={item.id}>
                                        <div className='bg-white border border-silver rounded-xl p-6 my-2'>{item.name}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <AddItemForm listId={list.id} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ListDetailPage;

