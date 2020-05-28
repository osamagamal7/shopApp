import PRODUCTS from '../../data/dummy-data'


const initialState = {
    availableProducts: PRODUCTS,                    //all the prdcts
    userProducts: PRODUCTS.filter(prod =>(
        prod.ownerId === 'u1'             //the prdcts the user created (we are setting up dummy data rn)
    ))                        
}

const productsReducer = (state = initialState, action) =>{
     return state;
}



export default productsReducer;