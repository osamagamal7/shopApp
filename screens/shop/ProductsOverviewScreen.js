import React from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'



const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts)
    return (
        <FlatList  data={products} renderItem={itemData => (
            <ProductItem 
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetails={() => props.navigation.navigate('ProductDetail', {
                productId: itemData.item.id, title: itemData.item.title})
                }
            onAddToCart={() => {}}
         /> )} />
    )
}


ProductsOverviewScreen.navigationOptions = {
        headerTitle: 'All Products'
    
    
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})
