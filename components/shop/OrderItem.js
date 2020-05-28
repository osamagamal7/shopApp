import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Colors from '../../constants/Colors'
import CartItem from './CartItem'

const OrderItem = (props) => {
    const [showItem, setShowItem] = useState(false)
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>{props.amount}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title={ showItem? "HIDE DETAILS" : "SHOW DETAILS"} onPress={() => {setShowItem(prevState => !prevState)}} color={Colors.primary} />
            <View style={styles.itemsDetail}>
                { showItem && <View style={styles.itemsDetail}>
                    {props.items.map(cartItem => (
                        <CartItem
                             key={cartItem.itemId}
                             quantity={cartItem.quantity}
                             title={cartItem.productTitle}
                             amount={cartItem.sum}
                              />
                        ) )}
                </View> }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    orderItem:{
        margin: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset:{width: 0, height: 2},
        backgroundColor: 'white',
        borderRadius: 10, 
        elevation: 6,
        alignItems: 'center'

    },
    summary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    amount:{
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date:{
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    itemsDetail:{
        width: '100%'
    }
})

export default OrderItem