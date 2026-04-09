import { PDFViewer } from '@embedpdf/react-pdf-viewer';


function pdfViewer({ filePath }) {
    return(
        <div style={{ height: '600px' }}> 
            <PDFViewer 
                style={{ height: '100%' }}
                config={{
                    src: filePath,
                    theme: { preference: 'light' }
                }}
            />
        </div>
    );
}
export default pdfViewer;