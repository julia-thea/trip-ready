'use server'
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: Create a new item in a list
 * Used with useActionState hook in AddItemForm component
 * 
 * @param previousState - Previous form state (for useActionState)
 * @param formData - Form data containing itemName, quantity, and listId
 * @returns Error object if validation fails, otherwise redirects
 */
export async function createItem(previousState: { error: string }, formData: FormData) {
    const listId = formData.get('listId') as string;
    const itemName = formData.get('itemName') as string;
    // FormData returns strings, so we need to parse quantity to number for Prisma Int field
    const quantityStr = formData.get('quantity') as string;
    const quantity = quantityStr ? parseInt(quantityStr, 10) : 1;

    // Server-side validation
    if (!itemName || itemName.trim() === '') { 
        return { error: 'Title is required' };
    };
    
    const newItem = await prisma.item.create({
        data: {
            name: itemName,
            quantity: quantity,
            list: {
                connect: {id: listId}
            }
        },
    })
    
    // Revalidate the list detail page to show the new item
    revalidatePath('/lists/' + listId);
    redirect(`/lists/${listId}`); 
};

/**
 * Server Action: Toggle the packed status of an item
 * Called from UpdateItemRow component when checkbox is clicked
 * 
 * @param itemId - ID of the item to update
 * @param listId - ID of the list (needed for revalidatePath)
 */
export async function updateItem(itemId: string, listId: string) {
    // First check if item exists
    const packedStatus = await prisma.item.findUnique({
        where: { id: itemId},
    });

    if (!packedStatus) {
        return { error: 'Item not found' };
    }

    // Toggle the packed status
    const updateItem = await prisma.item.update({
        where: { id: itemId },
        data: { packed: !packedStatus.packed },
    });

    // Revalidate to refresh the UI with updated status
    revalidatePath('/lists/' + listId);
};

/**
 * Server Action: Delete an item from a list
 * Called from UpdateItemRow component when Delete button is clicked
 * 
 * @param itemId - ID of the item to delete
 * @param listId - ID of the list (needed for revalidatePath)
 */
export async function deleteItem(itemId: string, listId: string) {
    try {
        await prisma.item.delete({
            where: {
                id: itemId,
            },
        });
        revalidatePath('/lists/' + listId);
    } catch (error) {
        // Item doesn't exist or already deleted (e.g., double-click, race condition)
        // Still revalidate to sync UI - page will show current state
        revalidatePath('/lists/' + listId);
    }
}