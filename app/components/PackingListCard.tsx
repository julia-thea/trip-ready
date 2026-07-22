type PackingListItem = {
  name: string;
  packed: boolean;
};

type PackingListCardProps = {
  title?: string;
  items: PackingListItem[];
  className?: string;
};

export default function PackingListCard({
  title = 'Reykjavik weekend',
  items,
  className = '',
}: PackingListCardProps) {
  const packedCount = items.filter((item) => item.packed).length;
  const percent =
    items.length === 0 ? 0 : Math.round((packedCount / items.length) * 100);

  return (
    <div className={`relative w-full max-w-md mx-auto lg:mx-0 lg:max-w-none ${className}`}>
      <div className='absolute -inset-4 rounded-[2rem] bg-navy/5 blur-2xl' aria-hidden />
      <div className='relative overflow-hidden rounded-2xl border border-silver bg-white shadow-xl shadow-navy/10'>
        <div className='border-b border-silver bg-ivory px-5 py-4'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <p className='text-xs font-medium uppercase tracking-wide text-steel'>
                Packing list
              </p>
              <p className='text-lg font-semibold text-navy'>{title}</p>
            </div>
            <span className='rounded-full bg-sky px-3 py-1 text-xs font-semibold tabular-nums text-navy transition-all duration-300'>
              {percent}%
            </span>
          </div>
          <div className='mt-3 h-2 overflow-hidden rounded-full bg-silver'>
            <div
              className='h-full rounded-full bg-royal transition-[width] duration-300 ease-out'
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <ul className='divide-y divide-silver/80 px-2 py-1'>
          {items.map((item) => (
            <li
              key={item.name}
              className={`flex items-center justify-between gap-3 px-3 py-3 transition-all duration-300 ${
                item.packed ? 'bg-sky/30' : ''
              }`}
            >
              <span
                className={`text-sm font-medium transition-all duration-300 ${
                  item.packed ? 'text-steel line-through' : 'text-slate'
                }`}
              >
                {item.name}
              </span>
              <span
                className={`text-xs font-semibold transition-colors duration-300 ${
                  item.packed ? 'text-royal' : 'text-steel'
                }`}
              >
                {item.packed ? 'Packed' : 'Not packed'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
