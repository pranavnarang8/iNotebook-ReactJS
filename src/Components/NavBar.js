import React, {useContext, useEffect} from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import noteContext from '../context/notes/NoteContext';

const NavBar = () => {
  let context = useContext(noteContext)
  const {fetchUser, user} = context
  
  let history = useHistory()
  let location = useLocation()
  useEffect(()=>{
    if(localStorage.getItem('token')){
    // console.log(location)
    // console.log(location.pathname)
    fetchUser()
    }
  },[location])

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    history.push("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex mx-2">
          <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-2" to="/signup"role="button">Signup</Link>
          </form> : 
          <form className="d-flex mx-8">
            {/* <button onClick={dropDown} className="btn btn-dark">{user}</button> */}
            <div className="dropdown">
            <button class="btn btn-dark dropdown-toggle mx-6" type="button"  data-bs-toggle="dropdown" aria-expanded="false">{user}</button>
           <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/profile">Your Profile</Link></li>
            <li><Link class="dropdown-item" to="/store">iNotebook Store</Link></li>
            <li><Link class="dropdown-item" onClick={handleLogout}>Logout</Link></li>
          </ul>
          </div>
            {/* <button onClick={handleLogout} className="btn btn-primary mx-2" >Logout</button>  */}
          </form>}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
