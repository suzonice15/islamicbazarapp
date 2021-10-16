import React, { useState,useEffect ,useContext} from 'react';
import {Toast, Thumbnail,Card,CardItem,Content,Container,Item,Badge, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList, ActivityIndicatorComponent } from 'react-native';
  import {websiteApi,API_Category_Image_Url} from '../global/url'
 import HeaderComponent from '../global/Header';
import FooterComponent from '../global/Footer';
import LoadingActivator from '../global/LoadingActivator';
import ProductRender from '../brand/ProductRender';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../global/Context';

  export default function AllProduct(props) {  
     const {setUserCartItem,userCartItem}= useContext(AuthContext)

 const [loadding,setLoding]=useState(true)
 const [products,setProduct]=useState([])
const [page,setPage]=useState(1) 
useEffect(() => { 
    let brandUrl=websiteApi+"/all-mobile-products?page="+page;  
    let config={method:'GET'}
        fetch(brandUrl,config).
      then((result)=>result.json()).
      then((response)=>{ 
        setLoding(false)
        setProduct(products.concat(response.data))        
    }) .catch(error => {        
   });
 }, [page])  


 
const addToCart=(cart_product_id,product_title)=>{    
        
    Toast.show({
      position:"top",
     text: product_title+" Added to your Cart",
     type:"success"
     
   })
  var add_cart_url=websiteApi+"addCart/"+cart_product_id+"/1"
  let config={method:'GET'}
  fetch(add_cart_url,config).then((result)=>result.json()). 
  then((response)=>{  
    setUserCartItem(response)
    AsyncStorage.setItem("cart_count",response);
   
  }).catch((error)=>{
  
  })
  
  }
 
 return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
      <Container>
         <HeaderComponent navigation={props.navigation} />  
        <Content style={{flex: 1}}  > 
        <View style={{flex:2,flexDirection:"row",padding:10,justifyContent:"center"}}>
  <View style={{flex:1,backgroundColor:"#2cb574",}}>
      <Text style={{textAlign:"center",padding:2,margin:5,color:"white",fontWeight:"bold"}}>All Products</Text>
</View>  
 </View> 
        {loadding && <LoadingActivator />}
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
        onEndReachedThreshold={.5}  
      /> 

     </Content>
     <FooterComponent navigation={props.navigation} />  
   
       </Container>
       </View>  
    );
 
}