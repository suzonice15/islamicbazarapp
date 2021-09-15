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



        
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
