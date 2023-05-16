import React from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";

const Noteitem = (props) => {
  const context = useContext(noteContext)
  const {deleteNote} = context;
  //Destructuring
  const {note, updateNote, showAlert} = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);showAlert("Note Deleted","success")}}></i>
          <i className="fa-solid fa-pen mx-2" onClick={()=>updateNote(note)}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
