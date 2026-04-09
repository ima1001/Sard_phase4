import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.296/pdf.worker.min.js";

function PDF_Viewer({ pdfUrl }) {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Document
            file={pdfUrl}
            onLoadSuccess={onLoadSuccess}
            onLoadError={(err) => console.error("PDF load error:", err)}
        >
            <Page pageNumber={pageNumber} width={600} />
        </Document>

        {numPages && (
            <div style={{ marginTop: "10px" }}>
            <button
                onClick={() => setPageNumber(pageNumber - 1)}
                disabled={pageNumber <= 1}
            >
                Previous
            </button>

            <span style={{ margin: "0 10px" }}>
                Page {pageNumber} of {numPages}
            </span>

            <button
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={pageNumber >= numPages}
            >
                Next
            </button>
            </div>
        )}
        </div>
    );
}

export default PDF_Viewer;