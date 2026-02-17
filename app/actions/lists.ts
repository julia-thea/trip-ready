'use server'
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';



export async function createList(previousState: { error: string }, formData: FormData) {
    const title = formData.get('title') as string;
    if (!title || title.trim() === '') { 
        return { error: 'Title is required' };
    };
    const newList = await prisma.list.create({
        data: {
            title: title
        },
    })
    console.log("prisma list: ", newList);
    redirect('/lists');
    
};