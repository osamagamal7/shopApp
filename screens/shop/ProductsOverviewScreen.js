import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, FlatList, View, Text, Platform, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartAction from '../../store/actions/cart'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import cartItem from '../../models/cart-Item'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/product'

const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts) 
    const dispatch = useDispatch()
    const [isLoaded, setIsloaded] = useState(false)
    const [error, setError] = useState()

    const loadProducts = useCallback(async () =>{
        setError(null)
        setIsloaded(true)
    try{
       await dispatch(productsActions.fetchProducts())
    }catch(err){
        setError(err.message)
    }
    setIsloaded(false)
}, [dispatch, setError, setIsloaded])


    useEffect(() =>{
        loadProducts()
    }, [dispatch, loadProducts])  
    
    useEffect(() =>{
        const willFocus = props.navigation.addListener('willFocus', loadProducts)
        return() =>{
            willFocus.remove()
        }
    }, [loadProducts])

    if(error){
       return <View style={styles.centerd}>
            <Text>{error}</Text>
            <Button title="try again" onPress={loadProducts} color={Colors.primary} />
        </View>
    }

    if(!isLoaded && products.length === 0){
        return <View style={styles.centerd}>
            <Text>There are no Products yet.</Text>
        </View>
    }

    if(isLoaded){
       return <View style={styles.centerd}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
    }

    return (
        <FlatList  data={products} renderItem={itemData => (
            <ProductItem 
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => onSelectHandler(itemData.item.id, itemData.item.title)}
            >
                <Button title='View Details' color={Colors.primary} onPress={() => onSelectHandler(itemData.item.id, itemData.item.title)}/>
                <Button title='To Cart' color={Colors.primary} onPress={() => {dispatch(cartAction.addToCart(itemData.item))}}/>
         </ProductItem>
          )} />
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

const styles = StyleSheet.create({
    centerd:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
