'use client'
import { updateItem, deleteItem } from "../actions/items";
import { useOptimistic, useTransition } from 'react';

function UpdateItemRow({ item, listId }: { item: { id: string, name: string, quantity: number, packed: boolean }; listId: string }) {
    const [optimisticPacked, setOptimisticPacked] = useOptimistic(item.packed, (currentPacked) => !currentPacked);
    const [, startTransition] = useTransition();

    function handleToggle() {
        startTransition(async () => {
            setOptimisticPacked(null);
            await updateItem(item.id, listId);
        });
    };

    function handleDelete() {
        if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
            startTransition(async () => {
                await deleteItem(item.id, listId);
            });
        }
    };

    return (
        <li key={item.id} className='flex items-center justify-between text-lg'>
            <span className={'text-slate'}>
                {item.name}
            </span>
            <span className='flex items-center gap-3'>
                <span className='text-steel text-xs'>×{item.quantity}</span>
                <span className={`text-xs font-medium ${optimisticPacked ? 'text-green-600' : 'text-steel'}`}>
                    {optimisticPacked ? 'Packed' : 'Not packed'}
                    <input type='checkbox' checked={optimisticPacked} onChange={handleToggle} className='ml-2' />
                </span>
                <button className="text-xs text-red-500 hover:text-red-700" onClick={handleDelete}>
                    Delete
                </button>
            </span>
        </li>
    )
};

export default UpdateItemRow;