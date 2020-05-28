import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT } from '../actions/product';


const initialState = {
    availableProducts: PRODUCTS,                    //all the prdcts
    userProducts: PRODUCTS.filter(prod =>(
        prod.ownerId === 'u1'             //the prdcts the user created (we are setting up dummy data rn)
    ))                        
}

const productsReducer = (state = initialState, action) =>{

    switch(action.type){
        case DELETE_PRODUCT:
            return{
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.prdId),
                userProducts: state.userProducts.filter(prod => prod.id !== action.prdId)
            }
    }

     return state;
}



export default productsReducer;