import { useState } from "react";
import PDF_Viewer from "./PDF_Viewer";

function DraftsSection({ projectId }) {
    const [pdfFiles, setPdfFiles] = useState([null, null, null, null]);
    const [selectedPdf, setSelectedPdf] = useState(null);

    const handleUpload = async (index, event) => {
    const file = event.target.files[0];
        if (!file) return;

        // Prevent uploading Draft 2 before Draft 1, etc.
        if (index > 0 && !pdfFiles[index - 1]) {
            alert(`You must upload Draft ${index} before uploading Draft ${index + 1}`);
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);

        const res = await fetch(`http://localhost:3000/api/drafts/upload/${index}`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (data.fileUrl) {
            const updated = [...pdfFiles];
            updated[index] = data.fileUrl;
            setPdfFiles(updated);
        }
    };


    return (
        <>
            <div className="drafts-container">
                {["1", "2", "3", "4 (Final draft)"].map((label, index) => (
                    <div className="drafts-button" key={index}>
                        <p>Draft {label}</p>

                        <input
                            type="file"
                            accept="application/pdf"
                            id={`upload-${index}`}
                            style={{ display: "none" }}
                            onChange={(e) => handleUpload(index, e)}
                        />

                        <button
                            className="upload-btn"
                            disabled={index > 0 && !pdfFiles[index - 1]}
                            onClick={() => {
                                if (pdfFiles[index]) {
                                    const confirmReplace = window.confirm(
                                        "A draft is already uploaded. Do you want to replace it?"
                                    );
                                    if (!confirmReplace) return;
                                }
                                document.getElementById(`upload-${index}`).click();
                            }}
                        >
                            Upload PDF
                        </button>

                        <button className="view-btn" onClick={() => handleView(index)}>
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