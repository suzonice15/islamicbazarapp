import React, { useState,useEffect } from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { SliderBox } from "react-native-image-slider-box";
import { Image, View,ScrollView,FlatList } from 'react-native';
import WhyChoose from '../global/whyChoose';
 import {websiteApi,API_Category_Image_Url} from '../global/url'
 import HeaderComponent from '../global/Header';
import FooterComponent from '../global/Footer';
import RenderItem from './RenderItem'
import Offer from './Offer'
import axios from 'axios';

import LoadingActivator from '../global/LoadingActivator';


  export default function Category(props) {
    const {category_id}=props.route.params

    const [category,setCategory]=useState([])
    const [offerData,setOffer]=useState([])
    const [loading,setLoading]=useState(true)
  

useEffect(() => { 
    getCategory()
   
 
 }, [category_id])

 useEffect(() => { 
    
    getOffer();
 
 }, [])

const getCategory=()=>{ 
  
  let category_url=websiteApi+"/mobile-category/"+category_id; 
  let config={method:'GET'}
   fetch(category_url,config).then((result)=>result.json()). 
   then((response)=>{        
    setCategory(response.brands)
    setLoading(false)
   }).catch((error)=>{
   
    });    
} 

const getOffer=()=>{ 
  
  let offerUrl=websiteApi+"/offers";  
  axios.get(offerUrl).then(response=>{ 
      console.log(response.data)     
    setOffer(response.data) 
  })   
} 
 
 
    return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
      <Container>
         <HeaderComponent navigation={props.navigation} />  
        <ScrollView scrollEnabled>  


       { loading ? <LoadingActivator  /> : 


        <>
        <FlatList
      
        numColumns={2}
        data={category}
        renderItem={({item})=>
        
        <RenderItem navigation={props.navigation} brand_title={item.brand_title}  brand_id={item.brand_id} brand_picture={item.brand_picture} />
        
    }
        keyExtractor={(item,index) => index.toString()}      
        
      />   
    {offerData.map((offer,index)=>   
      <Offer  navigation={props.navigation} offer_title={offer.offer_title}  offer_name={offer.offer_name} offer_end_date={offer.offer_end_date}  offer_start_date={offer.offer_start_date} offer_picture={offer.offer_picture}/>
      
    )} 
     <WhyChoose  />
     </>

    }

      
     </ScrollView>
     <FooterComponent  navigation={props.navigation} />  
   
       </Container>
       </View>  
    );
 
}