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
      // Blur triggers a single save path (avoids Enter + blur double-save)
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
          className='w-full text-3xl font-bold text-navy bg-white border border-silver rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy disabled:opacity-60'
        />
        <p className='mt-2 text-xs text-steel'>Enter to save · Esc to cancel</p>
        {error && (
          <p className='mt-1 text-sm text-red-500' role='alert'>
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className='mb-6 flex items-center gap-3'>
      <h1 className='text-3xl font-bold text-navy'>{title}</h1>
      <button
        type='button'
        onClick={startEditing}
        className='inline-flex items-center gap-1.5 text-sm font-medium text-steel hover:text-navy px-2.5 py-1.5 rounded-lg hover:bg-sky/60 transition-colors'
        title='Edit title'
      >
        <Pencil className='w-4 h-4' aria-hidden />
        Edit
      </button>
    </div>
  );
}

export default EditableListTitle;
