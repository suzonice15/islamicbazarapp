import React, { useState,useEffect } from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList } from 'react-native';
  import {websiteApi,API_Category_Image_Url} from '../global/url'
 import HeaderComponent from '../global/Header';
import FooterComponent from '../global/Footer';
 import ProductRender from '../brand/ProductRender';

  export default function BandProduct(props) { 
      let brand_id=147 
 const [product,setProduct]=useState([])
const [page,setPage]=useState(1) 
useEffect(() => { 
    let brandUrl=websiteApi+"/mobile-brand-product/"+brand_id+"?page="+page;  
    let config={method:'GET'}
        fetch(brandUrl,config).
      then((result)=>result.json()).
      then((response)=>{ 
        console.log(response)
        setProduct(product.concat(response.data))        
    }) .catch(error => {        
   });
 }, [page]) 
  
 
return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
      <Container>
         <HeaderComponent navigation={props.navigation} />  
        <ScrollView scrollEnabled>          
       
      <FlatList      
        numColumns={2}
        data={product}
        renderItem={({item})=><ProductRender navigation={props.navigation}
         product_id={item.product_id}  main_image={item.main_image} 
         folder={item.folder} product_title={item.product_title} 
         discount_price={item.discount_price} product_price={item.product_price} 
         />}
        keyExtractor={(item) => item.brand_id}      
        onEndReached={()=> setPage(page+1)}
        onEndReachedThreshold={.3}  
      />  
      
     </ScrollView>
     <FooterComponent navigation={props.navigation} />  
   
       </Container>
       </View>  
    );
 
}