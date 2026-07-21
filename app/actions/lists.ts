'use server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: Create a new packing list
 * Used with useActionState hook in CreateListForm component
 *
 * @param previousState - Previous form state (for useActionState)
 * @param formData - Form data containing title
 * @returns Error object if validation fails, otherwise redirects to /lists
 */
export async function createList(previousState: { error: string }, formData: FormData) {
  const title = formData.get('title') as string;

  // Server-side validation
  if (!title || title.trim() === '') {
    return { error: 'Title is required' };
  }

  const newList = await prisma.list.create({
    data: {
      title: title,
    },
  });

  // Redirect to lists page after successful creation
  redirect('/lists');
}

export async function editListTitle(listId: string, title: string) {
  if (!title || title.trim() === '') {
    return { error: 'Title is required' };
  }

  try {
    await prisma.list.update({
      where: { id: listId },
      data: { title: title },
    });

    // Revalidate to refresh the UI with updated status
    revalidatePath('/lists/' + listId);
    revalidatePath('/lists/');
  } catch (error) {
    throw error;
  }
}

export async function deleteList(listId: string) {
  try {
    await prisma.list.delete({
      where: {
        id: listId,
      },
    });
    revalidatePath('/lists/');
  } catch (error) {
    // Item doesn't exist or already deleted (e.g., double-click, race condition)
    // Still revalidate to sync UI - page will show current state
    revalidatePath('/lists/');
  }
}
