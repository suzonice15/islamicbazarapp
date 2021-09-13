import React from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header as HeaderComponent,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList } from 'react-native'; 
 import { SliderBox } from "react-native-image-slider-box";

  export default function Slider({slider}) {  
 
    return (
       
 <Content>
 <Card>           
     <CardItem cardBody>
     <SliderBox
     
     images={slider}
onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
currentImageEmitter={index => console.warn(`current pos is: ${index}`)}

/>

     </CardItem>
               
</Card>
</Content>
     
    );
 
}