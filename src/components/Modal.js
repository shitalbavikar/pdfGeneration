import React from 'react';
import '../Styles/Modal.css';

const modal = (props) => {
      
    return (
        <div data-html2canvas-ignore="true">
            <div className="modal-wrapper"
                style={{
                    display: props.show ? "modal-wrapper display-block" : "modal-wrapper display-none",
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>PDF Settings</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    
                        {props.children}
                    
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    <button className="btn-continue" onClick={props.continue}>CONTINUE</button>
                </div>
            </div>
        </div>
    )
}

export default modal;


