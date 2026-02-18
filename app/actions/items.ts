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

export async function updateItem(itemId: string, listId: string) {
    console.log("CHECKBOX");

    const packedStatus = await prisma.item.findUnique({
        where: { id: itemId},
    });

    if (!packedStatus) {
        return { error: 'Item not found' };
    }

    const updateItem = await prisma.item.update({
        where: { id: itemId },
        data: { packed: !packedStatus.packed },
    });

    revalidatePath('/lists/' + listId);
};

export async function deleteItem(itemId: string, listId: string) {
    console.log("Clocked DELETE");
    const deleteItem = await prisma.item.delete({
        where: {
            id: itemId,
        },
    });

        revalidatePath('/lists/' + listId);

    
}