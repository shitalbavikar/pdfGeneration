import React from 'react';

// let rows = [
//   {id: '00A1',name: 'Maria Anders', Country:'Germany'},
//   {id: '00A2',name: 'Marks Baker', Country:'Germany'},
//   {id: '00A3',name:'Francisco Chang',Country: 'Mexico'},
//   {id: '00A4',name:'Roland Mendel',Country:'UK'},
//   {id: '00A5',name:'Philip Cramer',Country: 'Canada'},
//   {id: '00A6',name:'Leo Paris',Country: 'France'},
//   {id: '00A7',name:'Pierre Brun',Country: 'France'},
// ];

export default class Table extends React.Component {
  constructor() {
    super();   
    this.tmp = new Set();
  }

  handleSelect = (e, row, id) => {    
    if (e.shiftKey || e.altKey || e.ctrlKey) {  
        if (this.tmp.has(row.id)) {
          this.tmp.delete(row.id);
          this.removeHighlightedRow(row.id, false);
        }
        else this.tmp.add(row.id);      
      } 
      else {        
        if (this.tmp.has(row.id)) {
          this.tmp.delete(row.id);
          this.removeHighlightedRow(row.id, false);
        }
        else { 
          this.removeHighlightedRow(row.id, true);
          this.tmp.clear();          
          this.tmp.add(row.id); 
        }       
      } 
      this.highlightedRows();       
  };

  removeHighlightedRow = (rowId, clearAllRows) =>{  
      var classname = "row "+ rowId;      
      var temp = document.getElementsByClassName(classname);     
      temp[0].style.backgroundColor = ""; 
      temp[0].setAttribute("data-html2canvas-ignore","true");  
      console.log('removeHighlightedRow'+temp[0].getAttribute("data-html2canvas-ignore"));
      if(clearAllRows) {
        var arr = Array.from(this.tmp);    
        for (var row = 0; row < arr.length; row++) {
          var classname = "row "+arr[row];      
          var temp = document.getElementsByClassName(classname);     
          temp[0].style.backgroundColor = "";  
          temp[0].setAttribute("data-html2canvas-ignore","true");
          console.log('removeHighlightedRow'+ temp[0].getAttribute("data-html2canvas-ignore"));
        }
      }
  }

  highlightedRows = () =>{    
    var arr = Array.from(this.tmp);    
    for (var row = 0; row < arr.length; row++) {
      var classname = "row "+arr[row];      
      var temp = document.getElementsByClassName(classname);     
      temp[0].style.backgroundColor = "#8fd4d9";   
      temp[0].removeAttribute("data-html2canvas-ignore");
      console.log('highlightedRows'+ temp[0].getAttribute("data-html2canvas-ignore"));
    }
  }

  isRowSelected = rowID => {   
    return this.tmp.has(rowID);
  };

 
  render() {
    return(
      <div className="table">
       <div className="headrow">
                <div className="cell">Customer ID</div>
                <div  className="cell">Customer Name</div>
                <div  className="cell">Customer Country</div>
       </div>
      { this.props.rows.map(row => (
         <div key={row.id} className={"row "+ row.id}  onClick= {event =>this.handleSelect(event, row, row.id)}>
          <div id= {row.id} className="cell">{row.id}</div>
          <div id= {row.id} className="cell">{row.name}</div>
          <div id= {row.id} className="cell">{row.Country}</div>
        </div>
      ))}
      </div>
    )
  }
}