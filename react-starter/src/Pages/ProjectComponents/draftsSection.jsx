import pdfViewer from "./pdfViewer";    

function draftsSection() {
    return(
        <>
            <div className="drafts-container">
                <div className="drafts-button">
                    <p>Draft 1</p>
                    <button className="upload-btn">Upload PDF</button>
                    <button className="view-btn">View PDF</button> 
                </div>
                <div className="drafts-button">
                    <p>Draft 2</p>
                    <button className="upload-btn">Upload PDF</button>
                    <button className="view-btn">View PDF</button> 
                </div>
                <div className="drafts-button">
                    <p>Draft 3</p>
                    <button className="upload-btn">Upload PDF</button>
                    <button className="view-btn">View PDF</button> 
                </div> 
            </div>
            <pdfViewer/>
        </>
    );
}
export default draftsSection;