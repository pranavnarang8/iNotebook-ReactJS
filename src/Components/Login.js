import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const[creds, setCreds] = useState({email:"", password:""})
    let history = useHistory()
    const onChange = (e)=>{
        setCreds({...creds, [e.target.name]: e.target.value})
      }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: creds.email, password: creds.password}),
            
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            //Save the auth-token and Redirect to Home
            localStorage.setItem('token', json.authtoken);
            history.push("/")
            props.showAlert("Login Successful","success")

          }else{
            props.showAlert("Invalid Credentials","danger")
          }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="mb-3 my-4">
    <h3>Login to Access your Notes</h3>
    <label htmlFor="email" className="form-label">Email address</label>
    <input value={creds.email} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input value={creds.password} type="password" className="form-control" id="password" name="password" onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login