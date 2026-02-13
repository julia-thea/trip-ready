'use server'
import { PrismaClient } from '../../app/generated/prisma';
const prisma = new PrismaClient();
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