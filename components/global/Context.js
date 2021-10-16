import React,{ useState } from 'react';
 import { View ,useWindowDimensions } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
export const AuthContext=React.createContext()
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = ({ children }) => {
    const globalWidth = useWindowDimensions().width;
    const globalHeight = useWindowDimensions().height;
 const [LoginAdminUser,setLoginAdminUser]=useState(false)    
    const [userCartItem,setUserCartItem]=useState(0)
    const [userWishlistItem,setUserWishlistItem]=useState(0)
     const [modalShow,setModalShow]=useState(true)  
     const getAsyncStorageData=async()=>{
        const firstLogin = await AsyncStorage.getItem("api_token");
        if(firstLogin){            
           setLoginAdminUser(true)
           }else {
            setLoginAdminUser(false)
           } 
           const wishlist_count = await AsyncStorage.getItem("wishlist_count");
           if(wishlist_count){
               setUserWishlistItem(wishlist_count) 
           } else {
               setUserWishlistItem(0) 
           }
           const cart_count =await AsyncStorage.getItem("cart_count");
           if(cart_count){
            setUserCartItem(cart_count) 
           } else {
            setUserCartItem(0) 
           }

           }
           useEffect(() => { 
            getAsyncStorageData();

           },[])
    
    
    return (       
          <AuthContext.Provider value={{LoginAdminUser,setLoginAdminUser,userCartItem,userWishlistItem,setUserWishlistItem, setUserCartItem,globalWidth,globalHeight}}>
          {children}
        </AuthContext.Provider>
    );
};

 
export default Context;