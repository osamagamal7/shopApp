import React, { useState, useCallback, useEffect, useReducer } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Platform, Alert, ActivityIndicator } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import * as productsActions from '../../store/actions/product'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer =  (state, action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedInputValues = { ...state.inputValues, [action.input]: action.value } 

        const updatedInputValidations = {...state.inputValidates, [action.input]: action.isValid}
         
//helper const to loop on the validities obj of every input, if any prop is false, it'll be overwritten to false
        let updateFormValid = true;  
        for(let key in updatedInputValidations){
            updateFormValid = updateFormValid && updatedInputValidations[key]
        }
        return{
            ...state,
            inputValues: updatedInputValues,
            inputValidates: updatedInputValidations,
            formValid: updateFormValid
        }
    }

    return state
}


const EditProductScreen = (props) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState()
    const prodId = props.navigation.getParam('productId')
    const editProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
      );

    const dispatch = useDispatch()

    const [formState, dispatchFormInput] = useReducer(formReducer, {
        inputValues:{
            title: editProduct? editProduct.title: '',
            price: '',
            imageUrl: editProduct? editProduct.imageUrl: '',
            description: editProduct? editProduct.description: ''
        },
        inputValidates:{
            title: editProduct? true: false,
            price: editProduct? true: false,
            imageUrl: editProduct? true: false,
            description: editProduct? true: false,

        },
        formValid: editProduct? true: false
    })

    useEffect(() =>{
        if(error){
            Alert.alert('an error occured!', error, [{
                text: 'Okay'
            }])
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        if (!formState.formValid) {
          Alert.alert('Wrong input!', 'Please check the errors in the form.', [
            { text: 'Okay' }
        ]);
            return
        }
        setError(null);
        setIsLoaded(true);
        try {
          if (editProduct) {
            await dispatch(productsActions.updateProduct(prodId, formState.inputValues.title,
                formState.inputValues.description, formState.inputValues.imageUrl))
          } else {
            await  dispatch(productsActions.createProduct(formState.inputValues.title,
                +formState.inputValues.price, formState.inputValues.description, formState.inputValues.imageUrl))
          }
          props.navigation.goBack();
        } catch (err) {
          setError(err.message);
        }
    
        setIsLoaded(false);
        
      }, [dispatch, prodId, formState]);
    
      useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
      }, [submitHandler]);

   

    const inputChangeHandler = useCallback((identfierText, inputValue, inputValidity) =>{
        dispatchFormInput({
            type: FORM_INPUT_UPDATE, 
            value: inputValue,
            isValid: inputValidity, 
            input: identfierText
         })
    }, [dispatchFormInput])


    if(isLoaded){
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }
    return (
        <ScrollView>
            <View style={styles.form}>
                <Input 
                    id="title"
                    label="Title"
                    errorText="Please enter a valid title!"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editProduct ? editProduct.title : ''}
                    initiallyValid={!!editProduct}
                    required
                />
                {editProduct ? null : (
                <Input
                    id="price"
                    label="Price"
                    errorText="Please enter a valid price!"
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    required
                    min={0.1}
                  />)}
                <Input
                    id="imageUrl"
                    label="Image Url"
                    errorText="Please enter a valid image url!"
                    keyboardType="default"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editProduct ? editProduct.imageUrl : ''}
                    initiallyValid={!!editProduct}
                    required
                />
               <Input
                    id="description"
                    label="Description"
                    errorText="Please enter a valid description!"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    onInputChange={inputChangeHandler}
                    initialValue={editProduct ? editProduct.description : ''}
                    initiallyValid={!!editProduct}
                    required
                    minLength={5}
                />
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
    centered:{
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
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