'use client';

import { useEffect, useState } from 'react';
import { PackageOpen, Search } from 'lucide-react';
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
    <div className='bg-white border border-silver rounded-xl p-6 shadow-sm'>
      <div className='flex items-center justify-between gap-3 mb-4'>
        <h2 className='text-sm font-semibold uppercase tracking-wide text-steel'>Items</h2>
        {items.length > 0 && (
          <span className='text-xs text-steel'>
            {filteredItems.length}
            {normalizedQuery ? ` of ${items.length}` : ''}
          </span>
        )}
      </div>

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
            className='w-full rounded-xl border border-silver bg-ivory py-2.5 pl-10 pr-3 text-sm text-slate placeholder:text-steel focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all'
          />
        </div>
      )}

      {items.length === 0 ? (
        <div className='rounded-xl border border-dashed border-silver bg-ivory px-4 py-8 text-center'>
          <PackageOpen className='mx-auto mb-2 h-6 w-6 text-steel' aria-hidden />
          <p className='text-sm font-medium text-slate'>No items yet</p>
          <p className='mt-1 text-xs text-steel'>Add something from the form on the right.</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className='rounded-xl border border-dashed border-silver bg-ivory px-4 py-8 text-center'>
          <p className='text-sm font-medium text-slate'>No matches</p>
          <p className='mt-1 text-xs text-steel'>
            Nothing matches &ldquo;{debouncedTerm.trim()}&rdquo;. Try a different search.
          </p>
        </div>
      ) : (
        <ul className='divide-y divide-silver/80'>
          {filteredItems.map((item) => (
            <UpdateItemRow key={item.id} item={item} listId={listId} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemListWithSearch;
