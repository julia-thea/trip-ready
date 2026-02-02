import { PrismaClient, List, Item } from "../../app/generated/prisma";
const prisma = new PrismaClient();

export default async function ListsPage() {
    // Query lists with their items included
    const lists = await prisma.list.findMany({
        include: {
            items: true  // This fetches items for each list
        }
    });

    return (
        <div>
            {lists.map((list) => (
                <div key={list.id}>
                    <h2>{list.title}</h2>
                    <ul>
                        {list.items.map((item) => (
                            <li key={item.id}>
                                {item.name} - Quantity: {item.quantity} - 
                                {item.packed ? '✓ Packed' : '○ Not packed'}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

// export default async function ListsPage() {
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
    // const lists = await prisma.list.findMany();

    // return (
    //     <ul>
    //     {lists.map((list) => (
    //         <li key={list.id}>{list.title}</li>
    //     ))}
    //     </ul>
    // )

// }