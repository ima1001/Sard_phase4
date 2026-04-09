import PDF_Viewer from "./PDF_Viewer"; 
import { useState } from "react";

function draftsSection() {
    const [files, setFiles] = useState([null, null, null]);
    const [activeFile, setActiveFile] = useState(null);

    const handleUpload = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const newFiles = [...files];
            newFiles[index] = URL.createObjectURL(file);
            setFiles(newFiles);
        }
    };

    const handleView = (index) => {
        setActiveFile(files[index]);
    };
    return(
        <>
        <div className="drafts-container">
            {[0,1,2].map((i) => (
                <div className="drafts-button" key={i}>
                        <p>Draft {i + 1}</p>
                        {/* Upload */}
                        <label className="upload-btn">
                            Upload PDF
                            <input
                                type="file"
                                accept="application/pdf"
                                hidden
                                onChange={(e) => handleUpload(i, e)}
                            />
                        </label>

                        {/* View */}
                        <button 
                            className="view-btn"
                            onClick={() => handleView(i)}
                            disabled={!files[i]} // disable if no file was uploaded
                        >
                            View PDF
                        </button>
                    </div>
                ))}
            </div>

            {/* PDF Viewer */}
            {activeFile && (
                <div style={{ height: "500px", marginTop: "20px" }}>
                    <PDF_Viewer filePath={activeFile} />
                </div>
            )}
        </>
    );
}
export default draftsSection;