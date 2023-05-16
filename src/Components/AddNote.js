import React, { useState }from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(noteContext)
  //destructuring context
  const {notes, addNote} = context
  const {showAlert} = props
  const[note, setNote] = useState({title: "", description:"", tag:""})
  const onChange = (e)=>{
    // console.log(e.target)
    // console.log(note)
    // debugger
    //The e.target.name is in square brackets for dynamically updating the property. This way you could have multiple React inputs having a different name property and using the same onChange handler to update part of the state.
    //...note is used to destructure the note variable, check it in the debugger
    setNote({...note, [e.target.name]: e.target.value})
  }

  const handleClick = (e)=>{
    //To prevent page from reloading
    e.preventDefault()
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description:"", tag:""})
    showAlert("Note Added","success")
  }
  return (
    <div>
      <div className="container my-3">
        { (notes.length===0)?<h3>Get Started</h3> : <h3>Add Another</h3>}
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          
          <button disabled={note.title.length<3 || note.description.length<6} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
