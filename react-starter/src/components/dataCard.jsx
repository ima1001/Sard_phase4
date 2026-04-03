import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function DataCard({ title = "Card Title", text = "description", imageSrc = "/assets/logoB.png", buttonText = "Join", onClick }) {
    return (
        <Card className="card">
        {/* <Card.Img variant="top" src={imageSrc} /> */}
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
            {text}
            </Card.Text>
            <Button variant="primary" onClick={onClick}>{buttonText}</Button>
        </Card.Body>
        </Card>
    );
}

export default DataCard;