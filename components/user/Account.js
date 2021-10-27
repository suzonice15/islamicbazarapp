import React,{useState,useContext,useEffect} from 'react';
import {View,Image,Animated,Modal,Pressable,StyleSheet,TextInput} from 'react-native'
import Style from '../global/Style'
import axios  from 'axios';
import { Container,List,ListItem,Button,Form,Footer, FooterTab, Toast ,Title,Header,Body, Text ,Right,Left,Content, Item, Input, Icon } from 'native-base';
import { websiteApi } from '../global/url';
 import { AuthContext } from '../global/Context';
import { getIsDrawerOpenFromState } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterComponent from '../global/Footer';

export default function Account({navigation}) {
 const {LoginAdminUser,setLoginAdminUser}= useContext(AuthContext)

 const[user,setUser]=useState({
     name:"",
     mobile:""
 })
  
   useEffect(async()=>{ 
       
    getData()
     
   },[LoginAdminUser]) 

   const getData=async()=>{  
    if(LoginAdminUser==false){
        navigation.navigate("login")
    }   
     let name= await AsyncStorage.getItem("user_name");
    let mobile= await AsyncStorage.getItem("user_phone");
    setUser({...user,name,mobile})
   }
   const Logout=async()=>{
   setLoginAdminUser(false)
    await AsyncStorage.removeItem("api_token");
    navigation.navigate("Home")

  } 
     return (     
        <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack(null)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right>
            <Button onPress={() => navigation.openDrawer()}  transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content style={{flex:10,margin:6,marginTop:50}} >


            <View style={{ justifyContent:"center",
        alignContent:"center",
        alignItems:"center"}}>             
            <Image
            source={{
              uri: "https://adminpanel.islamicbazaarbd.com/customers/17.png.webp"
            }}
            style={styles.image} /> 
            </View>

            <View style={{ justifyContent:"center",
        alignContent:"center",
        alignItems:"center"}}>   
        <Text style={{marginTop:10,fontSize:25,fontWeight:"bold"}}>{user.name}</Text>          
        <Text style={{fontSize:15,fontWeight:"bold"}}>{user.mobile}</Text>          
             </View> 
          <ListItem icon onPress={()=>navigation.navigate('Profile')}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="user-plus" type="Feather" />
              </Button>
            </Left>
            <Body>
              <Text>Basic Information</Text>
            </Body>
            <Right>            
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon  onPress={()=>navigation.navigate('UserAddress')}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon   name="map-pin" type="Feather" />
              </Button>
            </Left>
            <Body>
            <Text> Delevery Address</Text>
            </Body>
            <Right>
            
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>


          <ListItem icon  onPress={()=>navigation.navigate('UserOrder')}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon   name="clipboard-list" type="FontAwesome5" />
              </Button>
            </Left>
            <Body>
            <Text>Order History</Text>
            </Body>
            <Right>
            
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          
          {/* <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon   name="clipboard-list" type="FontAwesome5" />
              </Button>
            </Left>
            <Body>
            <Text>Riview </Text>
            </Body>
            <Right>
            
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem> */}

          <ListItem icon onPress={() => Logout() }>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
              <Icon name="logout" type="AntDesign"/>   
              </Button>
            </Left>
            <Body>
            <Text>Logout </Text>
            </Body>
            <Right>
            
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
</Content> 
<FooterComponent  navigation={navigation} />  

</Container>
     );
}


  

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#ddd",
       
      }
    
  })
   
 