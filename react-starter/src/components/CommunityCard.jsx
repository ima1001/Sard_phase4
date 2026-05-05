import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CommunityCard({
    title = "Card Title",
    text = "description",
    primaryButtonText = "Join",
    primaryOnClick,
    primaryDisabled = false,
    secondaryButtonText,
    secondaryOnClick,
}) {
    return (
        <Card className="card">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <div className="community-card-buttons">
                    <Button
                        variant="primary"
                        onClick={primaryDisabled ? undefined : primaryOnClick}
                        disabled={primaryDisabled}
                        style={{
                            opacity: primaryDisabled ? 0.6 : 1,
                            cursor: primaryDisabled ? "not-allowed" : "pointer",
                        }}
                    >
                        {primaryButtonText}
                    </Button>
                    {secondaryButtonText && (
                        <Button variant="outline-secondary" className="secondary-button" onClick={secondaryOnClick}>
                            {secondaryButtonText}
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default CommunityCard;
