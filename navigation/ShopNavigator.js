import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import { Platform } from 'react-native'
import Colors from '../constants/Colors'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductsDetailScreen from '../screens/shop/ProductsDetailScreen'
import CartScreen from '../screens/shop/CartScreen'

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail:{
        screen : ProductsDetailScreen
    },
    Cart:{
        screen: CartScreen
    }
    
}, {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android'? 'white' : Colors.primary,
        headerTitleStyle:{
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily: 'open-sans'
        }
        
    }
})



export default createAppContainer(ProductsNavigator)