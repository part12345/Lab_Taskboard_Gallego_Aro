import { useEffect, useState } from 'react';
import { api } from './api';

function ProjectList({ refresh }) {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');

    async function loadProjects() {
        try {
            setError('');

            const data = await api('/projects');

            setProjects(data.data || []);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadProjects();
    }, [refresh]);

    return (
        <div>
            <h2>Projects</h2>

            {error && (
                <p style={{ color: 'red' }}>
                    {error}
                </p>
            )}

            {projects.length === 0 ? (
                <p>No projects yet.</p>
            ) : (
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>
                            <strong>{project.name}</strong>
                            {' - '}
                            {project.tasks_count ?? 0} task(s)
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProjectList;