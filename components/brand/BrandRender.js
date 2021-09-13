import React from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,TouchableWithoutFeedback } from 'react-native';  
import { API_Brand_Image_Url, API_Category_Image_Url } from '../global/url';
  export default function BrandRender({brand_title,brand_picture,brand_id,navigation}) {
 
    return (   
      <TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('BandProduct', {         
        brand_id:brand_id,         
          })}
          >
        <View style={{flex:1,flexDirection:'column',backgroundColor:'#f2f2f2',margin:5}}>
         <View style={{backgroundColor:'#fff',margin:5}}>
         <Image source={{uri: API_Brand_Image_Url+""+brand_picture}} style={{height: 150, width:null, flex: 1,margin:15}}/>
        <Text style={{marginTop:5,color:'black',textAlign:'center',height:40,fontSize:15}}>{brand_title}</Text>		 
         </View>
        </View> 
        </TouchableWithoutFeedback> 
    )
}