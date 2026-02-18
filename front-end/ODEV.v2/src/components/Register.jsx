import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Register(){
    const [first_name, setFirstname] = useState("")  
    const [last_name, setLastname] = useState("") 
    const [email, setEmail] = useState("")  
    const [username, setUsername] = useState("") ;
    const [password, setPassword] = useState("") ;
    const [phone_number, setPhone_Number] = useState("");
    const [type, setType] = useState('user') 
    const [result, setResult] = useState("")
    const navigate = useNavigate()


    async function handleSubmit(event){
        event.preventDefault();
        try {
            const response = await fetch('https://odev-l26v.onrender.com/users/register',
                {
            method: "POST",
            headers: { 'Content-Type': 'application/json',},
            body: JSON.stringify({
                username: username,
                password: password,
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                type: 'user'
            })
            })

            const result = await response.json();
            console.log(result);

            if(result.token){
                navigate("/login")
            }
        
            localStorage.setItem("token", result.token)
    



           setResult(result)
        } catch (error) {
            console.error(error);
        }




    }

    return(
        <div className="reg-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Username:</label>
                <input className="login-input" value={username} onChange={(event)=>setUsername(event.target.value)} required></input>
                <br></br>
                <label>Password:</label>
                <input  className="login-input" value={password} onChange={(event)=>setPassword(event.target.value)} required></input>
                <br></br>
                <label>First Name:</label>
                <input  className="login-input" value={first_name} onChange={(event)=>setFirstname(event.target.value)} required></input>
                <br></br>
                <label>Last Name:</label>
                <input  className="login-input" value={last_name} onChange={(event)=>setLastname(event.target.value)} required></input>
                <br></br>
                <label>Email:</label>
                <input  className="login-input" value={email} onChange={(event)=>setEmail(event.target.value)} required></input>
                <br></br>
                <label>Phone Number:</label>
                <input  className="login-input" value={phone_number} onChange={(event)=>setPhone_Number(event.target.value)} required></input>
                <br></br>
                <button className="login">Submit</button>
            </form>
        </div>
    ) 

}