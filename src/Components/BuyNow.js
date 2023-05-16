import React, { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../context/notes/NoteContext";


const BuyNow = (props) => {
  const {showAlert} = props
  const context = useContext(noteContext)
  const { buyNow } = context
  let history = useHistory()
  const[card, setCard] = useState({cardNumber:"", cardHolder:"", expiry:"", cvv:""})
  
  const onChange = (e)=>{
    setCard({...card, [e.target.name]: e.target.value})
  }

  const confirmPayment = ()=>{
    showAlert("Congratulations!! You are now a proud subscriber of iNotebook Products","success")
    setCard({cardNumber:"", cardHolder:"", expiry:"", cvv:""})
    history.push("/store")
  }

  const cancelPayment = ()=>{
    showAlert("Your payment could not be processed","warning")
    history.push("/store")
  }
  return (
    <div>
      <form>
  <div className="mb-3">
    <label htmlFor="cardNumber" className="form-label">Debit/Credit Card Number</label>
    <input type="number" className="form-control" id="cardNumber" onChange={onChange} value={card.cardNumber} name="cardNumber" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your card details with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="cardHolder" className="form-label">Card Holder</label>
    <input type="text" className="form-control" id="cardHolder" value={card.cardHolder} onChange={onChange} name="cardHolder" aria-describedby="emailHelp"/> 
  </div>
  <div className="mb-3">
    <label htmlFor="expiry" className="form-label">Expiry Date</label>
    <input type="date" className="form-control" id="expiry" onChange={onChange} value={card.expiry} name="expiry" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cvv" className="form-label">CVV</label>
    <input type="password" className="form-control" id="cvv" name="cvv" value={card.cvv} onChange={onChange}/>
  </div>
  <button disabled={card.cardNumber.length!==16 || card.cardHolder.length<2 || card.cvv.length!==3 || !card.expiry} type="button" className="btn btn-success" onClick={confirmPayment}>Pay Now</button>
  <button className="btn btn-danger mx-2" type="button" onClick={cancelPayment}>Back to Store</button>
</form>
    </div>
  )
}

export default BuyNow
