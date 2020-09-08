import React, { Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './Output.css'
import * as actionCreators from '../../Store/Actions/action'
import * as actionTypes from '../../Store/Actions/actionTypes'
import '../../config/config'

class Output extends Component {

    state = {
        presentData : [],
        filterData :[],
        Id : null
    }

    editData = (data) => {
        this.props.setEditModalClassName("editModalOpen")
        this.props.setEditedValue(data)
    }

    deleteData = (data) => {
        axios.delete(`https://scizers-technologies-llp.firebaseio.com/data/${data}.json`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        setTimeout(() =>{
            window.location.reload(false)
        },1000)
    }

    componentDidMount(){
        axios.get('https://scizers-technologies-llp.firebaseio.com/data.json')
            .then(res => {
                Object.entries(res.data).forEach(el => {
                    const Data = {
                        id : el[0],
                        name : el[1].email,
                        phoneNumber : el[1].phoneNumber
                    }
                    this.setState({ presentData :  this.state.presentData.concat(Data)})
                })
                this.props.setOutputData([...this.state.presentData])
            })
            .catch(err => {
                console.log(err)
            })
            
    }


    render(){
        let sorted , filter = [];
        if(this.props.filterValue){
            let lengthToBEchecked = this.props.filterValue.length
            this.props.outputList.forEach(el => {
                let value = el.name.split("").splice(0 , lengthToBEchecked).join("");
                if(value === this.props.filterValue){
                    filter.push(el)
                }
            })
            console.log(filter)
            sorted = filter.sort((a,b) => {
                const isReversed = 1;
                return isReversed * a.name.localeCompare(b.name)
            })
        }else{
            sorted = this.props.outputList.sort((a,b) => {
                const isReversed = 1;
                return isReversed * a.name.localeCompare(b.name)
            })
        }
        if(this.props.filterValuePh){
            let lengthToBEchecked = this.props.filterValuePh.length
            this.props.outputList.forEach(el => {
                let value = el.phoneNumber.toString().split("").splice(0 , lengthToBEchecked).join("");
                if(value === this.props.filterValuePh){
                    filter.push(el)
                }
            })
            sorted = filter
        }

        let res = sorted.map(el => {
            return (
                <div className="ListElement">
                    <li className="listElName">{el.name}</li>
                    <li className="listElPhoneNumber">{el.phoneNumber}</li>
                    <button className="deleteBtn" onClick={() => this.deleteData(el.id)}>Delete Contact</button>
                    <button className="editBtn" onClick={() => this.editData(el)}>Edit</button>
                </div>
            )
        })

        return (
            <div className="OutputDataTable">
               <div className="attributesSec">
                   <p className="attributesSecName">Name</p>
                   <p className="attributesSecPhoneNumber">Phone Number</p>
               </div>
               <div className="seperatorLine"></div>
               <div className="outputList">
                    <ul className="UlListElement">
                        {res}
                    </ul>
               </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        data : state.uiToggle.userData,
        outputList : state.uiToggle.outputList,
        filterValue : state.uiToggle.filterValue,
        filterValuePh : state.uiToggle.filterValuePh
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setOutputData : data => dispatch(actionCreators.setOutputList(data)),
        setEditedValue : Data => dispatch({type : actionTypes.EDITVALUE , data: Data}),
        setEditModalClassName : name => dispatch({type :actionTypes.TOGGLE_EDITMODAL , className : name})
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Output)