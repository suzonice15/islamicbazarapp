import React,{useState,useContext,useEffect} from 'react';
import {View,Image} from 'react-native'
import Style from '../global/Style'
import axios  from 'axios';
import { Container,Button,Form,Footer, FooterTab, Toast ,Title,Header,Body, Text ,Right,Left,Content, Item, Input, Icon } from 'native-base';
import { websiteApi } from '../global/url';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Registration({navigation}) {
  const [registration,setRegistration]=useState({
     phone:"",
     password:"",
   })

   useEffect(()=>{    
    
   })
   const formSubmit=()=>{
    if(validation()){         
        const data={
            phone:registration.phone,
            password:registration.password
          }
        axios.post(websiteApi+"user/login",data)
        .then(res=>{ 
           if(res.data.success==false){
            Toast.show({
                text: "Your Phone Number or Password is Wrrong please try Again",
                type: 'danger',
                 duration: 5000,
              });
          }  else {
            Toast.show({
                text: "Login Successfull",
                type: 'success',
                 duration: 5000,
              });
              
            const decoded = jwt_decode(res.data.api_token)
            try {
                  AsyncStorage.setItem('@user_id', decoded.id)
                  AsyncStorage.setItem('@user_name', decoded.name)
                  AsyncStorage.setItem('@user_password', decoded.password)
                  AsyncStorage.setItem('@user_phone', decoded.phone)
                  AsyncStorage.setItem('@user_photo', decoded.picture)
                  AsyncStorage.setItem('@user_phone', decoded.phone)
                  AsyncStorage.setItem('@api_token', res.data.api_token)  
              } catch (e) {

                // saving error
              }

           

              navigation.navigate('Home')

          }             
        })
        .catch(error=>{
            console.log(error)
        }) 
  

    }      
  }
  const validation=()=>{

    var valid=true;
    if (registration.phone =='' ) {
       Toast.show({
        text: 'Enter Valid  Phone',
        type: 'danger',
         duration: 5000,
      });
      valid=false;
    }   
    if(registration.password=='')
    {
      Toast.show({
       text: 'Enter Password',
       type: 'danger',
        duration: 5000,
     });
     valid=false
    }  

    return valid;
  }

     return (

     
     
        <Content style={{flex:10,flexDirection:"column",marginTop:50}} >
            <View>
            <Image
            source={{
              uri: "https://adminpanel.islamicbazaarbd.com/logo.png.webp"
            }}
            style={{
              height: 150,
              width:300,
              resizeMode:"stretch",
              justifyContent:"center",
              alignSelf:"center"
             
            }} />
            </View>       
       <View style={Style.formSection}> 
<Form>
  <Item>

  <Icon  name='phone' type="AntDesign"   />
                <Input  onChangeText={value=>setRegistration({...registration,phone:value})} placeholder="Enter Your Mobile Number"/>
  </Item>
  <Item>
  <Icon  name='key' type="AntDesign"   />

   <Input secureTextEntry={true}  onChangeText={value=>setRegistration({...registration,password:value})} placeholder="Enter Your Password"/>
  </Item>
 </Form>
</View>


<View style={Style.loginSection}>




<Button transparent onPress={formSubmit}
       ><Text style={Style.loginButton}> Sign Up </Text>
 </Button>
</View> 
       <View style={Style.formBottomSection}>

           <Text>Already have any account ? </Text>
           <Button transparent 
       ><Text style={Style.signUpButton} onPress={()=>navigation.navigate("login")}> Sign In </Text></Button>

  </View>



       
        
        </Content>

     

            
     );
}

 