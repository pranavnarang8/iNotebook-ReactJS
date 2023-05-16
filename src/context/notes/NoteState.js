import { useState } from "react";
import noteContext from "./NoteContext";
import { useHistory } from "react-router-dom";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
    const[notes, setNotes] = useState(notesInitial)
    const[user, setUser] = useState()
    const [sub, setSub] = useState([])
    const[total, setTotal] = useState(0)
    const[buyNow, setBuyNow] = useState(0.00)
    const[userDetails, setUserDetails] = useState({name:"", email:""})
    const[additional, setAdditional] = useState({contact:"", address:"", locality:"", city:"", state:"", zip:""})
    

    //get all Notes
    const getNotes = async ()=>{
      //API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        
      });
      const json = await response.json()
      // console.log(json)
      setNotes(json)
    }
    
    //Add a note
    const addNote = async (title, description, tag)=>{
      //API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        
        body: JSON.stringify({title, description, tag}), 
      });
      console.log(response)
      
      //Logic to add Note
      const note = await response.json()
      setNotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = async (id)=>{
      console.log("Deleting the note with " + id);
      
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        
      });
      console.log(response)
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }

    //edit a note
    const editNote = async (id, title, description, tag)=>{
      //API Call
      
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        
        body: JSON.stringify({title, description, tag}), 
      });
      const json = await response.json()
      console.log(json)
      //Logic to edit
      let newNotes = JSON.parse(JSON.stringify(notes))
      for(let i=0; i < newNotes.length; i++){
        const element = newNotes[i];
        if(element._id===id){
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
        
      }
      setNotes(newNotes)
    }
    //fetch user details of logged in user
    const fetchUser = async()=>{
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST", 
        headers: {
          // "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        
      });
      const json = await response.json();
      console.log(json)
      setUser("Welcome " + json.name)
      setUserDetails({name: json.name, email: json.email})
    }
    //Get Products
    const products = [{
        title: "Rememberall",
        description: "Set your reminders for each note with a date and time of your picking to ensure you don't miss any deadlines",
        price:"6.99$ Annually"
      },{
        title: "Personalized Calendar",
        description: "Add personal events and access them on the go, this product includes the note reminder features as well",
        price:"8.99$ Annually"
      },{
        title: "Share Your Notes",
        description: "Share your Notes with friends and family, link notes for everybody to see and edit/delete as per pre-defined access",
        price:"11.99$ Annually"
      },{
        title: "Task Manager",
        description: "Create your own tasks, edit them, add a deadline to ensure timely completion and keep track of completed tasks",
        price:"4.99$ Annually"
      },{
        title: "In-Sync",
        description: "Link your notes to your email account, giving you the option to work your iNotebook from your email account",
        price:"12.99$ Annually"
      }]

      //fetch cart items
      const getCartItems = async ()=>{
        //API Call
        const response = await fetch(`${host}/api/cart/fetchcartitems`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          
        });
        const json = await response.json()
        console.log(json)
        setSub(json)
        let newTotal = total
        for (let i = 0; i < json.length; i++) {
          const element = json[i].price;
          newTotal = newTotal + element
          }
        setTotal(newTotal)
      }

      //Add to cart
      const addToCart = async (product)=>{
        //  let newSub = product
         let newTotal = total
        let result = await sub.find(({title})=>title === product.title)
        if(!result){
          const response = await fetch(`${host}/api/cart/addcartitem`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({"title": product.title,"description": product.description,"price": parseFloat(product.price)}),
            
          });
          let newSub = await response.json()
          setSub(sub.concat(newSub))
          setTotal(newTotal + parseFloat(product.price))
        }else{
          alert("Subscription Already Added")
        }  
      }

      //remove Item from Cart
      const removeCartItem = async (prod, id)=>{
        const response = await fetch(`${host}/api/cart/removecartitem/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify(prod)
        });
        console.log(response)
        const newItems = sub.filter((product)=>{return product._id!==prod._id})
        let newTotal = total
        setSub(newItems)
        setTotal(newTotal - parseFloat(prod.price))
      }

      //Once cart is purchased
      const emptyCart = async (prod)=>{
        for(let i=0; i<sub.length; i++){
          const response = await fetch(`${host}/api/cart/removecartitem/${prod[i]._id}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
          });
          console.log(response)
          const newItems = sub.filter((product)=>{return product._id!==prod[i]._id})
          let newTotal = total
          setSub(newItems)
        }
        setTotal(0)
      }

      //Buy Now option
      const buyItemNow = async(product)=>{
          let newPrice = await parseFloat(product.price)
          console.log(newPrice)
          await setBuyNow("Pay " + newPrice + "$")
      }

      //fetch additional details
      const getAddDetails = async ()=>{
        //API Call
        const response = await fetch(`${host}/api/additionaldetails/fetchdetails`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          
        });
        const addJson = await response.json()
        setAdditional({contact:addJson.contact, address:addJson.address, locality:addJson.locality, city:addJson.city, state:addJson.state, zip:addJson.zip})

      }

      //save additional details
      const saveAddDetails = async (contact, address, locality, city, state, zip)=>{
        //API Call
        const response = await fetch(`${host}/api/additionaldetails/savedetails`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          
          body: JSON.stringify({contact, address, locality, city, state, zip}), 
        });
        const json = await response.json()
        console.log(json)
        
        //Logic to add Note
        // const note = await response.json()
        // setNotes(notes.concat(note))
      }

      
   
    return(
        //value can be passed as {{state, update}} as well as it is equivalent to {{state:state, update:update}}
        // <noteContext.Provider value={{state, update}}>
        <noteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes, fetchUser, user, products, sub, addToCart, total, removeCartItem, getCartItems, emptyCart, buyNow, buyItemNow, userDetails, getAddDetails, additional, saveAddDetails}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;