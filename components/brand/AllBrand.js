import React, { useState,useEffect } from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList, ActivityIndicatorComponent } from 'react-native';
  import {websiteApi,API_Category_Image_Url} from '../global/url'
 import HeaderComponent from '../global/Header';
import FooterComponent from '../global/Footer';
 import BrandRender from './BrandRender';
import LoadingActivator from '../global/LoadingActivator';

  export default function AllBrand(props) {  
 const [loadding,setLoding]=useState(true)
 const [brand,setBrand]=useState([])
const [page,setPage]=useState(1) 
useEffect(() => { 
    let brandUrl=websiteApi+"/all-mobile-brand-list?page="+page;  
    let config={method:'GET'}
        fetch(brandUrl,config).
      then((result)=>result.json()).
      then((response)=>{ 
        setLoding(false)
        setBrand(brand.concat(response.data))        
    }) .catch(error => {        
   });
 }, [page])  
 
 return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
      <Container>
         <HeaderComponent navigation={props.navigation} />  
        <ScrollView scrollEnabled>  
        {loadding && <LoadingActivator />}
      <FlatList      
        numColumns={2}
        data={brand}
        renderItem={({item})=><BrandRender navigation={props.navigation} brand_title={item.brand_title}  brand_id={item.brand_id} brand_picture={item.brand_picture} />}
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