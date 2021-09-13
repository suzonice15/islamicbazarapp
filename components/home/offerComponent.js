import React from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header as HeaderComponent,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,TouchableWithoutFeedback } from 'react-native'; 
 import {API_Offer_Image_Url} from '../global/url'

  export default function offerComponent({offer,navigation}) {  
 
    return (
        <Content padder> 
        {offer.map((row,index)=>(
           <TouchableWithoutFeedback  key={index} 
           underlayColor='none' onPress={()=>navigation.navigate('SingleOffer', {         
            offer_name:row.offer_name,         
             })}
               >     
      <Card >  
            <CardItem cardBody  >
              <Image source={{uri: API_Offer_Image_Url+""+row.offer_picture}} style={{height: 200, width: null, flex: 1, resizeMode: 'contain'}}/>
            </CardItem>   
                  
      </Card>
      </TouchableWithoutFeedback>   
       ))}
      </Content>   
     

     
    );
 
}