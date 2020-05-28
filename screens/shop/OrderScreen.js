import React from 'react'
import { StyleSheet, Text, Platform, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

const OrderScreen = (props) => { 
    const orders = useSelector(state => state.orders.orders)
    return (
        <FlatList data={orders} keyExtractor={item => item.id} renderItem={itemData => (
            <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readbleDate} items={itemData.item.items}  />
        )} /> 
    )
}

OrderScreen.navigationOptions = ({navigation}) =>{
    return{
        headerTitle: 'Your Orders',
        headerLeft: () => {
            return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='menu' iconName={Platform.OS === 'android'? 'md-menu' : 'ios-menu'} 
                    onPress={() => {navigation.toggleDrawer()}} />
            </HeaderButtons>
        },
    }
}



const styles = StyleSheet.create({})

export default OrderScreen

