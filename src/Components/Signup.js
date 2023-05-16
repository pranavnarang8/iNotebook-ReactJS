import React , {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const[creds, setCreds] = useState({name:"", email:"", password:"", cpassword:""})
    let history = useHistory()
    const onChange = (e)=>{
        setCreds({...creds, [e.target.name]: e.target.value})
      }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(creds.password === creds.cpassword){
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: creds.name, email: creds.email, password: creds.password}),
            
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            //Save the auth-token and Redirect to Home
            localStorage.setItem('token', json.authtoken);
            history.push("/")
            props.showAlert("Account Created Successfully","success")

          }else{
            props.showAlert("Invalid Details","danger")
          }
        }else{
            props.showAlert("Passwords do not match","danger")
        }
    }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3 my-4">
        <h3>Signup to start using iNotebook</h3>
    <label htmlFor="name" className="form-label">Name</label>
    <input value={creds.name} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} required minLength={1}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input value={creds.email} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input value={creds.password} type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={8}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input value={creds.cpassword} type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required minLength={8}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
