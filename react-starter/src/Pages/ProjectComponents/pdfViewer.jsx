import { PDFViewer } from '@embedpdf/react-pdf-viewer';


function pdfViewer() {
    return(
        <div style={{ height: '600px' }}> 
            <PDFViewer 
                style={{ height: '100%' }}
                config={{
                    src: '/src/assets/samplepdf.pdf',
                    theme: { preference: 'light' }
                }}
            />
        </div>
    );
}
export default pdfViewer;