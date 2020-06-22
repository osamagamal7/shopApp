import Product from "../../models/product"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const SET_PRODUCTS = 'SET_PRODUCTS'


export const fetchProducts = () =>{
    return async (dispatch) =>{
        try{
            const res = await fetch('https://shop-43e26.firebaseio.com/products.json')  
            if(!res.ok){
                throw new Error('something went wrong!')
            }
            const data = await res.json()
            const availableProducts = []
            for(const key in data){
                availableProducts.push(
                    new Product(
                         key, 'u1',
                         data[key].title, 
                         data[key].imageUrl, 
                         data[key].description, 
                         data[key].price))
            }
            dispatch({type: SET_PRODUCTS, products: availableProducts})
        }catch(err){
            throw err
        }
}

    
}

export const deleteProduct = (productId) =>{
    return async(dispatch) =>{
       const response =  await fetch(`https://shop-43e26.firebaseio.com/products/${productId}.json`, {
            method: 'Delete'
        })
        if(!response.ok){
            throw new Error('Something Went Wrong!')
        }
        dispatch({
            type: DELETE_PRODUCT,
            prdId: productId
        })
    }
}

export const createProduct = ( title, price, description, image ) =>{
    return async (dispatch) =>{
        try{
            const res = await fetch('https://shop-43e26.firebaseio.com/products.json', {
            method: 'post',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                price,
                description,
                image
            })
        })
        const data = await res.json()
        
        dispatch({
            type: CREATE_PRODUCT,
            itemData:{
                id: data.name,
                title,
                price,
                description,
                image
            }
        })
        }catch(err){
            throw err
        }

    }
}
export const updateProduct =  ( id, title, description, image ) =>{
    return async(dispatch) =>{
        
           const response = await fetch(`https://shop-43e26.firebaseio.com/products/${id}.json`, {
            method: 'patch',
            body: JSON.stringify({
                title,
                description,
                image
            })
        })
        if(!response.ok){
            throw new Error('Something Went Wrong!')
        }
        dispatch({
            type: UPDATE_PRODUCT,
            pId: id,
            itemData:{
                title,
                description,
                image
            }
        })
        
        
    }
}

