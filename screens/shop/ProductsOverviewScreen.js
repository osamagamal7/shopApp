import React from 'react'
import { StyleSheet, FlatList, View, Text, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartAction from '../../store/actions/cart'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import cartItem from '../../models/cart-Item'
const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts) 
    const dispatch = useDispatch()
    return (
        <FlatList  data={products} renderItem={itemData => (
            <ProductItem 
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetails={() => props.navigation.navigate('ProductDetail', {
                productId: itemData.item.id, title: itemData.item.title})
                }
            onAddToCart={() => {dispatch(cartAction.addToCart(itemData.item))}}
         /> )} />
    )
}


ProductsOverviewScreen.navigationOptions = ({navigation}) => {
    return{
        headerTitle: 'All Products',
        headerRight: () => {
            return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='cart' iconName={Platform.OS === 'android'? 'md-cart' : 'ios-cart'} 
                    onPress={() => {navigation.navigate('Cart')}} />
            </HeaderButtons>
        },
        headerLeft: () => {
            return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='menu' iconName={Platform.OS === 'android'? 'md-menu' : 'ios-menu'} 
                    onPress={() => {navigation.toggleDrawer()}} />
            </HeaderButtons>
        },
    }
    
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})
