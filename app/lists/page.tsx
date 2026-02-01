import { PrismaClient, List } from "../../app/generated/prisma";
const prisma = new PrismaClient();

export default async function ListsPage() {
    // using client component => api => db
    // const data = await fetch('http://localhost:3000/api/lists')
    // const lists: List[] = await data.json()
    // return (
    //     <ul>
    //     {lists.map((list) => (
    //         <li key={list.id}>{list.title}</li>
    //     ))}
    //     </ul>
    // )

    // using server component => db
    const lists = await prisma.list.findMany();

    return (
        <ul>
        {lists.map((list) => (
            <li key={list.id}>{list.title}</li>
        ))}
        </ul>
    )

}