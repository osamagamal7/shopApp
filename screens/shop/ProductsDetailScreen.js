import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native'
import { useSelector } from 'react-redux'

const ProductsDetailScreen = (props) => {

    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
   
    // useEffect(() =>{
    //     props.navigation.setParams({title: selectedProduct.title})
    // }, [])

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.actions}>
                <Button title='Add To Cart' onPress={() => {}}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

ProductsDetailScreen.navigationOptions = ({navigation}) =>{

    const title = navigation.getParam('title')
    return{
        headerTitle: title
    }
}

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 300
    },
    price:{
        fontSize: 20,
        marginVertical: 20,
        textAlign: 'center',
        color: '#888',
        fontFamily: 'open-sans-bold'
    },
    description:{
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    },
    actions:{
        alignItems: 'center',
        marginVertical: 15,
    }
})

export default ProductsDetailScreen

