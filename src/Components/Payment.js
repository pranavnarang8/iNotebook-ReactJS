import React, { useRef } from "react";
import { useContext, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Payment = (props) => {
  const {showAlert} = props
  const context = useContext(noteContext);
  const { total, getCartItems, emptyCart, sub} = context;
  const [payment, setPayment] = useState(false)
  let history = useHistory()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCartItems();
    }
    // eslint-disable-next-line
  }, []);

  const[card, setCard] = useState({cardNumber:"", cardHolder:"", expiry:"", cvv:""})

  const onChange = (e)=>{
    setCard({...card, [e.target.name]: e.target.value})
  }

  const confirmPayment = ()=>{
    emptyCart(sub)
    showAlert("Congratulations!! You are now a proud subscriber of iNotebook Products","success")
    setPayment(true)
    
  }

  const cancelPayment = ()=>{
    if(total!==0){
      showAlert("Your payment could not be processed","warning")
    }
    history.push("/store")
  }


  return (
    <div>
    { (!payment && <form>
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
  <button disabled={card.cardNumber.length!==16 || card.cardHolder.length<2 || card.cvv.length!==3 || !card.expiry} type="button" className="btn btn-primary" onClick={confirmPayment}>Pay {total.toFixed(2)}$</button>
  <button className="btn btn-danger mx-2" type="button" onClick={cancelPayment}>Back to Store</button>
</form>) }
{(payment && 
<div className="container d-flex justify-content-center">
<div className="card text-center" style={{width: "18rem"}}>
<img src="https://img.freepik.com/premium-vector/success-payment-icon-flat-style-approved-money-vector-illustration-isolated-background-successful-pay-sign-business-concept_157943-1354.jpg?w=740" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title text-center">Congratulations!</h5>
    <p className="card-text">Please refresh your browser or login again to activate your subscription.</p>
    <Link to="/store" className="btn btn-danger" style={{marginLeft:"auto", marginRight:"auto"}}>Back to Store</Link>
  </div>
</div>
</div>)}
</div>
  );
};

export default Payment;
