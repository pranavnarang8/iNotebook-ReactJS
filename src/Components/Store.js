import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/NoteContext";
import CartList from './CartList';
import StoreItem from './StoreItem';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Store = (props) => {
    const{showAlert} = props
    const context = useContext(noteContext)
    const {products, sub, total, getCartItems} = context
    let history = useHistory()
    useEffect(()=>{
      if(localStorage.getItem('token')){
      getCartItems()
      }
      // eslint-disable-next-line
    },[])

    const onCartBuy = ()=>{
      history.push("/payment")
    }
  return (    
    <div className="row my-3">
        <h3>Subscriptions</h3>
        <div className="conatiner"></div>
      {products.map((product)=>{
        return (
            <StoreItem showAlert={showAlert} key={product.title} product={product} />
        )
      })}

      <h5>Cart Total : {total.toFixed(2)}$</h5>
        {sub.map((subs)=>{
            return(
                <CartList subs={subs} showAlert={showAlert}/>
            )
        })}
        <form className='my-3'>
        <button onClick={onCartBuy} className="btn btn-warning">Proceed to Buy Cart Items</button>
        </form>
    
    </div>
   

  )
}

export default Store
