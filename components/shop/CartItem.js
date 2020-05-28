import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
const CartItem = (props) => {
    return (
        <View style={styles.cartItem}>
           <View style={styles.itemData}>
               <Text style={styles.quantity}>{props.quantity} </Text>
               <Text style={styles.title}>{props.title}</Text>
           </View>
           <View style={styles.itemData}>
               <Text style={styles.amount}>{props.amount.toFixed(2)}</Text>

            {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteBtn}>
                <Ionicons name={Platform.OS === 'android'? 'md-trash' : 'ios-trash'} 
                    size={23} color='red' 
                />
            </TouchableOpacity>}
               
           </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartItem:{
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity:{
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    title:{
        fontSize: 16,
       fontFamily: 'open-sans-bold' ,
    },
    amount:{
        fontSize: 16,
        fontFamily: 'open-sans-bold' ,
    },
    deleteBtn:{
        marginLeft: 20
    }
})
