import { ADD_ORDER } from '../actions/orders'

const initialState = {
    orders : []
}

const orderReducer = (state = initialState, action) = () =>{
    
    switch(action.type){
        case ADD_ORDER: 
          
    }
    return state
}

export default orderReducer;