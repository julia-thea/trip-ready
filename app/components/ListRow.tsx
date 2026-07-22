'use client';

import { deleteList } from '../actions/lists';
import Link from 'next/link';
import { useTransition } from 'react';
import { ChevronRight, Trash2 } from 'lucide-react';

type ListItem = {
  id: string;
  name: string;
  packed: boolean;
  quantity: number;
};

type ListRowProps = {
  list: {
    id: string;
    title: string;
    items: ListItem[];
  };
};

function ListRow({ list }: ListRowProps) {
  const [, startTransition] = useTransition();

  const total = list.items.length;
  const packed = list.items.filter((item) => item.packed).length;
  const progressPercent = total > 0 ? Math.round((packed / total) * 100) : 0;
  const unpackedCount = list.items.filter((item) => !item.packed).length;
  const needsPacking = total > 0 && unpackedCount > 0;
  const unpackedPreview = list.items
    .filter((item) => !item.packed)
    .slice(0, 3)
    .map((item) => item.name);

  function handleDelete(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete "${list.title}"?`)) {
      startTransition(async () => {
        await deleteList(list.id);
      });
    }
  }

  return (
    <div className='group relative rounded-xl border border-silver bg-white shadow-sm transition-all duration-200 hover:border-navy/25 hover:shadow-md'>
      <Link
        href={`/lists/${list.id}`}
        className='block rounded-xl p-4 pr-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 focus-visible:ring-offset-2'
      >
        <div className='flex items-start gap-2'>
          <div className='min-w-0 flex-1'>
            <h3 className='text-base font-semibold text-navy truncate'>{list.title}</h3>
            <p className='mt-0.5 text-sm text-steel'>
              {total === 0
                ? 'No items yet'
                : needsPacking
                  ? `Continue packing · ${packed} of ${total}`
                  : `${packed} of ${total} packed`}
            </p>
          </div>
          <ChevronRight
            className='mt-0.5 h-5 w-5 shrink-0 text-steel/50 transition-colors group-hover:text-navy'
            aria-hidden
          />
        </div>

        {total > 0 && (
          <div className='mt-3'>
            <div
              className='h-1.5 w-full overflow-hidden rounded-full bg-silver/60'
              role='progressbar'
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${packed} of ${total} items packed`}
            >
              <div
                className='h-full rounded-full bg-navy transition-all'
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {unpackedPreview.length > 0 && (
          <p className='mt-2 text-xs text-steel truncate'>
            Still to pack: {unpackedPreview.join(', ')}
            {unpackedCount > 3 ? '...' : ''}
          </p>
        )}
      </Link>

      <button
        type='button'
        onClick={handleDelete}
        className='absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-steel/70 hover:bg-red-50 hover:text-red-600 transition-colors'
        aria-label={`Delete ${list.title}`}
      >
        <Trash2 className='h-4 w-4' />
      </button>
    </div>
  );
}

export default ListRow;
