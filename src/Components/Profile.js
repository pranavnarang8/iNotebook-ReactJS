import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

const Profile = () => {
  const context = useContext(noteContext)
  const { saveAddDetails, additional , fetchUser , userDetails, getAddDetails} = context
  const [add, setAdd] = useState({contact:"", address:"", locality:"", city:"", state:"", zip:""})
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAddDetails();
    }
    // eslint-disable-next-line
  }, []);
  const onChange = (e)=>{
    setAdd({...add, [e.target.name]: e.target.value})
  }

  const handleClick = (e)=>{
     e.preventDefault()
     saveAddDetails(add.contact, add.address, add.locality, add.city, add.state, add.zip)
     console.log(add)
  }

  return (
    <div className="container">
      {/* <h5 className="center">Your Profile</h5> */}
      <form className="row g-3">
  {/* <div className="col-md-6">
    <label htmlFor="inputEmail4" className="form-label">Name</label>
    <input type="email" readOnly value={basic.name}  className="form-control" id="inputEmail4"/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputPassword4" className="form-label">Email Address</label>
    <input type="text" readOnly value={basic.email}  className="form-control" id="inputPassword4"/>
  </div> */}
  
  <h5>Additional Information (Optional)</h5>
  {/* <button className="btn btn-warning">Update Now</button> */}
  <div className="col-12">
    <label htmlFor="contact" className="form-label">Contact Number</label>
    <input type="tel" value={add.contact} className="form-control" id="contact" name="contact" onChange={onChange}/>
  </div>
  <div className="col-12">
    <label htmlFor="address" className="form-label">Address</label>
    <input type="text" value={add.address} className="form-control" id="address" name="address" onChange={onChange}/>
  </div>
  <div className="col-12">
    <label htmlFor="locality" className="form-label">Locality</label>
    <input type="text" value={add.locality} className="form-control" id="locality" name="locality" onChange={onChange}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="city" className="form-label">City</label>
    <input type="text" value={add.city} className="form-control" id="city" name="city" onChange={onChange}/>
  </div>
  <div className="col-md-4">
    <label htmlFor="state" className="form-label">State</label>
    <input type="text" value={add.state} className="form-control" id="state" name="state" onChange={onChange}/>
  </div>
  <div className="col-md-2">
    <label htmlFor="zip" className="form-label">Zip</label>
    <input type="number" value={add.zip} className="form-control" id="zip" name="zip" onChange={onChange}/>
  </div>
  <div className="col-12">
    <button className="btn btn-success" onClick={handleClick}>Save Details</button>
  </div>
</form>
      
    </div>
  )
}

export default Profile
