import React from 'react';
import { Route, Link, BrowserRouter as Router  } from 'react-router-dom'
import DashboardOne from './DashboardOne';
import DashboardTwo from './DashboardTwo';


class BaseLayout extends React.Component {  
  
  state = {
     menuOpen: false 
  };

  menuList(){
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }))
  }
  
 
  render () {
    
    const menuOpen = this.state.menuOpen;
 
    return (
      <Router>
        <div className="base">
        <header>
          <p className="MainHeader"> <img src={require('../Styles/images/logo1.png')}/></p>
            <nav>
            <div className="nav-wrapper">
                  <div className="nav-header" onClick={() => this.menuList()}>
                    <div className="nav-header-title">Dashboard Menu</div>
                  </div>
                   {menuOpen? <ul className="Dashboard_ul">            
                    <li className="Dashboard_li" > 
                    <Link to='/Revenue' className="Dashboard_li_links"> Revenue</Link></li>
                    <li className="Dashboard_li">
                    <Link to='/Margin' className="Dashboard_li_links"> Margin</Link></li>
                </ul>: null }
            </div>
            </nav>       
        </header>   
        <div className="container">  
          <Route path="/Revenue" component={DashboardOne} />
          <Route path="/Margin" component={DashboardTwo} />  
        </div>   
      </div>
    </Router>  
 )}
}

export default BaseLayout;

