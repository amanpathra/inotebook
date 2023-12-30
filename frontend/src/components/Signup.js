import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [creds, setCreds] = useState({ name:"", email: "", password: "", cpassword: "" });

    let navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password })
        })
        const json = await res.json();
        if (json.success) {
            props.showAlert('Account created successfully.', 'success')
            // Save the auth token
            localStorage.setItem('token', json.authToken)
            // Redirect
            navigate("/");
        } else {
            props.showAlert(json.error, 'danger')
        }
    }

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className='mb-4'>Create your iNotebook account</h2>
            <form onSubmit={signup} style={{ width: '40%' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={creds.name} onChange={onChange} required minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={creds.email} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={creds.password} onChange={onChange} required minLength={8}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={creds.cpassword} onChange={onChange} required minLength={8}/>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
