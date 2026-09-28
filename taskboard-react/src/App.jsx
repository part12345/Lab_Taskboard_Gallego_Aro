import { useState } from 'react';
import LoginForm from './LoginForm';
import ProjectList from './ProjectList';
import AddProjectForm from './AddProjectForm';
import LogoutButton from './LogoutButton';

function App() {
    const [token, setToken] = useState(
        localStorage.getItem('token')
    );

    const [refresh, setRefresh] = useState(0);

    function handleLogin(newToken) {
        setToken(newToken);
    }

    function handleLogout() {
        setToken(null);
    }

    function handleProjectAdded() {
        setRefresh((value) => value + 1);
    }

    if (!token) {
        return <LoginForm onLogin={handleLogin} />;
    }

    return (
        <div className="container">
            <h1>TaskBoard</h1>

            <LogoutButton onLogout={handleLogout} />

            <AddProjectForm
                onProjectAdded={handleProjectAdded}
            />

            <ProjectList refresh={refresh} />
        </div>
    );
}

export default App;