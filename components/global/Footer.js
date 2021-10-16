import React, { useContext } from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer as FooterComponent,FooterTab,Text,Header,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList } from 'react-native'; 
import { AuthContext } from './Context';
 
  export default function Footer(props) { 
   
    const {userCartItem,userWishlistItem,LoginAdminUser}=useContext(AuthContext)
 
 
    return (
        <FooterComponent style={{backgroundColor:"black"}}>
        <FooterTab style={{backgroundColor:"black"}} >
          <Button vertical onPress={() => props.navigation.navigate('Home')}>
            <Icon name="home"  type="AntDesign" />
            <Text>Home</Text>
          </Button>        
          {userCartItem > 0 ? 
          <Button badge vertical onPress={() => props.navigation.navigate('Cart')}>
          <Badge>
          
            <Text>{userCartItem}</Text>
          </Badge>
            <Icon name="shoppingcart" type="AntDesign" />
            <Text>Cart</Text>
          </Button>:          
          <Button   vertical onPress={() => props.navigation.navigate('Cart')}>
          
            <Icon name="shoppingcart" type="AntDesign" />
            <Text>Cart</Text>
          </Button>
          
          
          }
 
  <Button   vertical  onPress={() => props.navigation.navigate('AllProduct')}>
          
            <Icon active name="product-hunt" type="FontAwesome" />
            <Text>Products</Text>
          </Button>

           {LoginAdminUser ? 
          <Button vertical onPress={() => props.navigation.navigate('Home')}>
            <Icon name="user" type="AntDesign" />
            <Text>Profile  </Text>
          </Button> :
           <Button vertical onPress={() => props.navigation.navigate('login')}>
           <Icon name="user" type="AntDesign" />
           <Text>Account  </Text>
         </Button>
          
          }

        </FooterTab>
      </FooterComponent>
     
    );
 
}