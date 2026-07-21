'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import UpdateItemRow from './UpdateItemRow';

type Item = {
  id: string;
  name: string;
  quantity: number;
  packed: boolean;
};

type ItemListWithSearchProps = {
  listId: string;
  items: Item[];
};

const DEBOUNCE_MS = 300;

function ItemListWithSearch({ listId, items }: ItemListWithSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const normalizedQuery = debouncedTerm.trim().toLowerCase();
  const filteredItems =
    normalizedQuery === ''
      ? items
      : items.filter((item) => item.name.toLowerCase().includes(normalizedQuery));

  return (
    <div className='bg-white border border-silver rounded-xl p-6 hover:shadow-md transition-all duration-200'>
      {items.length > 0 && (
        <div className='relative mb-4'>
          <label htmlFor='item-search' className='sr-only'>
            Search items
          </label>
          <Search
            className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel'
            aria-hidden
          />
          <input
            id='item-search'
            type='search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search items...'
            className='w-full rounded-xl border border-silver bg-white py-2.5 pl-10 pr-3 text-sm text-slate placeholder:text-steel focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20'
          />
        </div>
      )}

      {items.length === 0 ? (
        <p className='text-sm text-steel'>No items yet</p>
      ) : filteredItems.length === 0 ? (
        <p className='text-sm text-steel'>
          No items match &ldquo;{debouncedTerm.trim()}&rdquo;. Try a different search.
        </p>
      ) : (
        <ul className='space-y-2'>
          {filteredItems.map((item) => (
            <UpdateItemRow key={item.id} item={item} listId={listId} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemListWithSearch;
