import React, { useState,useEffect } from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { SliderBox } from "react-native-image-slider-box";
import { Image, View,ScrollView,FlatList } from 'react-native';
import WhyChoose from '../global/whyChoose';
 import {websiteApi,API_Category_Image_Url} from '../global/url'

 import HeaderComponent from '../global/Header';
import FooterComponent from '../global/Footer';
import Slider from './Slider';
import Offer from './offerComponent' 
import HomeCategory from './HomeCategory'

  export default function HomeComponent(props) {
   

const [slider,setSlider]=useState([])
const [offer,setOffer]=useState([])
 
const [category,setCategory]=useState([])
const [page,setPage]=useState(1)
useEffect(() => {
  getOffer(); 
 getApiData();

   
}, [])

useEffect(() => { 
   getCategory()
 
 }, [page])
const getApiData=()=>{ 
  let slider_url=websiteApi+"/mobileSliders"; 
  let config={method:'GET'}
   fetch(slider_url,config).then((result)=>result.json()). 
   then((response)=>{      
    setSlider(response.slider_picture)
   }).catch((error)=>{
   
    }); 
   
}

getOffer=()=>{
     let offferUrl=websiteApi+"/homeOffers";  
    let config={method:'GET'}
      fetch(offferUrl,config).
      then((result)=>result.json()).
      then((response)=>{  
         setOffer(response)        
    }).catch(error => {
       });
}
getCategory=()=>{

  
    let home_category_url=websiteApi+"/home-mobile-category?page="+page;  
    let config={method:'GET'}
        fetch(home_category_url,config).
      then((result)=>result.json()).
      then((response)=>{   
       
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
        <ScrollView nestedScrollEnabled >          
      <Slider slider={slider} />
      <Offer  offer={offer} navigation={props.navigation}/> 
      
      
      <FlatList
      
        numColumns={2}
        data={category}
        renderItem={({item})=><HomeCategory navigation={props.navigation} category_title={item.category_title}  category_id={item.category_id} banner={item.banner} />}
        keyExtractor={(item) => item.category_id}      
        onEndReached={getMoreCategory}
        onEndReachedThreshold={.3}  
      />   
       
     <WhyChoose  />

      
     </ScrollView>
     <FooterComponent navigation={props.navigation} />  
   
       </Container>
       </View>  
    );
 
}