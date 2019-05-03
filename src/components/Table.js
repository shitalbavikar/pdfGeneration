import React from 'react';

let rows = [
  {id: 1,name: 'Maria Anders', Country:'Germany'},
  {id: 2,name:'Francisco Chang',Country: 'Mexico'},
  {id: 3,name:'Roland Mendel',Country:'Austria'},
  {id: 4,name:'Philip Cramer',Country: 'Canada'},
];

export default class Table extends React.Component {
  render() {
    return(
      <div class="table">
       <div class="headrow">
                <div class="cell" align="center">Customer ID</div>
                <div  class="cell">Customer Name</div>
                <div  class="cell">Customer Country</div>
       </div>
      { rows.map(row => (
        <div key={row.id} class="row">
          <div class="cell">{row.id}</div>
          <div class="cell">{row.name}</div>
          <div class="cell">{row.Country}</div>
        </div>
      ))}
      </div>
    )
  }
}