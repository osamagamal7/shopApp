import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT } from '../actions/product';
import Product from '../../models/product';


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
        case CREATE_PRODUCT:
            const newProduct = new Product(new Date().toString(), 'u1', action.itemData.title,
             action.itemData.image, action.itemData.description, action.itemData.price )
             return{...state, 
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            //for the user Products
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pId)
            const updatedProduct = new Product( action.pId, state.userProducts[productIndex].ownerId,
                 action.itemData.title, action.itemData.image, action.itemData.description,
                  state.userProducts[productIndex].price )

            const updatedUserProducts = [...state.userProducts]
            updatedUserProducts[productIndex] = updatedProduct
                //for the available products
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pId)
            const updatedAvailableProducts = [...state.availableProducts]
            updatedAvailableProducts[availableProductIndex] = updatedProduct

            return{
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
    }


     return state;
}



export default productsReducer;