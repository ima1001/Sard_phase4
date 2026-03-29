import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Card({ title = "Card Title", text = "description", imageSrc = "/assets/logoB.png", buttonText = "Join", onClick }) {
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imageSrc} />
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

export default Card;