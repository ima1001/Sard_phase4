import { useState } from "react";
import PDF_Viewer from "./PDF_Viewer";

function DraftsSection() {
    const [pdfFiles, setPdfFiles] = useState([null, null, null]);
    const [selectedPdf, setSelectedPdf] = useState(null);

    const handleUpload = (index, event) => {
        const file = event.target.files[0];
        if (!file) return;

        const updated = [...pdfFiles];
        updated[index] = URL.createObjectURL(file);
        setPdfFiles(updated);
    };

    const handleView = (index) => {
        if (!pdfFiles[index]) {
        alert("No PDF uploaded yet");
        return;
        }
        setSelectedPdf(pdfFiles[index]);
    };

    return (
        <>
        <div className="drafts-container">
            {[1, 2, 3, "4 (Final draft)"].map((num, index) => (
            <div className="drafts-button" key={index}>
                <p>Draft {num}</p>

                <input
                type="file"
                accept="application/pdf"
                id={`upload-${index}`}
                style={{ display: "none" }}
                onChange={(e) => handleUpload(index, e)}
                />

                <button
                className="upload-btn"
                onClick={() => {
                    if (pdfFiles[index]) {
                    const confirmReplace = window.confirm("A draft is already uploaded. Do you want to replace it?");
                    if (!confirmReplace) return;
                    }
                    document.getElementById(`upload-${index}`).click()
                }}
                >
                Upload PDF
                </button>

                <button
                className="view-btn"
                onClick={() => handleView(index)}
                >
                View PDF
                </button>
            </div>
            ))}
        </div>

        {selectedPdf && <PDF_Viewer pdfUrl={selectedPdf} />}
        </>
    );
}

export default DraftsSection;