import * as actionType from './actionTypes'
import axios from 'axios'


export const setDataSuccess = (userData) => {
    return {
        type : actionType.SETUSERDATASUCCESS,
        userData : userData
    }
}

export const filterValue = (value) => {
    return {
        type : actionType.FILTERVALUE,
        value : value
    }
}
export const filterValuePh = (value) => {
    return {
        type : actionType.FILTERVALUEPH,
        value : value
    }
}

export const setOutputList = (data) =>{
    return {
        type : actionType.OUTPUTLIST,
        data : data
    }
} 

export const storeToDataBase = (userData) => {
    return dispatch => {
        let url = "https://scizers-technologies-llp.firebaseio.com/data.json"
        axios.post(url , userData)
                .then(response => {
                    dispatch(setDataSuccess(userData))
                    console.log(response)
                })
                .catch(error => {
                    console.log("error occured!!!")
                });
    }
}