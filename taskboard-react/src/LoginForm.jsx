import { useState } from 'react';
import { api } from './api';

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        setError('');

        try {
            const data = await api('/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            localStorage.setItem('token', data.token);

            onLogin(data.token);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container">
            <h1>TaskBoard</h1>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p style={{ color: 'red' }}>
                        {error}
                    </p>
                )}

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;