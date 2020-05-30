import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Platform } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import * as productsActions from '../../store/actions/product'


const EditProductScreen = (props) => {
    const prodId = props.navigation.getParam('productId')
    const editProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
      );

    const dispatch = useDispatch()
    const [title,setTitle] = useState(editProduct? editProduct.title: '')
    const [price,setPrice] = useState('')
    const [imageUrl,setImageUrl] = useState(editProduct? editProduct.imageUrl: '')
    const [description,setDescription] = useState(editProduct? editProduct.description: '')


    const submitHandler = useCallback(() =>{
        if(editProduct){
            dispatch(productsActions.updateProduct(prodId, title, description, imageUrl))
        }else{
            dispatch(productsActions.createProduct(title, +price, description, imageUrl))
        }
        props.navigation.goBack()
    }, [dispatch, prodId, title, description, imageUrl, price])

    useEffect(() =>{
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.userInput} value={title} onChangeText={val => setTitle(val)} />
                </View>

                {editProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.userInput} value={price} onChangeText={val => setPrice(val)} />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.userInput} value={imageUrl} onChangeText={val => setImageUrl(val)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.userInput} value={description} onChangeText={val => setDescription(val)} />
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = (navData) =>{
    const submit = navData.navigation.getParam('submit')
    return{
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product' ,
        headerRight: () => {
            return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='cart' iconName={Platform.OS === 'android'? 'md-checkmark' : 'ios-checkmark'} 
                    onPress={submit} />
            </HeaderButtons>
        },
    }
}

const styles = StyleSheet.create({
    form:{
        margin: 20
    },
    formControl:{
        width: '100%'
    },
    label:{
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    userInput:{
        borderBottomWidth: 1,
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc'
    }
})

export default EditProductScreen