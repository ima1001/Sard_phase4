import { useParams } from 'react-router-dom';
import books from '../../data/booksData.json';
import NavTabs from '../components/NavTabs';

export default function BookInterface() {
    const { bookId } = useParams();
    const book = books.find(b => b.name === bookId) || books[0];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>

            {/* Row 1 — book title */}
            <div style={{ padding: '48px 20px 36px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '3rem', fontWeight: 400, margin: 0 }}>
                    {book.name}
                </h1>
            </div>

            {/* Row 2 — NavTabs bar + content area with position:relative for card anchoring */}
            <div style={{ flex: 1 }}>
                <NavTabs />
            </div>

        </div>
    );
}
