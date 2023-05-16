import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

const CartList = (props) => {
    const context = useContext(noteContext);
    const {removeCartItem} = context
    const {subs, showAlert} = props

  return (
    <div className='container'>
      <ul className="list-group">
  <li className="list-group-item d-flex justify-content-between align-items-center">
    {subs.title}
    {/* <span className="badge bg-primary rounded-pill">{subs.price}</span> */}
    <i className="fa-solid fa-trash mx-2" onClick={()=>{removeCartItem(subs, subs._id); showAlert("Removed from Cart","warning")}}></i>
  </li>
</ul>
    </div>
  )
}

export default CartList
