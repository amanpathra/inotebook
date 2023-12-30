import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = 'http://localhost:5000/api/notes'

    const [notes, setNotes] = useState([])

    // Get all notes
    const getAllNotes = async () => {
        const response = await fetch(`${host}/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        })
        const allNotes = await response.json();
        setNotes(allNotes)
    }

    // Add a note
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();

        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const note = await response.json();

        console.log(note.Success + ' with id ' + id)

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        let newNote = JSON.parse(JSON.stringify(notes))
        for (let idx in newNote) {
            if (newNote[idx]._id === id) {
                newNote[idx].title = title;
                newNote[idx].description = description;
                newNote[idx].tag = tag;
                break;
            }
        }
        setNotes(newNote)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
