import React from 'react'
import { StyleSheet, Text, View, Image, Button , TouchableOpacity} from 'react-native'
import Colors from '../../constants/Colors'

const ProductItem = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onSelect}> 
            <View style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: props.image}} />
                </View>
                <View style={styles.detail}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.action}>
                    {props.children}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    product:{
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset:{width: 0, height: 2},
        backgroundColor: 'white',
        borderRadius: 10, 
        elevation: 6,
        height: 300,
        margin: 20,
    },
    image:{
        height: '100%',
        width: '100%'
    },
    imageContainer:{
        height: '60%',
        width: '100%',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
        
    },
    title:{
        fontSize: 18,
        marginVertical: 4,
        fontFamily: 'open-sans-bold'
    },
    price:{
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    detail:{
        alignItems: 'center',
        height: '25%',
        padding: 10
    },
    action:{
        flexDirection: 'row',
        height: '15%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    }
})

export default ProductItem

