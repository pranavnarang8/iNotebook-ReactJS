import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import About from "./Components/About";
import Alert from "./Components/Alert";
import Home from "./Components/Home";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import Signup from "./Components/Signup";
import NoteState from "./context/notes/NoteState";
import { useState } from "react";
import Store from "./Components/Store";
import Profile from "./Components/Profile";
import Payment from "./Components/Payment";
import BuyNow from "./Components/BuyNow";

function App() {
  const[alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout (()=>{
      setAlert(null)

    }, 2000)
  }
  return (
    <>
    <NoteState>
    <Router>
    <NavBar/>
    <Alert alert={alert}/>
    <div className="container">
      <Switch>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/">
            <Home showAlert={showAlert}/>
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert}/>
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert}/>
          </Route>
          <Route exact path="/store">
            <Store showAlert={showAlert}/>
          </Route>
          <Route exact path="/profile">
            <Profile/>
          </Route>
          <Route exact path="/payment">
            <Payment showAlert={showAlert}/>
          </Route>
          <Route exact path="/buynow">
            <BuyNow showAlert={showAlert}/>
          </Route>
        </Switch>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
