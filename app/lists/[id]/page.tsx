import { PrismaClient } from '../../../app/generated/prisma';
const prisma = new PrismaClient();

async function ListDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const list = await prisma.list.findUnique({
        where: {
            id: id
        }
    })
    if (!list) {
        return <div>List not found</div>;
    }

    return (
        <>
            <h1>List details</h1>
            <div>{list.id} {list.title} {list.userId}</div>
        </>
    )
}

export default ListDetailPage;

