function ViewPDF({ pdfUrl }) {
    if (!pdfUrl) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <p>No PDF selected</p>
            </div>
        );
    }

    return (
        <div
            style={{
                width: "100%",
                height: "90vh",
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                marginTop: "20px"
            }}
        >
            <iframe
                src={pdfUrl}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="PDF Viewer"
            ></iframe>
        </div>
    );
}

export default ViewPDF;