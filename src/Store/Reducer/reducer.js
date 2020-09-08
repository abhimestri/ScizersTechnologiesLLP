import * as actionTypes from '../Actions/actionTypes'

const initialState = {
    showSideDrawer : false,
    email : null,
    phoneNumber : null,
    userData : [],
    outputList : [],
    filterValue : null,
    filterValuePh : null,
    editedValue : null,
    editModalClassName : 'editBlockClose'
}

const handleSideDrawer = (state , action) => {
    return {
        ...state,
        showSideDrawer : action.showSideDrawerDisplay
    }
}

const setUserData = (state , action) => {
    console.log("[setUserDAta]")
    console.log(action.phoneNumber)
    return {
        ...state,
        userData : state.userData.filter(el => el.phoneNumber !== action.phoneNumber).concat(action.userData)
    }
}

const setOutPutList = (state ,action) => {
    return {
        ...state,
        outputList : action.data
    }
}

const setFilterValue = (state , action) => {
    return {
        ...state,
        filterValue : action.value
    }
}
const setFilterValuePh = (state , action) => {
    return {
        ...state,
        filterValuePh : action.value
    }
}

const setEditedValue = (state ,action) => {
    return {
        ...state,
        editedValue : action.data
    }
}

const setEditModalClassName = (state ,action) => {
    return {
        ...state,
        editModalClassName : action.className
    }
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.SHOWSIDEDRAWER : return handleSideDrawer(state , action);
        case actionTypes.SETUSERDATASUCCESS : return setUserData(state , action);
        case actionTypes.OUTPUTLIST : return setOutPutList(state , action);
        case actionTypes.FILTERVALUE : return setFilterValue(state ,action);
        case actionTypes.FILTERVALUEPH :return setFilterValuePh(state ,action)
        case actionTypes.EDITVALUE : return setEditedValue(state , action);
        case actionTypes.TOGGLE_EDITMODAL : return setEditModalClassName(state , action)
        default : return state;
    }
}

export default reducer