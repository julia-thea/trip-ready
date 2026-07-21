'use client'
import { editListTitle } from "../actions/lists";

function EditableListTitle(props) {
    console.log("Props=> ", props)
    return (
        <div>I am title</div>
        // <h1 className='text-3xl font-bold text-navy mb-6'>{list.title}</h1>
    )
}

export default EditableListTitle;
