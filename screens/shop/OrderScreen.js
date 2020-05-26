import React from 'react'
import { StyleSheet, Text, Platform, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'

const OrderScreen = (props) => {
    const orders = useSelector(state => state.orders.orders)
    return (
        <FlatList data={orders} keyExtractor={item => item.id} renderItem={itemData => (
            <Text>{itemData.item.totalAmount}</Text>
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

