import Order from "../../models/order"

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () =>{
    return async dispatch =>{
        try{
            const response = await fetch('https://shop-43e26.firebaseio.com/orders/u1.jon')
            if(!response.ok){
                throw new Error('Something went wrong!')
            }
            const resData = await response.json()
    
            const loadedOrders = []
            for(const key in resData){
                loadedOrders.push(new Order(key, resData[key].cartItems, resData[key].totalAmoount, resData[key].date))
            }
    
            dispatch({type: SET_ORDERS, orders: loadedOrders})
        }catch(err){
            throw err
        }
    }
}

export const addOrder = (cartItems, totalAmoount) =>{
    return async dispatch =>{
        const date = new Date()
        const response = await fetch('https://shop-43e26.firebaseio.com/orders/u1.json', { 
            method: 'post',
            body: JSON.stringify({ 
                 cartItems,
                 totalAmoount,
                 date: date.toISOString()
             }),
             headers:{
                 'content-type' : 'application/json'
             }
        })
        if(!response.ok){
            throw new Error('Something went wrong!')
        }
        const data = await response.json()
        console.log(data)

        dispatch({
            type: ADD_ORDER,
            orderData:{ items: cartItems, amount: totalAmoount, id: data.name , date: date }
        })
    }
}