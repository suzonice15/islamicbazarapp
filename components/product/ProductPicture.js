import React, { useState,useEffect } from 'react';
import { Segment,Thumbnail,Card,CardItem,Content,Container,Item,Badge, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList ,TouchableWithoutFeedback} from 'react-native';
import WhyChoose from '../global/whyChoose';
 import {API_Product_featured_Image_Url, websiteApi} from '../global/url'



   function ProductPicture({setMainPictureFunction,mainPicture,main_image,galary_image_1,galary_image_2,folder}) {
    
    console.log("product_picture")

    return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>  
       <Content padder>
          <Card>
               <CardItem cardBody style={{backgroundColor:"#efefef"}}>
              <Image source={{uri: API_Product_featured_Image_Url+"/"+folder+"/"+mainPicture}} style={{height: 200, width: null, flex: 1,resizeMode:"cover"}}/>
            </CardItem>
            <CardItem>             
              <Body style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
                  <TouchableWithoutFeedback onPress={()=>setMainPictureFunction(main_image)}>
              <Thumbnail  square large  source={{uri: API_Product_featured_Image_Url+"/"+folder+"/"+main_image}} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>setMainPictureFunction(galary_image_1)}>
              <Thumbnail   square large source={{uri: API_Product_featured_Image_Url+"/"+folder+"/"+galary_image_1}}   />
              </TouchableWithoutFeedback>
               <TouchableWithoutFeedback onPress={()=>setMainPictureFunction(galary_image_2)}>
              <Thumbnail   square large source={{uri: API_Product_featured_Image_Url+"/"+folder+"/"+galary_image_2}}    />
              </TouchableWithoutFeedback>
              </Body>              
            </CardItem>
          </Card>
        </Content>  
     
       </View>  
    );
 
}

export default   React.memo(ProductPicture)