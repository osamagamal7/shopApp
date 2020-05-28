import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import * as cartAction from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'

const cartScreen = (props) => {

    const sum = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        // getting the items obj (cart) and store 'em in an array
        const transformedItems = []
        for( const key in state.cart.items){
            transformedItems.push({
                itemId: key,   //getting each key and store it as a prop
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedItems.sort((a, b) => a.itemId > b.itemId? 1 : -1)
    })
    const dispatch = useDispatch()
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summartText}>Total:  
                    <Text style={styles.amount}> ${sum.toFixed(2)} </Text>
                </Text>
                <Button title="Order Now" color={Colors.accent} onPress={() =>dispatch(orderActions.addOrder(cartItems, sum))} disabled={cartItems.length === 0} />
            </View>
            
                <FlatList data={cartItems} keyExtractor={item => item.itemId} 
                renderItem={(itemData) =>(
                    <CartItem deletable quantity={itemData.item.quantity} title={itemData.item.productTitle} 
                        amount={itemData.item.sum} onRemove={() => {dispatch(cartAction.removeFromCart(itemData.item.itemId))}}
                    />
                )}
                />
        </View>
    )
}

cartScreen.navigationOptions = ({navigation}) =>{
    return{
        headerTitle: 'Your Cart'
    }
}

export default cartScreen

const styles = StyleSheet.create({
    screen:{
        margin: 20
    },
    summary:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowRadius: 8,
        shadowOpacity: 0.25,
        backgroundColor: 'white',
        shadowOffset:{width: 0, height: 2},
        padding: 10,
        borderRadius: 7,
        marginBottom: 20,
        elevation: 6
    },
    summartText: {
        fontFamily: 'open-sans-bold',
        fontSize: 17
    },
    amount:{
        color: Colors.primary,
    }
})
