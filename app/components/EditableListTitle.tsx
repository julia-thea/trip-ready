'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { Pencil } from 'lucide-react';
import { editListTitle } from '../actions/lists';

type EditableListTitleProps = {
  listId: string;
  title: string;
};

function EditableListTitle({ listId, title }: EditableListTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(title);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const skipBlurSaveRef = useRef(false);

  useEffect(() => {
    if (!isEditing) {
      setDraft(title);
    }
  }, [title, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  function startEditing() {
    setDraft(title);
    setError('');
    setIsEditing(true);
  }

  function cancelEditing() {
    skipBlurSaveRef.current = true;
    setDraft(title);
    setError('');
    setIsEditing(false);
  }

  function saveTitle() {
    if (skipBlurSaveRef.current) {
      skipBlurSaveRef.current = false;
      return;
    }

    const nextTitle = draft.trim();

    if (!nextTitle) {
      setError('Title is required');
      inputRef.current?.focus();
      return;
    }

    if (nextTitle === title) {
      setIsEditing(false);
      setError('');
      return;
    }

    startTransition(async () => {
      const result = await editListTitle(listId, nextTitle);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setError('');
      setIsEditing(false);
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current?.blur();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      cancelEditing();
    }
  }

  if (isEditing) {
    return (
      <div className='mb-6'>
        <label htmlFor='list-title' className='sr-only'>
          List title
        </label>
        <input
          id='list-title'
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveTitle}
          disabled={isPending}
          aria-label='List title'
          className='w-full text-3xl font-bold text-navy bg-ivory border border-silver rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy focus:bg-white disabled:opacity-60 transition-all'
        />
        <div className='mt-2 flex items-center justify-between gap-3'>
          <p className='text-xs text-steel'>
            {isPending ? 'Saving…' : 'Enter to save · Esc to cancel'}
          </p>
          {error && (
            <p className='text-sm text-red-500' role='alert'>
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='mb-6 flex flex-wrap items-center gap-3'>
      <h1 className='text-3xl font-bold text-navy'>{title}</h1>
      <button
        type='button'
        onClick={startEditing}
        className='inline-flex items-center gap-1.5 text-sm font-medium text-navy border border-silver bg-white hover:bg-sky/50 hover:border-navy/20 px-3 py-1.5 rounded-xl transition-colors'
        title='Edit title'
      >
        <Pencil className='w-3.5 h-3.5 text-steel' aria-hidden />
        Edit
      </button>
    </div>
  );
}

export default EditableListTitle;
