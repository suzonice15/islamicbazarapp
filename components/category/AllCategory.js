import React, { useState,useEffect } from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList } from 'react-native';
  import {websiteApi,API_Category_Image_Url} from '../global/url'

 import HeaderComponent from '../global/Header';
import FooterComponent from '../global/Footer';
 import HomeCategory from '../home/HomeCategory'
import LoadingActivator from '../global/LoadingActivator';

  export default function AllCategory(props) {
   
    const [loadding,setLoding]=useState(true)

const [category,setCategory]=useState([])
const [page,setPage]=useState(1) 
useEffect(() => { 
   getCategory() 
 }, [page]) 
getCategory=()=>{  
    let home_category_url=websiteApi+"/all-mobile-category-list?page="+page;  
    let config={method:'GET'}
        fetch(home_category_url,config).
      then((result)=>result.json()).
      then((response)=>{ 
        setLoding(false)
               setCategory(category.concat(response.data))        
    }) .catch(error => {
        
      });
}
getMoreCategory =()=>{
  setPage(page+1)
}
 
 
    return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
      <Container>
         <HeaderComponent navigation={props.navigation} />  
        <ScrollView scrollEnabled> 
 

      <Text style={{textAlign:"center",padding:5,backgroundColor:"#2cb574",margin:5,color:"white",fontWeight:"bold"}}>All Categories
</Text> 
        {loadding && <LoadingActivator />}        
       
      <FlatList
      
        numColumns={2}
        data={category}
        renderItem={({item})=><HomeCategory navigation={props.navigation} category_title={item.category_title}  category_id={item.category_id} banner={item.banner} />}
        keyExtractor={(item) => item.category_id}      
        onEndReached={()=>setPage(page+1)}
        onEndReachedThreshold={.3}  
      />   
       
 
      
     </ScrollView>
     <FooterComponent navigation={props.navigation} />  
   
       </Container>
       </View>  
    );
 
}