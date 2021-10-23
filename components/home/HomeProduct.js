import React from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,TouchableWithoutFeedback } from 'react-native';  
import { API_Product_featured_Image_Url } from '../global/url';
  export default function HomeProduct({product_title,main_image,product_id,folder,navigation}) {
 
    return (   
      <TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('Product', {         
        product_id:product_id, 
        product_title:product_title,
        main_image:main_image,
        folder:folder                
          })}
          >
        <View style={{flex:1,flexDirection:'column',backgroundColor:'#f2f2f2',margin:5}}>
         <View style={{backgroundColor:'#fff',margin:5}}>
         <Image source={{uri: API_Product_featured_Image_Url+"/"+folder+"/thumb/"+main_image}} style={{height: 224, width: null, flex: 1, resizeMode: 'stretch'}}/>

         </View>
        </View> 
        </TouchableWithoutFeedback> 
    )
}