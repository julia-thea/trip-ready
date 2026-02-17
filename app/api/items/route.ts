import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const item = await prisma.item.findMany({
    include: {
      list: true,
    },
  });
  return Response.json(item);
}
