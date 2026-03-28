function CommunityP() {
  const [showMessage, setShowMessage] = useState(false);

  const handleJoin = () => {
    setShowMessage(true);
  };

  return (
    <div className="text-center mt-5">
      <h2>Fantasy Community</h2>

      <h4 className="mt-4">Projects</h4>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-secondary" onClick={handleJoin}>Project1</button>
        <button className="btn btn-secondary" onClick={handleJoin}>Project2</button>
        <button className="btn btn-secondary" onClick={handleJoin}>Project3</button>
      </div>

      {showMessage && (
        <div className="alert alert-success mt-4">
          Your request is sent to the author
        </div>
      )}
    </div>
  );
}

export default CommunityP;