import React from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,TouchableWithoutFeedback } from 'react-native';  
import { API_Category_Image_Url } from '../global/url';
  export default function HomeCategory({category_title,category_id,banner,navigation}) {
 
    return (   
      <TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('Category', {         
        category_id:category_id,
        category_title:category_title         
          })}
          >
        <View style={{flex:1,flexDirection:'column',backgroundColor:'#f2f2f2',margin:5}}>
         <View style={{backgroundColor:'#fff',margin:5}}>
         <Image source={{uri: API_Category_Image_Url+""+banner}} style={{height: 150, width: null, flex: 1, resizeMode: 'stretch'}} />
        <Text style={{marginTop:5,color:'black',textAlign:'center',height:40,fontSize:15}}>{category_title}</Text>		 
         </View>
        </View> 
        </TouchableWithoutFeedback> 
    )
}