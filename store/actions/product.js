export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"


export const deleteProduct = (productId) =>{
    return{
        type: DELETE_PRODUCT,
        prdId: productId
    }
}

export const createProduct = ( title, price, description, image ) =>{
    return{
        type: CREATE_PRODUCT,
        itemData:{
            title,
            price,
            description,
            image
        }
    }
}
export const updateProduct =  ( id, title, description, image ) =>{
    return{
        type: UPDATE_PRODUCT,
        pId: id,
        itemData:{
            title,
            description,
            image
        }
    }
}

