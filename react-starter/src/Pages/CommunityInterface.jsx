import { useState } from "react";

function CommunityInterface() {
    const [showMessage, setShowMessage] = useState(false);

    return (
        <div className="text-center mt-5">
            <h2>Fantasy Community</h2>
            <h4 className="mt-4">Projects</h4>
            <div className="d-flex justify-content-center gap-3 mt-4">
                <button className="btn btn-secondary" onClick={() => setShowMessage(true)}>Project1</button>
                <button className="btn btn-secondary" onClick={() => setShowMessage(true)}>Project2</button>
                <button className="btn btn-secondary" onClick={() => setShowMessage(true)}>Project3</button>
            </div>
            {showMessage && (
                <div className="alert alert-success mt-4">
                    Your request is sent to the author
                </div>
            )}
        </div>
    );
}

export default CommunityInterface;
