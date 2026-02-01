import { PrismaClient } from "../../../app/generated/prisma";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const lists = await prisma.list.findMany();
    console.log("THIs are lists: ", lists);
    return Response.json(lists)
}

export async function POST(request: Request) {
    try {
        const res = await request.json()
        
        // Validation
        if (!res.title || res.title.trim() === '') {
            return Response.json(
                { error: "Title is required" }, 
                { status: 400 }
            )
        }
        
        const list = await prisma.list.create({
            data: {
                title: res.title,
                userId: res.userId,
            },
        })
        
        return Response.json(list, { status: 201 })
        
    } catch (error) {
        console.error("Error creating list:", error)
        return Response.json(
            { error: "Failed to create list" }, 
            { status: 500 }
        )
    }
}

