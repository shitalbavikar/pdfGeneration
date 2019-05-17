import React, {Component} from 'react';
import SimpleLineChart from "./SimpleLineChart";
import Table from './Table';
import '../Styles/App.css';
import ModalContainer from './ModalContainer';
import _ from 'lodash';
import Filter from './Filter';


class DashboardTwo extends Component {      
  state = {       
        filterData: this.props.value,
        isShowing: false,  
    }
    
  openModalHandler = () => {
      this.setState({
        isShowing: !this.state.isShowing
      });
    };
    
  displayFilteredData = (data, filterKey) => {
      let filterData,
        displayFilteredData = [...this.props.value];
    
      if (data !== "" && typeof data !== undefined) {
        if (filterKey !== "" && filterKey === "name") {
          filterData = _.filter(displayFilteredData, o => o.name === data);
        } else if (filterKey !== "" && filterKey === "Country") {
          filterData = _.uniq(
            _.filter(displayFilteredData, o => o.Country === data)
          );
        }
        this.setState({ filterData });
      }
    };
    

    clearFilteredData =() => {
      this.setState({ filterData: this.props.value });
    }

    

render () { 
      return (
        <div className= 'Main'>
        <ul className='FilterUl'>
            <li className='FilterItem'>  <label name="CustomerName" className="label"> Customer Name:</label>
                  <Filter value={this.state.filterData} filterKey="name" 
                  displayFilteredData={this.displayFilteredData}
                  clearFilteredData ={this.clearFilteredData} />
             <label name="CustomerCountry" className="label"> Customer Country:</label>
                  <Filter value={this.state.filterData} filterKey="Country" 
                  displayFilteredData={this.displayFilteredData}
                  clearFilteredData ={this.clearFilteredData} />
            </li>
          </ul>
          <div className= 'MainPage'  id="MainPage">
              <div className="Graph" id="Graph">
                <SimpleLineChart data={this.state.filterData}/>
              </div>
              <div className="Table"  id="Table">
                <Table rows={this.state.filterData}/>     
              </div>
          </div>
          <button onClick={this.openModalHandler} className="button">Export to PDF</button>   
          <ModalContainer isShowing={this.state.isShowing} onClose={this.openModalHandler} />
        </div>
      );
  }
}

export default DashboardTwo;

DashboardTwo.defaultProps = {value:
  [
    {id: '00A1',name:'Maria Anders',    Country:'Germany',  uv: 150,  Margin: 150},
    {id: '00A2',name:'Marks Baker',     Country:'Germany',  uv: 250,  Margin: 250,},
    {id: '00A3',name:'Francisco Chang', Country:'Mexico',   uv: 280,  Margin: 180,},
    {id: '00A4',name:'Roland Mendel',   Country:  'UK',     uv: 278,  Margin: 278,},
    {id: '00A5',name:'Philip Cramer',   Country: 'Canada',  uv: 189,  Margin: 189},
    {id: '00A6',name:'Leo Paris',       Country: 'France',  uv: 239,  Margin: 239},
    {id: '00A7',name:'Pierre Brun',     Country: 'France',  uv: 349,  Margin: 320,}
  ]
}