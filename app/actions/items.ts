'use server'
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';



export async function createItem(previousState: { error: string }, formData: FormData) {
    const listId = formData.get('listId') as string;
    const itemName = formData.get('itemName') as string;

    if (!itemName || itemName.trim() === '') { 
        return { error: 'Title is required' };
    };
    const newItem = await prisma.item.create({
        data: {
            name: itemName,
            list: {
                connect: {id: listId}
            }
        },
    })
    revalidatePath('/lists/' + listId);
    redirect(`/lists/${listId}`); 
};