import React, { Component } from 'react'
import './SideDrawer.css'
import { connect } from 'react-redux'
import * as actionCreators from '../../Store/Actions/action'
import * as actionType from '../../Store/Actions/actionTypes'
import axios from 'axios'

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
            axios.get("https://scizers-technologies-llp.firebaseio.com/data.json")
                    .then(res => {
                        console.log("in if of update user")
                        Object.entries(res.data).forEach(el  => {
                            if(el[1].phoneNumber === Data.phoneNumber){
                                this.setState({isPresent : true})
                            }
                        })
                        if(!this.state.isPresent){
                            this.props.setUserData(Data)
                        }else{
                            alert("phone number already in use")
                        }
                    })
        }else{
            alert("number should be of 10 digits")
        }
        this.props.toggleSideDrawer(false)
        setTimeout(() => {
            window.location.reload(false)
        },500)
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
        userData : state.uiToggle.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSideDrawer : close => dispatch({type: actionType.SHOWSIDEDRAWER , showSideDrawerDisplay:close }),
        setUserData : data => dispatch(actionCreators.storeToDataBase(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Sidedrawer)