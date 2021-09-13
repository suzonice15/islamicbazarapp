import React, { useState,useEffect } from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList } from 'react-native';
 import {websiteApi,API_Category_Image_Url, API_Offer_Image_Url} from '../global/url'
 import HeaderComponent from '../global/Header';
import FooterComponent from '../global/Footer';
  import axios from 'axios';
  import OfferComponent from '../category/Offer'

import LoadingActivator from '../global/LoadingActivator';


  export default function Offer(props) {
    
    const [loading,setLoading]=useState(true)  
    const [offerData,setOffer]=useState([])  


useEffect(() => { 
     getOffer(); 
 }, [])

 const getOffer=()=>{ 
  
    let offerUrl=websiteApi+"/offers";  
    axios.get(offerUrl).then(response=>{ 
        setLoading(false)
            
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
       {offerData.map((offer,index)=>   
      <OfferComponent  navigation={props.navigation} offer_title={offer.offer_title}  offer_name={offer.offer_name} offer_end_date={offer.offer_end_date}  offer_start_date={offer.offer_start_date} offer_picture={offer.offer_picture}/>
      
    )} 
       
     </>

    }

      
     </ScrollView>
     <FooterComponent  navigation={props.navigation} />  
   
       </Container>
       </View>  
    );
 
}