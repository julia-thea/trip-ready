import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const item = await prisma.item.findMany({
        include: {
            list: true
        }
    });
    return Response.json(item);
}