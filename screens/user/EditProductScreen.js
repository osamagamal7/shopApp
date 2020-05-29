import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const EditProductScreen = (props) => {
    
    return (
        <View>
            <Text>{props.navigation.getParam('productId')}</Text>
        </View>
    )
}

export default EditProductScreen

const styles = StyleSheet.create({})
