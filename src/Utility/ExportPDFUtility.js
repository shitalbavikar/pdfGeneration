import html2canvas from 'html2canvas';

const canvasList = [];
let previousWindow;
export const createPdfFromElement = (elementId) => {
   
    const element = document.getElementById(elementId),
          clone = element.cloneNode(true),
          finalWidth = 1600;
           
    // hack for html2canvas to render the entire thing into a canvas AND resize everything appropriately
    clone.id = 'PDF_Clone';
    
    clone.style.width = `${finalWidth}px`;
    clone.ownerDocument.defaultView.innerHeight = clone.clientHeight;
 
   
    const html2canvasSuccess = function (canvas) {
        const pdf            = new window.jsPDF('P', 'px'),
              pdfInternals   = pdf.internal,
              pdfPageSize    = pdfInternals.pageSize,
              pdfPageWidth   = pdfPageSize.width,  
              pdfPageHeight   = pdfPageSize.height;                 
             
            for (let i = 0; i < canvas.length; i++) {
                const newCanvas = canvas[i];                    
                               
                // if not the last page, add another
                if (i > 0) {
                    pdf.addPage();
                }

               header(pdf, pdfPageWidth);
               pdf.addImage(newCanvas, 'png', 60, 60, pdfPageWidth, 0);
               footer(pdf,pdfPageHeight, i);
            }
        
            if(!previousWindow === false ){
                previousWindow.close();
            }
            previousWindow =  window.open(pdf.output('bloburl'));
    };
      
    const header = function (pdf, pdfPageWidth) {

            pdf.setFontSize(20);
            pdf.setTextColor(40);
            pdf.setFontStyle('normal');

            const imgData= 'data:image/png;base64,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';
            pdf.setFillColor(231,231,231);
            pdf.rect(0, 0, pdfPageWidth, 50, 'F'); // filled square
            pdf.addImage(imgData, 5,5);
            pdf.setFont("Calibri");
            pdf.text(80, 30, "Dashboard Demo 2"); 

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();            
            today = dd+'-'+mm+'-'+yyyy;
            var newdat = "Date Printed : "+ today;
            pdf.setFontSize(10);
            pdf.text(350,40,newdat);

};

const footer = function (pdf, pdfPageHeight, pageNumber) {
    // pdf.setFont("Calibri");  
    // pdf.setFontSize(10);
    // pdf.text(350,1500,pageNumber);

};

    
    html2canvas(element).then((canvas) => { 
         canvasList.push(canvas);   
         html2canvasSuccess(canvasList);
     });
}


     