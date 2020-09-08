import React, { Component } from 'react'
import './editBlock.css'
import { connect } from 'react-redux'
import firebase from '../../../config/config'
import * as actionTypes from '../../../Store/Actions/actionTypes'

class Editblock extends Component {

    state = {
        name : null,
        phoneNumber : null
    }

    setName = (e) => {
        this.setState({name : e.target.value})
    }

    setPhoneNumber = (e) => {
        this.setState({phoneNumber : e.target.value})
    }


    editData = () => {
        if(this.state.phoneNumber.length === 10){
            firebase.child(`data/${this.props.data.id}`).set({
                email : this.state.name,
                phoneNumber : this.state.phoneNumber
            })
        }else{
            alert("enter phonr number with 10 digits")
        }
        this.props.setEditModalClassName("editBlockClose")
        window.location.reload(false)
    }

    closeEditModal = () =>{
        this.props.setEditModalClassName("editBlockClose")
        window.location.reload(false)
    }

    render(){
        return(
            <div className={this.props.className} >
                <p className="closeEditModal" onClick={this.closeEditModal} >X</p>
                <p className="editBlockTitle">enter details</p>
                <input type="text" placeholder="enter name" className="nameInputEditBlock" onChange={(e) => this.setName(e)} />
                <input type="number" placeholder="enter number" className="phoneInputEditBlock" onChange={(e) => this.setPhoneNumber(e)} />
                <button className="editBTN " onClick={() => this.editData()} >edit</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data : state.uiToggle.editedValue,
        className : state.uiToggle.editModalClassName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setEditModalClassName : name => dispatch({type :actionTypes.TOGGLE_EDITMODAL , className : name})
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Editblock)