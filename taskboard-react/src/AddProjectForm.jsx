import { useState } from 'react';
import { api } from './api';

function AddProjectForm({ onProjectAdded }) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        setError('');

        try {
            const data = await api('/projects', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                }),
            });

            onProjectAdded(data.data);

            setName('');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <h2>Add Project</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Project name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <button type="submit">
                    Add Project
                </button>
            </form>

            {error && (
                <p style={{ color: 'red' }}>
                    {error}
                </p>
            )}
        </div>
    );
}

export default AddProjectForm;