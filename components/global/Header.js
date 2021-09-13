import React from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header as HeaderComponent,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList } from 'react-native'; 
 import {useRoute} from '@react-navigation/native';
  export default function Header(props) {  
    const route = useRoute();
     return (
         <HeaderComponent  style={{backgroundColor:"#ddd"}}  searchBar rounded>
           {route.name=="Home" ?          <Icon name='menu'  style={{color:"black",marginTop: "4%"}} onPress={() => props.navigation.openDrawer()}  transparent />     
:          <Icon name='arrow-back'  style={{color:"black",marginTop: "4%"}} onPress={() => props.navigation.goBack(null)}  transparent />     
}
        
          <Item>
            {/* <Icon name="ios-search" /> */}
            <Input style={{marginLeft:5}}placeholder="Search here.." />
            <Icon name='search' style={{color:"black"}} />
              {/* <Icon name='close-circle'  style={{color:"black"}}  /> */}
           
          </Item>
              
        </HeaderComponent> 
     
    );
 
}