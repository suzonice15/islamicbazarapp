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
        <View style={{flex:6,flexDirection:'row',backgroundColor:'#ddd',margin:5,borderWidth:2,borderColor:"#ddd"}}>
       
         <View style={{flex:2,backgroundColor:'#fff',padding:5}}>
         <Image source={{uri: API_Product_featured_Image_Url+"/"+folder+"/thumb/"+main_image}} style={{height: 35, width: null, flex: 1, resizeMode: 'center'}}/>
         </View>
         <View style={{flex:4,backgroundColor:'#fff',padding:4}}>
           <Text style={{fontSize:12,fontWeight:'bold',lineHeight:19,height:60,overflow:'hidden'}}>{product_title}</Text>
          
           <View  style={{flex:4,flexDirection:"row",justifyContent:"space-between",marginTop:1}}>
           <View  style={{flex:2}}>
             { discount_price >0 ?   <Text style={{color:'black',fontSize:15,fontWeight:"bold"}}>৳ {discount_price}</Text> : <Text style={{color:'black',height:40,fontSize:15,fontWeight:"bold"}}>৳ {product_price}</Text>	 
    }
              </View>
              <View  style={{flex:2}}>
              { discount_price >0 ?  <Text style={{color:'red',fontSize:15,fontWeight:"bold"}}>৳ {product_price}</Text>: null }

              </View>
              </View>

         </View>

        </View> 
        </TouchableWithoutFeedback>
       
    );
 
}
export default   React.memo(RelatedProduct)