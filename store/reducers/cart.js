import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import cartItem from '../../models/cart-Item'
const initialState = {
    items: {},
    totalAmount: 0
}


const cartReducer = (state = initialState, action) =>{
    switch(action.type){
        case ADD_TO_CART: 
        const addedProduct = action.product;
        const prodPrice = addedProduct.price;
        const productTitle = addedProduct.title;

        if(state.items[addedProduct.id]){
            //if it already has this specific product just update the quantity
            const updatedProduct = new cartItem(state.items[addedProduct.id].quantity + 1,
                prodPrice,
                productTitle,
                state.items[addedProduct.id].sum + prodPrice
                
            )
            return{
                ...state,
                items: {...state.items, [addedProduct.id]: updatedProduct},
                totalAmount: state.totalAmount + prodPrice

            }
        }else{
            //if not, add a new product to the state
            const newProduct = new cartItem(1, prodPrice, productTitle, prodPrice)
            return {...state, 
                items: {...state.items, [addedProduct.id]: newProduct },
                totalAmount: state.totalAmount + prodPrice
            }
        }

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.prodId]  //every obj
            console.log(action.prodId)
            const currentQnt = selectedCartItem.quantity
            let updatedProductItems;
            if(currentQnt > 1){
                const updatedItem = new cartItem( selectedCartItem.quantity - 1, 
                    selectedCartItem.productPrice, selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                    )
                
                updatedProductItems = {...state.items, [action.prodId]: updatedItem} 
                
            }else{
                 updatedProductItems = {...state.items }
                 delete updatedProductItems[action.prodId]
            }
            return {...state,
                    items: updatedProductItems,
                    totalAmount: state.totalAmount - selectedCartItem.productPrice
                     }
    }

    return state;
}

export default cartReducer 