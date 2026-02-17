'use client';
import { useState, useActionState } from 'react';
import { createList } from '../actions/lists';
import Button from './Button';

function CreateListForm() {
    const [title, setTitle] = useState('');
    const [state, formAction, isPending] = useActionState(createList, { error: '' });

    return (
        <>
            <div className='bg-white border border-silver rounded-xl p-6'>
                <div className='w-full'>
                    <form className='space-y-6' action={formAction}>
                        <div>
                            <input
                                name='title'
                                id='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border ${state.error
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-silver focus:border-navy focus:ring-navy'
                                    } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
                                placeholder='list title'
                            />
                            {state.error && <p className='mt-2 text-sm text-red-500'>{state.error}</p>}
                        </div>
                        <Button type='submit' variant='secondary' disabled={isPending} fullWidth>
                            {isPending ? 'Creating...' : 'Create List'}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateListForm;
