import { useNavigate } from "react-router-dom";

function RoleSelect() {
    const navigate = useNavigate();

    return (
        <div className="text-center mt-5">
            <h2>Select your role</h2>
            <div className="d-flex justify-content-center gap-3 mt-4">
                <button className="btn btn-primary" onClick={() => navigate("/HomeEditor")}>Editor</button>
                <button className="btn btn-primary" onClick={() => navigate("/HomePublisher")}>Publisher</button>
            </div>
        </div>
    );
}

export default RoleSelect;
