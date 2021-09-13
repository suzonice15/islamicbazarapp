import React from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList,TouchableWithoutFeedback } from 'react-native';  
import { API_Brand_Image_Url, API_Category_Image_Url, API_Offer_Image_Url } from '../global/url';
import moment from 'moment'

  function Offer({navigation,offer_title,offer_picture,offer_name,offer_start_date,offer_end_date}) {
    
    
 
    return (   
      
       <View style={{flex:1,flexDirection:'column',backgroundColor:'#f2f2f2',margin:5}}>
          <TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('SingleOffer', {         
       offer_name:offer_name,         
        })}
          > 
         <View style={{backgroundColor:'#fff',margin:5}}>
         <Image source={{uri: API_Offer_Image_Url+""+offer_picture}} style={{height: 150, width:null, resizeMode: 'contain', flex: 1,margin:2}}/>
        <Text style={{marginTop:2,color:'black',textAlign:'center',fontSize:16}}>{offer_title}</Text>		 
        <Text style={{color:'black',textAlign:'left', padding:5,fontSize:14}}>Validation :from {moment(offer_start_date).format("DD MMMM YYYY")}  to {moment(offer_end_date).format("DD MMMM YYYY")} </Text>		 

         </View>
         </TouchableWithoutFeedback>  
        </View>
     
          
    )
}
export default  Offer;