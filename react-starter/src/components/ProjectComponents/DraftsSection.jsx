import { useState, useEffect } from "react";
import PDF_Viewer from "./PDF_Viewer";

function DraftsSection({ projectId }) {
    const [pdfFiles, setPdfFiles] = useState([null, null, null, null]);
    const [selectedPdf, setSelectedPdf] = useState(null);

        useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/drafts/${projectId}`)
            .then(res => res.json())
            .then(data => {
                const arr = [null, null, null, null];
                data.forEach(d => {
                    arr[d.draftNumber] = d.fileUrl;
                });
                setPdfFiles(arr);
            });
    }, []);


const handleUpload = async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (index > 0 && !pdfFiles[index - 1]) {
        alert(`You must upload Draft ${index} before uploading Draft ${index + 1}`);
        return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/drafts/upload/${projectId}/${index}`, {
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

const handleView = (index) => {
    if (!pdfFiles[index]) {
        alert("No PDF uploaded yet");
        return;
    }

    const fullUrl = `${import.meta.env.VITE_API_URL}/${pdfFiles[index]}`.replace(/([^:]\/)\/+/g, "$1");
    setSelectedPdf(fullUrl);
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

                {selectedPdf && <PDF_Viewer pdfUrl={selectedPdf} />}

            </div>
        </>
    );
}

export default DraftsSection;