import React, { useState,useEffect ,useContext} from 'react';
import {Toast, Thumbnail,Card,CardItem,Content,Container,Item,Badge, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { SliderBox } from "react-native-image-slider-box";
import { Image, View,ScrollView,FlatList } from 'react-native';
import WhyChoose from '../global/whyChoose';
 import {websiteApi,API_Category_Image_Url} from '../global/url'
 import HeaderComponent from '../global/Header';
import FooterComponent from '../global/Footer';
import RenderItem from './RenderItem'
import Offer from './Offer'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoadingActivator from '../global/LoadingActivator';
import ProductRender from '../brand/ProductRender';
import { AuthContext } from '../global/Context';


  export default function Category(props) {
    const {category_id,category_title}=props.route.params
    const [products,setProduct]=useState([])
     const [loading,setLoading]=useState(true)
      const {setUserCartItem,userCartItem}= useContext(AuthContext)

     const [page,setPage]=useState(1)
     useEffect(() => { 
    getCategory()  
 
 }, [category_id])
 

const getCategory=()=>{  
  let category_url=websiteApi+"/mobile-category/"+category_id; 
  let config={method:'GET'}
   fetch(category_url,config).then((result)=>result.json()). 
   then((response)=>{    
      setProduct(response);    
    setLoading(false)
   }).catch((error)=>{
   
    });    
} 

const addToCart=(cart_product_id,product_title)=>{    
        
  Toast.show({
   text: product_title+" Added to your Cart",
   type:"success"
   
 })
var add_cart_url=websiteApi+"addCart/"+cart_product_id+"/1"
let config={method:'GET'}
fetch(add_cart_url,config).then((result)=>result.json()). 
then((response)=>{ 
setUserCartItem(response)
AsyncStorage.setItem("cart_count",response);

console.log(response)
}).catch((error)=>{

})

}
 
 
 
    return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
      <Container>
         <HeaderComponent navigation={props.navigation} />  
        <ScrollView scrollEnabled> 
        <View style={{flex:2,flexDirection:"row",padding:10,justifyContent:"center"}}>
  <View style={{flex:1,backgroundColor:"#2cb574",}}>
      <Text style={{textAlign:"center",padding:2,margin:5,color:"white",fontWeight:"bold"}}>{category_title}</Text>
</View>  
 </View> 
       { loading ? <LoadingActivator  /> :
       <FlatList      
        numColumns={2}
        data={products}
        renderItem={({item})=><ProductRender navigation={props.navigation}
         product_id={item.product_id}  main_image={item.main_image} 
         folder={item.folder} product_title={item.product_title} 
         discount_price={item.discount_price} product_price={item.product_price} 
         addToCart={addToCart}
         />}
        keyExtractor={(item) => item.product_id}      
        onEndReached={()=> setPage(page+1)}
        onEndReachedThreshold={.3}  
      /> 
    }

      
     </ScrollView>
     <FooterComponent  navigation={props.navigation} />  
   
       </Container>
       </View>  
    );
 
}