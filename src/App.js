import React from 'react';
import SimpleChart from './components/SimpleChart';
import Table from './components/Table';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
const print = () => {
  html2canvas(document.querySelector('.App')).then((canvas) => {    
    const pdf = new window.jsPDF('p', 'mm', 'a6');
    var width = pdf.internal.pageSize.getWidth();
    var height = pdf.internal.pageSize.getHeight();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
    pdf.save("download.pdf");  
  });
}
 
  return (
    <div className= 'Main'>
      <div className="App">
         <SimpleChart/>
         <Table/>     
      </div>
      <button onClick={print} className="button">Print</button>    
    </div>
  );
}

export default App;
