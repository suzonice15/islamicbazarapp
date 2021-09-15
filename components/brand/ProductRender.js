import React from 'react';
import { Toast,Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,TouchableWithoutFeedback } from 'react-native';  
import {  API_Product_featured_Image_Url,api_base_url } from '../global/url';
import axios from 'axios'
  export default function ProductRender({addToCart,product_title,main_image,product_id,folder,discount_price,product_price,navigation}) {
 

    

 
    return (   
      <TouchableWithoutFeedback  
      underlayColor='none'
     onPress={()=>navigation.navigate('Product', 
     {       
      product_id:product_id,
      product_title:product_title,
      main_image:main_image,
      folder:folder
    })}
          >
        <View style={{flex:1,flexDirection:'column',backgroundColor:'#f2f2f2',margin:5}}>
         <View style={{backgroundColor:'#fff',margin:5}}>
         <Image source={{uri: API_Product_featured_Image_Url+"/"+folder+"/thumb/"+main_image}} style={{height: 150, width:null, flex: 1,margin:15,resizeMode: 'stretch'}}/>
        <Text style={{color:'black',textAlign:'center',height:40,fontSize:15}}>{product_title}</Text>		 
        
        <View style={{backgroundColor:'#fff',marginTop:5,flex:1,flexDirection:"row" ,justifyContent:"space-evenly"}}>
            { discount_price >0 ?  <Text style={{color:'black',textAlign:'center',height:40,fontSize:15}}>৳ {discount_price}</Text> : <Text style={{marginTop:5,color:'black',textAlign:'center',height:40,fontSize:15}}>৳ {product_price}</Text>		 
             }
         
         { discount_price >0 ?  <Text style={{color:'red',textAlign:'center',height:40,fontSize:15}}>৳ {product_price}</Text> : null }
         </View>
        
        </View> 
          <Button onPress={()=>addToCart(product_id,product_title) } style={{marginTop:-15}} iconLeft danger block>
            <Icon name='shopping-basket' type="FontAwesome5"/>
            <Text>Buy Now</Text>
          </Button>
 
        </View> 
        </TouchableWithoutFeedback> 
    )
}