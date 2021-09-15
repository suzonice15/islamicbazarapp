import React, { useState,useEffect } from 'react';
import { Form,Label,Thumbnail,Card,CardItem,Content,Container,Item,Toast,ListItem, Header,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Pressable,StyleSheet,Modal,Image, View,ScrollView,TouchableWithoutFeedback } from 'react-native';
  import {websiteApi,API_Category_Image_Url, API_Product_featured_Image_Url} from '../global/url'

 import FooterComponent from '../global/Footer';
 import HomeCategory from '../home/HomeCategory'
import LoadingActivator from '../global/LoadingActivator';

  export default function Login(props) {
      
 
    return (
     
      <Container style={{flex:10,backgroundColor:'#ddd'}} >
      
      <Content style={{flex:1,flexDirection:"column",justifyContent:"center"}} >       
      
           
                <Thumbnail source={{uri: 'https://adminpanel.islamicbazaarbd.com/logo.png.webp'}} />
                </Content>     
                <Content style={{flex:5,flexDirection:"column"}} >        
<Form>
  <Item>
  <Icon  name='mail' type="AntDesign"   />
    <Input    placeholder="Enter Your Email Address"/>
  </Item>
  <Item>
  <Icon  name='key' type="AntDesign"   />
   <Input secureTextEntry={true}  placeholder="Enter Your Password"/>
  </Item>
 </Form>
 


</Content>

 
       </Container>
      
    );
 
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:10,    
    marginTop: 20
  }  ,
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});