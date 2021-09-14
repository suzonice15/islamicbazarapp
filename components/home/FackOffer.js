import React from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header as HeaderComponent,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,TouchableWithoutFeedback } from 'react-native'; 
 import {API_Offer_Image_Url} from '../global/url'

  export default function FackOffer({navigation}) {  
 
    return (
        <Content padder> 
        
           <TouchableWithoutFeedback   
               >     
      <Card >  
            <CardItem cardBody  >
              <Image source={{uri: API_Offer_Image_Url+"7.jpeg.webp"}} style={{height: 200, width: null, flex: 1, resizeMode: 'stretch'}}/>
            </CardItem>   
                  
      </Card>
      </TouchableWithoutFeedback>  
      <TouchableWithoutFeedback   
               >     
      <Card >  
            <CardItem cardBody  >
              <Image source={{uri: API_Offer_Image_Url+"6.jpeg.webp"}} style={{height: 200, width: null, flex: 1, resizeMode: 'stretch'}}/>
            </CardItem>   
                  
      </Card>
      </TouchableWithoutFeedback>  
      
      </Content>   
     

     
    );
 
}