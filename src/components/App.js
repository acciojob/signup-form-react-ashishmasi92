import React, { Component, useRef, useState } from "react";
import '../styles/App.css';

const App = () => {
  let [userName, setUserName] = useState("")
  let [error, setError] = useState("")
  let [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    gender: "male"
  })
  let { name, email, password, number, gender } = state;

function isAlphanumeric(str) {
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    const c = str[i].toLowerCase();
    if (
      !(
        (code >= 48 && code <= 57) || // 0-9
        (code >= 97 && code <= 122) || // a-z
        c === ' '
      )
    ) {
      return false;
    }
  }
  return true;
}
 


  function formValidation() {


    if (!name || !email || !password || !number) {
      setError("All fields are mandatory")
      return false

    }


// Then inside formValidation:
if (!isAlphanumeric(name)) {
  setError("Name is not alphanumeric");
  return false;
}
    
    if (!email.includes("@")) {
      setError("Email must contain @")
      return false
    }
    if (password.length < 6) {
      setError("Password must contain atleast 6 letters")
      return false
    }
    if (number === "" || number.split("").some(char => isNaN(char))) {
      setError("Phone Number must contain only numbers");
      return false;
    }
    if (!["male", "female", "other"].includes(gender)) {
      setError("Please identify as male, female or others")
      return false
    }


    setError("")
    return true
  }


  function handleChange(e) {
    let { name, value } = e.target;
    setState({ ...state, [name]: value })
    setError("")

  }



  function handleSubmit(e) {
    e.preventDefault();



    if (formValidation()) {
      let index = email.indexOf("@")
      setUserName(email.slice(0, index))

      alert("form submitted successfully")

    }
    else {
      setUserName("")
    }


  }


  return (
    <div id="main" >
      <form onSubmit={handleSubmit} style={{ width: "200px", display: "flex", flexDirection: "column" }}>


        <label>
          Name:
          <input type="text" name="name" data-testid='name' onChange={handleChange} value={state.name} />
        </label>
        <label>
          Email:
          <input type="email" name="email" data-testid='email' onChange={handleChange} value={state.email} />
        </label>

        <select data-testid='gender' name="gender" value={state.gender} onChange={handleChange} >
          <option value="male" >Male</option>
          <option value="female" >Female</option>
          <option value="other" >other</option>
        </select>
        <label>
          Phone Number:
          <input type="text" onChange={handleChange} data-testid='phoneNumber' name="number" value={state.number} />
        </label>

        <label>
          Password:
          <input type="password" data-testid='password' onChange={handleChange} name="password" value={state.password} />
        </label>
        <button type="submit" data-testid="submit" >Submit</button>
      </form>
      {error && <span data-testid="error" style={{ color: "red" }}>{error}</span>}
      {userName !== "" ? <h2>Hello {userName.toUpperCase()}</h2> : ""}
    </div>
  )
}


export default App;
