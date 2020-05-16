import React from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import { useSelector } from 'react-redux'



const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts)
    return (
        <FlatList data={products} renderItem={itemData => (
            <View>
                <Text>{itemData.item.title}</Text>
            </View>
        )} />
    )
}


ProductsOverviewScreen.navigationOptions = {
        headerTitle: 'All Products'
    
    
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})
