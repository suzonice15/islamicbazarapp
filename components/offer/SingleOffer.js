import React, { useState,useEffect } from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList } from 'react-native';
 import {websiteApi,API_Category_Image_Url, API_Offer_Image_Url} from '../global/url'
 import HeaderComponent from '../global/Header';
import FooterComponent from '../global/Footer';
  import axios from 'axios';

 import HTMLView from 'react-native-htmlview';

import LoadingActivator from '../global/LoadingActivator';


  export default function singleOffer(props) {
    const {offer_name}=props.route.params  
    console.log(offer_name)
    const [loading,setLoading]=useState(false)  
    const [offer,setOffer]=useState({
        offer_title:"",
        description:"",
        offer_picture:""
    })  


useEffect(() => { 
     getOffer(); 
 }, [offer_name])
const getOffer=()=>{ 
  
  let category_url=websiteApi+"/singleOffer/"+offer_name; 
  let config={method:'GET'}
   fetch(category_url,config).then((result)=>result.json()). 
   then((response)=>{    
       console.log(response) 
    setOffer({
        ...offer,
        offer_title:response.offer_title,       
        description:response.offer_description,
        offer_picture:response.offer_picture,
      }
      )
    setLoading(false)
   }).catch((error)=>{
   
    });    
} 
 
 
    return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
      <Container>
         <HeaderComponent navigation={props.navigation} />  
        <ScrollView scrollEnabled>  


       { loading ? <LoadingActivator  /> : 


        <>
       <Content padder>
       <View style={{backgroundColor:"green",flex:1,justifyContent:"center"}}> 
               
                  <Text style={{backgroundColor:"green",flex:1,alignSelf:"center",padding:5,color:"white"}}>{offer.offer_title}</Text>                 
               
            </View>
          <Card>
            
            <CardItem cardBody>
              <Image source={{uri: API_Offer_Image_Url+""+offer.offer_picture}} style={{height: 200, width: null, flex: 1,resizeMode:"contain"}}/>
            </CardItem>
            
          </Card>
          <View>
          <Text>Click below links to check out our best prices:</Text>
               
               
                <HTMLView
      value={offer.description}
     
    />
          </View>
        </Content>
       
     </>

    }

      
     </ScrollView>
     <FooterComponent  navigation={props.navigation} />  
   
       </Container>
       </View>  
    );
 
}