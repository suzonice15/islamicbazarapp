import React, { useState,useEffect } from 'react';
import { Segment,Thumbnail,Card,CardItem,Content,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList ,TouchableWithoutFeedback} from 'react-native';
import { API_Product_featured_Image_Url } from '../global/url';
    function RelatedProduct({discount_price,product_price,product_title,main_image,product_id,folder,navigation}) {

    return (
      <TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('Product', {         
        product_id:product_id, 
        product_title:product_title,
        main_image:main_image,
        folder:folder
                
          })}
          >
        <View style={{flex:4,flexDirection:'row',backgroundColor:'#ddd',margin:5,borderWidth:2,borderColor:"#ddd"}}>
       
         <View style={{flex:1,backgroundColor:'#fff',padding:5}}>
         <Image source={{uri: API_Product_featured_Image_Url+"/"+folder+"/thumb/"+main_image}} style={{height: 60, width: null, flex: 1, resizeMode: 'center'}}/>
         </View>
         <View style={{flex:3,backgroundColor:'#fff',padding:5}}>
           <Text>{product_title}</Text>
           <CardItem  cardBody style={{marginLeft:5}}>
{ discount_price >0 ?  <Text style={{color:'black',textAlign:'center',height:40,fontSize:20}}>৳ {discount_price}</Text> : <Text style={{marginTop:5,color:'black',marginLeft:5,textAlign:'center',height:40,fontSize:15}}>৳ {product_price}</Text>		 
}
       </CardItem>

         </View>

        </View> 
        </TouchableWithoutFeedback>
       
    );
 
}
export default   React.memo(RelatedProduct)