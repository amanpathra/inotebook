import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note, updateNote, showAlert } = props;

    const context = useContext(noteContext)
    const { deleteNote } = context;

    return (
        <div className='col-3'>
            <div className="card my-2">
                <div className="card-body overflow-hidden">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); showAlert('Note Deleted Successfully.', 'danger')}}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
