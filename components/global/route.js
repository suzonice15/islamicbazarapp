/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {View} from 'react-native' 
 import { createDrawerNavigator, DrawerView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Sidebar from '../global/Sidebar';
 
import HomeComponent from '../home/HomeComponent'
import CategoryComponent from '../category/Category'
import PageComponent from '../page/page'
import SingleOfferComponent from '../offer/SingleOffer'
import offerComponent from '../offer/Offer'
import AllCategoryComponent from '../category/AllCategory'
import AllBrandComponent from '../brand/AllBrand'
import BandProduct from '../brand/BandProduct'
 import ProductComponent from '../product/SingleProduct'
import CartComponent from '../cart/cart'
import WishlistComponent from '../wishlist/wishlist'
import LoginComponent from '../auth/Login'
import RegistrationComponent from '../auth/Registration'
import AllProductComponent from '../product/AllProduct'
import OrderCreateComponent from '../order/Create'
import AccountComponent from '../user/Account'
import ProfileComponent from '../user/Profile'
import UserOrderComponent from '../user/Order'
import SingleOrderComponent from '../user/SingleOrder'
import SingleOrderViewComponent from '../user/SingleOrderView'
import UserAddressComponent from '../user/UserAddress'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
 
export default function Route() {  
   return (
    <View
      style={{
        flex: 1
             
      }}>        
      <NavigationContainer 
       independent={true}
      
      >
         <Drawer.Navigator
          initialRouteName='Home'
        
          drawerContent={(props) => <Sidebar {...props}   />}>  
          <Drawer.Screen name="Home" component={HomeComponent}  options={{ headerShown: 
   false }}/>
     <Drawer.Screen name="Category" component={CategoryComponent}   options={{ headerShown: 
   false }} />
    <Drawer.Screen name="Page" component={PageComponent}   options={{ headerShown: 
   false }} />
    <Drawer.Screen name="SingleOffer" component={SingleOfferComponent}   options={{ headerShown: 
   false }} />
     <Drawer.Screen name="Offer" component={offerComponent}   options={{ headerShown: 
   false }} />
    <Drawer.Screen name="AllCategory" component={AllCategoryComponent}   options={{ headerShown: 
   false }} />
    <Drawer.Screen name="AllProduct" component={AllProductComponent}   options={{ headerShown: 
   false }} />
   <Drawer.Screen name="AllBrand" component={AllBrandComponent}   options={{ headerShown: 
   false }} />
    <Drawer.Screen name="BandProduct" component={BandProduct}   options={{ headerShown: 
   false }} />

<Drawer.Screen name="Product" component={ProductComponent}   options={{ headerShown: 
   false }} />
   
<Drawer.Screen name="Cart" component={CartComponent}   options={{ headerShown: 
   false }} />


<Drawer.Screen name="Wishlist" component={WishlistComponent}   options={{ headerShown: 
   false }} />

<Drawer.Screen name="login" component={LoginComponent}   options={{ headerShown: 
   false }} />

<Drawer.Screen name="Registration" component={RegistrationComponent}   options={{ headerShown: 
   false }} />

        
<Drawer.Screen name="OrderCreate" component={OrderCreateComponent}   options={{ headerShown: 
   false }} />
           
<Drawer.Screen name="Account" component={AccountComponent}   options={{ headerShown: 
   false }} />
   <Drawer.Screen name="Profile" component={ProfileComponent}   options={{ headerShown: 
   false }} />
      <Drawer.Screen name="UserOrder" component={UserOrderComponent}   options={{ headerShown: 
   false }} />
     <Drawer.Screen name="SingleOrder" component={SingleOrderComponent}   options={{ headerShown: 
   false }} />
   <Drawer.Screen name="SingleOrderView" component={SingleOrderViewComponent}   options={{ headerShown: 
   false }} />
      <Drawer.Screen name="UserAddress" component={UserAddressComponent}   options={{ headerShown: 
   false }} />
   
   
   
   

        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
