import React from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartAction from '../../store/actions/cart'


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


ProductsOverviewScreen.navigationOptions = {
        headerTitle: 'All Products'
    
    
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})
