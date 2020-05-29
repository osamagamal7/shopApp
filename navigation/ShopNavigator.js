import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import { Platform } from 'react-native'
import Colors from '../constants/Colors'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductsDetailScreen from '../screens/shop/ProductsDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import { createDrawerNavigator } from 'react-navigation-drawer'
import OrderScreen from '../screens/shop/OrderScreen'
import {Ionicons} from '@expo/vector-icons'
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const defaultNavOptions = {
    headerStyle:{
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android'? 'white' : Colors.primary,
    headerTitleStyle:{
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily: 'open-sans'
    }
    
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail:{
        screen : ProductsDetailScreen
    },
    Cart:{
        screen: CartScreen
    }
    
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions:{
        drawerIcon: (drawerConfig) => (
        <Ionicons 
            name={Platform.OS === 'android'? 'md-cart' : 'ios-cart' }
            size={23}
            color={drawerConfig.tintColor} />
        )}
})


const OrdersNavigator = createStackNavigator({
    orders: OrderScreen
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions:{
        drawerIcon: (drawerConfig) => (
        <Ionicons 
            name={Platform.OS === 'android'? 'md-list' : 'ios-list' }
            size={23}
            color={drawerConfig.tintColor} />
        )}
})
const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProducts: EditProductScreen
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions:{
        drawerIcon: (drawerConfig) => (
        <Ionicons 
            name={Platform.OS === 'android'? 'md-list' : 'ios-list' }
            size={23}
            color={drawerConfig.tintColor} />
        )}
})


const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: {
        screen: AdminNavigator,
        navigationOptions:{
            drawerIcon: (drawerConfig) => (
            <Ionicons 
                name={Platform.OS === 'android'? 'md-create' : 'ios-create' }
                size={23}
                color={drawerConfig.tintColor} />
            )}
    }
},{
    contentOptions:{
        activeTintColor: Platform.OS === 'android'? 'white' : Colors.primary
    }
})


export default createAppContainer(ShopNavigator)