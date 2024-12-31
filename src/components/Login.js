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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2OTM3MmRjYzYyY2FjNWVhMmJkOGNmIn0sImlhdCI6MTczNTAyMzI0NH0.w57j63HKkNbjvjar0pnAXmWh1bGZzsBUCAImSJGwAL4"
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password})
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Loged in Successfully", "success");
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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
