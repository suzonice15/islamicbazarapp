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
import FackOffer from './FackOffer' 


import HomeCategory from './HomeCategory'
import HomeProduct from './HomeProduct'
import AsyncStorage from '@react-native-async-storage/async-storage';


  export default function HomeComponent(props) { 
const [slider,setSlider]=useState([])
const [offer,setOffer]=useState([]) 
const [products,setProduct]=useState([]) 
const [category,setCategory]=useState([])
const [page,setPage]=useState(1)
useEffect(() => {

  getOffer(); 
 getApiData(); 
 homeProduct()  
}, [])

useEffect(() => { 
   getCategory() 
 }, [page])

const getApiData=()=>{ 
  let slider_url=websiteApi+"/mobileSliders"; 
  let config={method:'GET'}
   fetch(slider_url,config).then((result)=>result.json()). 
   then((response)=>{ 
     
    setSlider(response)
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


const homeProduct=()=>{
  let productUrl=websiteApi+"/homeProduct";  
 let config={method:'GET'}
   fetch(productUrl,config).
   then((result)=>result.json()).
   then((response)=>{  
      setProduct(response)        
 }).catch(error => {
    });
}
getCategory=()=>{  
    let home_category_url=websiteApi+"/home-mobile-category";  
    let config={method:'GET'}
        fetch(home_category_url,config).
      then((result)=>result.json()).
      then((response)=>{ 
          setCategory(response)        
    }) .catch(error => {
        
      });
}

 
 
    return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
      <Container>
         <HeaderComponent navigation={props.navigation} />  
        <ScrollView nestedScrollEnabled >          
        <Slider slider={slider} />  

 
<FlatList      
numColumns={2}
data={offer}
renderItem={({item})=><Offer 
navigation={props.navigation} 
offer_picture={item.offer_picture} 
keyExtractor={(item) => item.offer_id} />} 
/>  

<View style={{flex:2,flexDirection:"row",padding:10,justifyContent:"center"}}>
  <View style={{flex:1,backgroundColor:"#2cb574",}}>
      <Text style={{textAlign:"left",padding:2,margin:5,color:"white",fontWeight:"bold"}}>Top Categories
</Text>
</View>
<View style={{flex:1,backgroundColor:"#2cb574",justifyContent:"flex-end"}}>
      <Text onPress={() => props.navigation.navigate('AllCategory')}
      style={{backgroundColor:"#2cb574",padding:2,textAlign:"right",
      color:"white",fontWeight:"bold",fontStyle:"italic",
      alignItems:"center",
      marginBottom:6,
      marginRight:5      
      }}
      >See more   
     
</Text>
</View>  
 </View>
       
         <FlatList      
        numColumns={2}
        data={category}
        renderItem={({item})=><HomeCategory navigation={props.navigation} category_title={item.category_title}  category_id={item.category_id} banner={item.banner} />}
        keyExtractor={(item) => item.category_id}   
       
      />  

      <View style={{flex:2,flexDirection:"row",padding:10,justifyContent:"center"}}>
  <View style={{flex:1,backgroundColor:"#2cb574",}}>
      <Text style={{textAlign:"left",padding:2,margin:5,color:"white",fontWeight:"bold"}}>Popular Products
</Text>
</View>
<View style={{flex:1,backgroundColor:"#2cb574",justifyContent:"flex-end"}}>
      <Text onPress={() => props.navigation.navigate('AllProduct')}
      style={{backgroundColor:"#2cb574",padding:2,textAlign:"right",
      color:"white",fontWeight:"bold",fontStyle:"italic",
      alignItems:"center",
      marginBottom:6,
      marginRight:5
      
      }}>See more 
      {/* <Icon name="keyboard-arrow-right" type="MaterialIcons"/>    */}
</Text>
</View>  
 </View>
      <FlatList      
        numColumns={2}
        data={products}
        renderItem={({item})=><HomeProduct navigation={props.navigation} folder={item.folder} product_title={item.product_title}  product_id={item.product_id} main_image={item.main_image} />}
        keyExtractor={(item) => item.product_id}  
      /> 
      
     </ScrollView>
     <FooterComponent navigation={props.navigation} />    
       </Container>
       </View>  
    );
 
}