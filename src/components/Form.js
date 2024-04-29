import { useState } from "react";

const Form = (props) => {
  const [loginID, setLoginID] = useState('')
  const [password, setPassword] = useState('')
  const {setVisibility, setImg, setUserFirstName, setUserLastName} = props

  const handleLoginID = (event) => {
    setLoginID(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const loginAPI = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: loginID,
        password: password ,
      })
    })
    .then(response => response.json())
    .then(response => {
      response.message === 'Invalid credentials' ? alert(response.message) : handleLogin(response)
      console.log('response(loginAPI()):',response)
    })
    .catch(err => alert("Something went wrong!"))
  }

  const setUserDetails = (response) => {
    const img = response.image
    const userFirstName = response.firstName
    const userLastName = response.lastName
    setUserFirstName(userFirstName)
    setUserLastName(userLastName)
    setImg(img)
  }

  const fetchUserInfo = (token) => {
    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
      }, 
    })
    .then(response=>response.json())
    .then(response=>{console.log("From FetchUserInfo",response); setUserDetails(response)})
  }
  
  const handleLogin = (response) => {
    let token = response.token
    setVisibility(false)
    fetchUserInfo(token)
  }


  return (
    <div
      className="d-flex flex-column img-fluid"
      style={{ padding: "20px", width: "70%", height: "70%" }}
    >
      <h2 style={{ fontWeight: "bold", marginBottom: "30px" }}>Login</h2>
      <label style={{ color: "gray" }}>
        Login ID<span style={{ color: "red" }}>*</span>
      </label>
      <input
        type="email"
        value={loginID}
        style={{
          outline: "none",
          marginBottom: "30px",
          borderBottom: "2px solid gray",
          backgroundColor: "transparent",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
        }}
        onChange={handleLoginID}
      />
      <label style={{ color: "gray" }}>
        Password<span style={{ color: "red" }}>*</span>
      </label>
      <div className="d-flex flex-column-reverse align-items-end">
        <input
            type="password"
            value={password}
            style={{
            outline: "none",
            marginTop: "-15px",
            marginBottom: "15px",
            borderBottom: "2px solid gray",
            backgroundColor: "transparent",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            width: "100%"
            }}
            onChange={handlePassword}
        />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eye-slash"
            viewBox="0 0 16 16"
            style={{position: "relative", top: "10px"}}
        >
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
        </svg>
      </div>
      <a
        href="./"
        style={{
          color: "red",
          textDecoration: "none",
          textAlign: "end",
          marginBottom: "80px",
        }}
      >
        Forgot Password?
      </a>
      <button
        style={{
          borderRadius: "5px",
          color: "white",
          paddingTop: "10px",
          paddingBottom: "10px",
          backgroundColor: "#0050cb",
          border: "none",
          cursor: "pointer",
        }}
        onClick={loginAPI}
      >
        LOGIN
      </button>
    </div>
  );
};

export default Form;
