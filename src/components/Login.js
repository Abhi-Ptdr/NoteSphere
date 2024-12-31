import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Login(props) {

  const [credentials, setCredentials] = useState({email: "", password: ""})

  //use history hook to redirect
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();   //to prevent page reload
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password})
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Loged in Successfully", "success");
      navigate("/");
    }
    else{
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => { 
    //using spread operator(...) which keep note as is and add or ovwrwrite the value in targeted input field 
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

  return (
    <div className='mt-3'>
      <h2>Login to continue to NoteSphere</h2>

      <form className='mt-3' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password"/>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
