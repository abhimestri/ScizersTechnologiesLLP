import React, { Component } from 'react'
import './Header.css'
import { connect } from 'react-redux'
import { Route ,Link } from 'react-router-dom'
import * as actionTypes from '../Store/Actions/actionTypes'
import Output from '../OutputSection/Output/output'
import * as actionCreators from '../Store/Actions/action'

class Header extends Component{

    state = {
        filteredList : []
    }

    ShowSideDrawer = () => {
        this.props.sideDrawerToggle(true)
    }

    searchUser = (e) => {
        let inputValue = e.target.value
        this.props.setFilterValue(inputValue)
    } 
    searchUserPh = (e) => {
        let inputValue = e.target.value
        this.props.setFilterValuePh(inputValue)
    }  

    render(){
        return (
            <div className="Navbar">
                <p className="Brand" >Scizers Technologies LLP</p>
                <ul className="nav justify-content-end NAV" >
                    <li className="nav-item ">
                        <Link to="/" className="nav-link text-dark">home</Link>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link text-dark">Dashbord</a>
                    </li>
                </ul>
                <div className="subHeader" >
                    <p className="subText">Address Book Management</p>
                    <input className="searchUsers" onChange={e => this.searchUser(e)} type="text" placeholder="search users names " />
                    <input className="searchUsersPh" onChange={e => this.searchUserPh(e)} type="number" placeholder="search phone number" />
                </div>
                <button className="btn btn-outline-dark mt-4 ml-5 addNewUserBtn" onClick={this.ShowSideDrawer} > Add New User </button>
            
            <Route exact to="/" component={Output} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sideDrawerToggle : showSideDrawer => dispatch({type : actionTypes.SHOWSIDEDRAWER , showSideDrawerDisplay: showSideDrawer }),
        setOutputList : data => dispatch(actionCreators.setOutputList(data)),
        setFilterValue : value => dispatch(actionCreators.filterValue(value)),
        setFilterValuePh : value => dispatch(actionCreators.filterValuePh(value))
    }
}

export default connect(null, mapDispatchToProps)(Header)