import React, { Component } from 'react'
import './SideDrawer.css'
import { connect } from 'react-redux'
import * as actionCreators from '../../Store/Actions/action'
import * as actionType from '../../Store/Actions/actionTypes'

class Sidedrawer extends Component{

    state = {
        email : null,
        phoneNumber : null,
        notLoading : false,
        isPresent : false
    }

    setEmail = (e) => {
        this.setState({email : e.target.value})
    }
    setPhoneNumber = (e) => {
        this.setState({phoneNumber : e.target.value})
    }

    closeSideDrawer = () => {
        this.props.toggleSideDrawer(false)
    }

    UpdateUser = () => {
        const Data = {
            email : this.state.email,
            phoneNumber : this.state.phoneNumber
        }
        if(Data.phoneNumber.toString().length === 10){
            let isPresent = false
            this.props.outputList.forEach(el => {
                console.log("in sidedrawer if")
                console.log(el.phoneNumber)
                console.log(Data.phoneNumber)
                if(el.phoneNumber === Data.phoneNumber){
                    isPresent = true
                }
            })
            if(!isPresent){
                this.props.setUserData(Data)
            }
        }else{
            alert("number should be of 10 digits")
        }
        this.props.toggleSideDrawer(false)
        setTimeout(() => {
            window.location.reload(false)
        },600)
    }

    render(){
        return (
            <div className={this.props.isOpen ? 'formContainerClose' : 'formContainerOpen'}>
                <p onClick={this.closeSideDrawer} className="closeSideDrawer" >X</p>
                <form className="form Form">
                    <div className="form-group" >
                        <label for="name">User Name</label>
                        <input className="form-control" type="text" onChange={(e) => this.setEmail(e)} placeholder="name"/>
                    </div>
                    <div className="form-group" >
                        <label for="name">Phone number</label>
                        <input className="form-control" type="number" onChange={(e) => this.setPhoneNumber(e)} placeholder="phone number"/>
                    </div>
                </form>
                <button className="btn btn-dark btn-block SubmitBtn" onClick={this.UpdateUser}> Add User </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isOpen : state.uiToggle.showSideDrawer,
        userData : state.uiToggle.userData,
        outputList  : state.uiToggle.outputList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSideDrawer : close => dispatch({type: actionType.SHOWSIDEDRAWER , showSideDrawerDisplay:close }),
        setUserData : data => dispatch(actionCreators.storeToDataBase(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Sidedrawer)