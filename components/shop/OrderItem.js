import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Colors from '../../constants/Colors'

const OrderItem = (props) => {
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>{props.amount}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title="SHOW DETAILS" onPress={() => {}} color={Colors.primary} />
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
    }
})

export default OrderItem