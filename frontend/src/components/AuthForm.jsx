import React, { useState} from 'react';
import axios from "axios";
import {useUser} from "../context/UserContext";
import {BACKEND_URL} from "../utils";

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { saveUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${BACKEND_URL}/api/auth`, {username, password})
            saveUser(response.data.user);
        } catch (err){
            console.log(err.message);
            setError(err.message);
        }
    }

    return (
        <div className="auth-parent">
            <div className="auth-container">
                <h2>Login/Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    <button className="secondary" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;