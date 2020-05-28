import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import { deleteProduct } from '../../store/actions/product'


const UserProductsScreen = (props) => {

    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()
    return (
        
       <FlatList data={userProducts} keyExtractor={item => item.id} renderItem={itemData => (
            <ProductItem 
                title={itemData.item.title} 
                price={itemData.item.price}  
                image={itemData.item.imageUrl}
                onSelect={() => {}} >

                <Button title='Edit' onPress={() => {}} color={Colors.primary} />
                <Button title='Delete' onPress={() => dispatch(deleteProduct(itemData.item.id)) } color={Colors.primary} />
             </ProductItem>
        )} />
    )
}

UserProductsScreen.navigationOptions = ({navigation}) =>{
    return{
        headerTitle: 'Your Products',
        headerLeft: () => {
            return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                     title='menu'
                    iconName={Platform.OS === 'android'? 'md-menu' : 'ios-menu'} 
                    onPress={() => {navigation.toggleDrawer()}} />
            </HeaderButtons>
        }
    }
}

const styles = StyleSheet.create({})

export default UserProductsScreen