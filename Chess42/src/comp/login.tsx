import React, { useState, useRef} from "react";
import './login.css'
const Login : React.FC = () => {


    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Logging in with username: ${username}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    );

}

export default Login