import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CommunityCard({ title = "Card Title", text = "description", buttonText = "Join", onClick }) {
    return (
        <Card className="card">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Button variant="primary" onClick={onClick}>{buttonText}</Button>
            </Card.Body>
        </Card>
    );
}

export default CommunityCard;
