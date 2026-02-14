import { PrismaClient, List, Item } from '../../app/generated/prisma';
const prisma = new PrismaClient();
import Link from 'next/link';

export default async function ListsPage() {
  // Query lists with their items included
  const lists = await prisma.list.findMany({
    include: {
      items: true, // This fetches items for each list
    },
  });

  return (
    <div>
      <h1 className="text-3xl mb-4">
        Lists
      </h1>
      {lists.map((list) => (
        <div >
          <h2>
            <Link key={list.id} href={`/lists/${list.id}`}>
              {list.title}
            </Link>
          </h2>
          <ul>
            {list.items.map((item) => (
              <li key={item.id}>
                {item.name} - Quantity: {item.quantity} -{item.packed ? '✓ Packed' : '○ Not packed'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
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
