import React,{useState,useContext,useEffect} from 'react';
import {ScrollView,TouchableWithoutFeedback,View,Image,Animated,Modal,Pressable,StyleSheet,TextInput} from 'react-native'
import Style from '../global/Style'
import axios  from 'axios';
import { Container,List,ListItem,Button,Form,Footer, FooterTab, Toast ,Title,Header,Body, Text ,Right,Left,Content, Item, Input, Icon } from 'native-base';
import { websiteApi } from '../global/url';
 import { AuthContext } from '../global/Context';
import { getIsDrawerOpenFromState } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
export default function UserAddress(props) {
 const {LoginAdminUser,setLoginAdminUser}= useContext(AuthContext)
 const [newAddress, setNewAddress] = useState({
   address:[],
    name:"",
    phone:"",
    
    division_id:"",
    district_id:"",
    upazila_id:"",
    divistions:[],
    districts:[],
    upazilas:[],
    address_id:"",
    modalShow:false,
    confirm_button:false
  })

   
 useEffect(async()=>{        
    getData()     
   },[]) 

   const getData=async()=>{  
    if(LoginAdminUser==false){
        navigation.navigate("login")
    }    
    let user_id= await AsyncStorage.getItem("user_id");
    let api_token= await AsyncStorage.getItem("api_token");
    getAllAddress(user_id,api_token)
  
   }

   const getAllAddress =  (user_id,api_token) => {
    var url=websiteApi+`getAllAddress/${user_id}`; 
   
 const data={
   api_token:api_token
   
 }

 const config = {
   headers : {'content-type':'multipart/form-data'}
}
   axios.get(url).then((response)=>{
     console.log(response)

     setNewAddress({...newAddress,address:response.data})

   })
    
     
 };
 
     return (     
        <Container>
        <Header>
          <Left>
            <Button onPress={() => props.navigation.goBack(null)} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title> Delevery Address</Title>
          </Body>
          <Right>
            <Button onPress={() => props.navigation.openDrawer()}  transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content style={{flex:1,margin:6,marginTop:20,borderColor:"#ddd",borderWidth:2}} >
        
            <ScrollView horizontal={true} style={{flex:2,flexDirection:"row",borderBottomColor:"#ddd",borderBottomWidth:2,padding:8}}>
                <Text style={{marginLeft:20}} >Name </Text>
                <Text style={{marginLeft:25}}>Address </Text>
                <Text style={{marginLeft:25}}>Region </Text>
                <Text style={{marginLeft:25}}>Mobile</Text>
                
            </ScrollView> 

             {newAddress.address.map((row,index)=>{

             return(
               
                <ScrollView horizontal={true} key={index} style={{flex:2,flexDirection:"row",padding:8}}>
                <Text style={styles.table_td}>{row.name} </Text>
                 <Text style={styles.table_td}>{row.address} </Text>
                <Text style={styles.table_td}>{row.upazilas_name},{row.district_name},{row.division_name}</Text>
                <Text style={styles.table_td}>{row.phone}</Text>

              </ScrollView> 
           
             )
          
            })}


</Content> 
</Container>
     );
}


  

const styles = StyleSheet.create({
    table_td: {
        fontSize:14,        
       padding:5,
       textAlign:"center"
       
      },
       
    
  })
   
 