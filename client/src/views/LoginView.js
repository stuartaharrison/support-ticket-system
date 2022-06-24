import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuthenticateMutation, useGetSessionQuery } from "../redux/apis/authApi";

const LoginView = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticate, { error: authError }] = useAuthenticateMutation();
    const { data: session } = useGetSessionQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authenticate({ username, password }).unwrap().then(r => {
            navigate('/', { replace: true }); 
        }).catch(_ => {});
    };

    if (session) {
        return <Navigate to="/" replace />
    }
    
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {authError && (
                    <p className="text-danger">{authError.data.message}</p>
                )}
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginView;