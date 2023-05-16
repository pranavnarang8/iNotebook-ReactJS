import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import { Link, useHistory } from 'react-router-dom'

const StoreItem = (props) => {
    let history = useHistory()
    const {product, showAlert} = props
    const context = useContext(noteContext)
    const {addToCart, buyItemNow} = context
    const payNow = ()=>{
       history.push("/buynow")
    }
  return (
    
      <div className='col-md-4 my-3'>
            <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <button onClick={()=>{buyItemNow(product);payNow()}} className="btn btn-primary">{product.price}</button>
            <i className="fa-solid fa-cart-plus fa-xl mx-3" onClick={()=>{addToCart(product);showAlert("Added to Cart","success")}}></i>
            </div>
            </div>
            </div>
   
  )
}

export default StoreItem
