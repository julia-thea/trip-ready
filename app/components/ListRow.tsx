'use client'
import { deleteList } from "../actions/lists";
import Link from "next/link";
import { useTransition } from 'react';

function ListRow({ list }: { list: { id: string, title: string, items: Array<{ id: string, name: string, packed: boolean, quantity: number }> } }) {
    const [, startTransition] = useTransition();

    function handleDelete() {
        if (confirm(`Are you sure you want to delete "${list.title}"?`)) {
            startTransition(async () => {
                await deleteList(list.id);
            });
        }
    };

    return (
        <div key={list.id} className='bg-white border border-silver rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200'>
            {/* List Header: Title and Delete Button */}
            <div className='flex items-center justify-between mb-3'>
                {/* List Title (Clickable Link to Detail Page) */}
                <Link href={`/lists/${list.id}`} className='flex-1'>
                    <h2 className='text-lg font-semibold text-navy'>{list.title}</h2>
                </Link>
                {/* Delete Button (UI Only) */}
                <button className='text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg bg-red-50 transition-colors' onClick={handleDelete}>
                    Delete
                </button>
            </div>

            {/* List Items */}
            {list.items.length > 0 ? (
                <ul className='space-y-2'>
                    {list.items.map((item) => (
                        <li key={item.id} className='flex items-center justify-between text-sm'>
                            {/* Item Name with Strikethrough if Packed */}
                            <span className={item.packed ? 'text-steel line-through' : 'text-slate'}>
                                {item.name}
                            </span>
                            {/* Item Quantity and Packed Status */}
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
                // Empty State: No Items Yet
                <p className='text-sm text-steel'>No items yet</p>
            )}
        </div>

    )
};

export default ListRow;