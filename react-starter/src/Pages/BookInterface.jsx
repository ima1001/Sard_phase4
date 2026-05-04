import { useParams } from 'react-router-dom';
//import books from '../../data/booksData.json';
import { useState, useEffect } from 'react';
import NavTabs from '../components/NavTabs';

export default function BookInterface() {
    const { bookId } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        fetch(`${import.meta.env.VITE_API_URL}/api/projects/${bookId}`)
            .then(res => res.json())
            .then(data => setProject(data))
            .catch(err => console.error("Failed to load projects:", err));
    }, [bookId]);

    const handleSave = async (updatedFields) => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${project._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: updatedFields.title,
                numAuthors: updatedFields.authors,
                accessibility: updatedFields.accessibility,
                communityNames: updatedFields.selectedCommunities
            })
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>

            {/* Row 1 — book title */}
            <div style={{ padding: '48px 20px 36px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '3rem', fontWeight: 400, margin: 0, color: '#30364F' }}>
                    {(!project) ? <div>Loading...</div> : project.name}
                </h1>
            </div>

            {/* Row 2 — book description */}
            <div style={{ padding: '1px 56px 1px 56px', textAlign: 'center ', fontStyle: 'italic' }}>
                <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '1.70rem', fontWeight: 300, margin: 0, color: '#30364F'}}>
                    {(!project) ? <div>Loading...</div> : project.description}
                </h2>
            </div>

            {/* Row 3 — NavTabs bar + content area with position:relative for card anchoring */}
            <div style={{ flex: 1 }}>
                <NavTabs book={project} handleSave={handleSave} />
            </div>

        </div>
    );
}
