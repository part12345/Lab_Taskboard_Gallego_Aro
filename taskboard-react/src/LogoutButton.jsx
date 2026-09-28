import { api } from './api';

function LogoutButton({ onLogout }) {
    async function handleLogout() {
        try {
            await api('/logout');
        } catch (err) {
            console.error(err);
        }

        localStorage.removeItem('token');

        onLogout();
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutButton;