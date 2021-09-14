import React from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header as HeaderComponent,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList,StyleSheet } from 'react-native'; 
 import { SliderBox } from "react-native-image-slider-box";
import { API_Slider_Image_Url } from '../global/url';

  export default function Slider({slider}) {  
 
    return (
       
 <Content>         
     <CardItem cardBody style={styles.PictureDiv}>
         {slider ?  
     <Image source={{uri: API_Slider_Image_Url+""+slider}} style={styles.picture}/>
    :
    <Image source={{uri: API_Slider_Image_Url+"21.jpeg.webp"}} style={styles.picture}/>

    }
     </CardItem>  
</Content>     
    );
 
}
const styles = StyleSheet.create({
    picture: {
        height: 200, width: null, flex: 1,resizeMode: 'stretch'
    },
    PictureDiv: {
        marginTop:5,paddingLeft:10,paddingRight:10
    },
    
  });