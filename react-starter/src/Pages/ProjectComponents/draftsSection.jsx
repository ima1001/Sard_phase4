import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';


function draftsSection() {

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
    ).toString();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    //next page
    function nextPage() {
        if (pageNumber < numPages) {
        setPageNumber(pageNumber + 1);
        }
    }

    //previous page
    function prevPage() {
        if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
        }
    }

    return (
        <div>
        <Document file="src/assets/samplepdf.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
        </Document>
        <p>
            Page {pageNumber} of {numPages}
        </p>
        <button onClick={prevPage} disabled={pageNumber <= 1}>
            Previous
        </button>
        <button onClick={nextPage} disabled={pageNumber >= numPages}>
            Next
        </button>
        </div>
    );
}
export default draftsSection;  