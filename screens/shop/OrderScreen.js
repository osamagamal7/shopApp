import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Platform, FlatList, ActivityIndicator, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as orderActions from '../../store/actions/orders'
import Colors from '../../constants/Colors'

const OrderScreen = (props) => { 
    const orders = useSelector(state => state.orders.orders)
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState()
    const dispatch = useDispatch()

    useEffect(() =>{
        setIsLoaded(true)
        dispatch(orderActions.fetchOrders())
        .then( () => setIsLoaded(false) )
        .catch((err) => setError(err.message))
        
    }, [dispatch])

    if(error){
        return <View style={styles.centered}>
            <Text>{error}</Text>
        </View>
    }

    if(isLoaded){
       return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }
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



const styles = StyleSheet.create({
    centered:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrderScreen

