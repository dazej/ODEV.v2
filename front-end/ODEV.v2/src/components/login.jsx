import { useState } from "react";
import { useNavigate } from "react-router";
import { IoLogInOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

export default function Login({ setToken, setUser, user, token }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const response = await fetch('https://odev-l26v.onrender.com/users/login',
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
            const result = await response.json();
            console.log(result);
            setToken(result.token)
            setUser(result.user)

            localStorage.setItem("token", result.token)
            localStorage.setItem("user", JSON.stringify(result.user))

            if (result.token) {
                navigate("/products")
            } else {
                alert(result.message)
            }


        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="reg-container">
            <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Username:</label>
                <input className="login-input" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <br></br>
                <label>Password</label>
                <input className="login-input" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <br></br>
                <button className="login">Login<IoLogInOutline /></button>
            </form>
            </IconContext.Provider>
        </div>
    )
}