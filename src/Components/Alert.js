import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {
      if(word==="danger"){
        word = "error"
      }
        const lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    //When props.alert = null, you will not get the alert div...this is a very popular syntax
    <div style={{height:"40px"}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
    </div>}
    </div>
  )
}

