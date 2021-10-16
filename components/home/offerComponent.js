import React from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header as HeaderComponent,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,TouchableWithoutFeedback } from 'react-native'; 
 import {API_Offer_Image_Url} from '../global/url'

  export default function offerComponent({offer_picture,navigation}) {  
    console.log("fic="+offer_picture) 
    return (      
        <Content padder style={{flex:2}}>           
      <Card  style={{flex:1}} >  
            <CardItem cardBody  >
              <Image source={{uri: API_Offer_Image_Url+""+offer_picture}} style={{height: 130, width: null, flex: 1, resizeMode: 'stretch'}}/>
            </CardItem> 
      </Card>
      </Content>   
    );
 
}