import React,{ useContext } from "react";
import { ScrollView,
  View,
  Image,
   Share,
BackHandler,
Alert,
Platform,
Linking,
StyleSheet } from "react-native";

import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  
  Content,
  Switch,
  Body,
  Icon,
   Left,
   Right
  
} from "native-base";


import { AuthContext } from "./Context";
import styles from './Style'
const routes = ["Home", "Chat", "Profile"];
function Sidebar(props) {
  const {loginStatus,setLoginStatus} =useContext(AuthContext)

  const onShare = async () => {
    try {
      const result = await Share.share({
       title: 'App link',
  message: 'Please install this app and stay safe , AppLink :https://apps.apple.com/us/app/tbn24/id963111684', 
  url: 'https://apps.apple.com/us/app/tbn24/id963111684'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //alert(error.message);
    }
  };

  const openStore = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(
        `https://play.google.com/store/apps/details?id=com.tbn.live&hl=bn&gl=US`,
      ).catch(
          (err) => alert('Please check for Google Play Store')
      );
    } else {
      Linking.openURL(
        `https://apps.apple.com/us/app/tbn24/id963111684`,
      ).catch((err) => alert('Please check for the App Store'));
    }
  };
      return (
       

<Container>
        <Content>
        <Image
            source={{
              uri: "https://adminpanel.jncomputerbd.com/logo.png.webp"
            }}
            style={{
              height: 80,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }} />
            {/* <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
              }}
            />
          </Image> */}
                  <List>    

                 
                <ListItem onPress={() => props.navigation.navigate('AllCategory')}>
                  <Icon name="copyright" type="AntDesign"/>   
                 <Text style={{marginLeft:10}}>All Category</Text> 
                </ListItem>

                {/* <ListItem onPress={() => props.navigation.navigate('Offer')}>
                  <Icon name="hearto" type="AntDesign"/>   
                 <Text style={{marginLeft:10}}>Sunami Offer</Text> 
                </ListItem> */}


                <ListItem onPress={() => props.navigation.navigate('Login')}>
                  <Icon name="user" type="AntDesign"/>   
                 <Text style={{marginLeft:10}}>Sign In</Text> 
                </ListItem>

                <ListItem onPress={() => props.navigation.navigate('Wishlist')}>
                  <Icon name="hearto" type="AntDesign"/>   
                 <Text style={{marginLeft:10}}>Wishlist</Text> 
                </ListItem>

                <ListItem  >
                  <Icon name="phone" type="AntDesign"/>   
                 <Text style={{marginLeft:10}}>Contact Us</Text> 
                </ListItem>
              
                <ListItem onPress={()=>props.navigation.navigate('Page', {
            pageLink:'about-us',
             
          })}>
                  <Icon name="open-book" type="Entypo"/>   
                 <Text style={{marginLeft:10}}> About Us</Text> 
                </ListItem>
                <ListItem onPress={()=>props.navigation.navigate('Page', {
            pageLink:'terms-and-conditions',
             
          })}>
                  <Icon name="open-book" type="Entypo"/>   
                 <Text style={{marginLeft:10}}>Terms & Conditions</Text> 
                </ListItem>

                

                <ListItem onPress={()=>props.navigation.navigate('Page', {
            pageLink:'refund-and-returns-policy',
             
          })}>
                  <Icon name="open-book" type="Entypo"/>   
                 <Text style={{marginLeft:10}}>Return Policy</Text> 
                </ListItem>

                <ListItem onPress={()=>props.navigation.navigate('Page', {
            pageLink:'privacy-policy',
             
          })}>
                  <Icon name="open-book" type="Entypo"/>   
                 <Text style={{marginLeft:10}}>Privacy Policy</Text> 
                </ListItem>
               
                
                
              
               
                

                </List>
              
           
        </Content>
      </Container>

    );
  
}

export default Sidebar

 