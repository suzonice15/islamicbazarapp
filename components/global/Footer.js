import React from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer as FooterComponent,FooterTab,Text,Header,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList } from 'react-native'; 
 
  export default function Footer(props) { 
   
 
 
 
    return (
        <FooterComponent>
        <FooterTab>
          <Button vertical onPress={() => props.navigation.navigate('Home')}>
            <Icon name="home"  type="AntDesign" />
            <Text>Home</Text>
          </Button>
          <Button badge vertical onPress={() => props.navigation.navigate('Cart')}>
          <Badge ><Text>5</Text></Badge>
            <Icon name="shoppingcart" type="AntDesign" />
            <Text>Cart</Text>
          </Button>
          <Button badge vertical active onPress={() => props.navigation.navigate('Wishlist')}>
          <Badge ><Text>9</Text></Badge>
            <Icon active name="hearto" type="AntDesign" />
            <Text>Wishlist</Text>
          </Button>
          <Button vertical>
            <Icon name="user" type="AntDesign" />
            <Text>Account</Text>
          </Button>
        </FooterTab>
      </FooterComponent>
     
    );
 
}