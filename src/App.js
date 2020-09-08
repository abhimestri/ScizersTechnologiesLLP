import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header'
import Sidedrawer from './OutputSection/SideDrawer/SideDrawer'
import EditedBlock from './OutputSection/SideDrawer/editBlock/editBlock'
import { connect } from 'react-redux'

class App extends Component {
  render(){
  return (
    <div className="containers">
      {(this.props.isOpen) === "editModalOpen" ? <div className="backDrop"></div> : null}
        <Header/>
        <Sidedrawer/>
        <EditedBlock/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen : state.uiToggle.editModalClassName
  }
}

export default connect(mapStateToProps)(App);
