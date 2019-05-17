import React, {Component} from 'react';
import '../Styles/App.css';
import Modal from './Modal';
import {createPdfFromElement} from '../Utility/ExportPDFUtility';

export default class ModalContainer extends Component {
state = {    
    selectedOption: 'Both'
}


handleOptionChange = e => {
  e.preventDefault();
  this.setState({
    selectedOption: e.target.value
  });
};

handleLayoutChange = e => {
  this.setState({
    layoutValue: e.target.value
  });
};

handlePrint =(event) => {
    event.preventDefault(); 
      const selectedSection = this.state.selectedOption === 'Both'? 'MainPage': this.state.selectedOption;
       createPdfFromElement(selectedSection);
  }

render () { 
    return (       
        <Modal data-html2canvas-ignore="true"
                  className="modal"
                  show={this.props.isShowing}
                  close={this.props.onClose} 
                  continue={this.handlePrint}>
                  
                        <ul className="printOptions">
                          <li className="printOption"> 
                            <span className="label">Select Section:</span>                                 
                                <input  className="radio" type="radio" value="Table" onChange={this.handleOptionChange} name="section"/> Table  
                                <input  className="radio" type="radio" value="Graph" onChange={this.handleOptionChange}  name="section"/> Graph
                                <input className="radio" type="radio" value="Both" defaultChecked onChange={this.handleOptionChange}  name="section"/> Both
                            </li>
                          <li className="printOption">
                          <span className="label">Layout:</span>
                                <select className="dropdown" value={this.state.value} onChange={this.handleLayoutChange}>
                                  <option value="p">Portrait</option>
                                  <option defaultValue value="l">Landscape</option>
                              </select>                           
                          </li>
                         
                          <li className="printOption"> <span className="label">Pages:</span>                            
                                   <input type="text" className="textArea" ></input>                   
                          </li>
                </ul>    
        </Modal> 
      
        );
   }
}