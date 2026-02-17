'use client'
import React from 'react';
import { useActionState } from 'react';
import { createItem } from '../actions/items';

function AddItemForm({ listId }: { listId: string }) {
  const [state, formAction, isPending] = useActionState(createItem, { error: '' });

  return (<>
    <div>AddItemForm</div>
    <form action={formAction}>
      <label>
        Item Name:
        <input type="text" name="itemName" />
      </label>
      <input type="hidden" name="listId" value={listId} />
      <input type="submit" value="Submit" />
    </form>
  </>
  )
}

export default AddItemForm