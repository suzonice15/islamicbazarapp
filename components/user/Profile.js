import React,{useState,useContext,useEffect} from 'react';
import {View,Image,Animated,Modal,Pressable,StyleSheet,TextInput} from 'react-native'
import Style from '../global/Style'
import axios  from 'axios';
import {DatePicker, Container,List,ListItem,Button,Form,Footer, FooterTab, Toast ,Title,Header,Body, Text ,Right,Left,Content, Item, Input, Icon } from 'native-base';
import { websiteApi } from '../global/url';
 import { AuthContext } from '../global/Context';
import { getIsDrawerOpenFromState } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
 const {LoginAdminUser,setLoginAdminUser}= useContext(AuthContext)

 const[user,setUser]=useState({
     name:"",
     mobile:"",    
     contact_number:"",
     gender:"Female",
     birth_date:"",
     ocupation:"",
     organization:"",        
     api_token:"",
     user_id:""
 })
  
   useEffect(async()=>{ 
       
    getData()
     
   },[LoginAdminUser]) 

   const getData=async()=>{  
      
     let name= await AsyncStorage.getItem("user_name");
     let user_id= await AsyncStorage.getItem("user_id");
    let mobile= await AsyncStorage.getItem("user_phone");
    let api_token= await AsyncStorage.getItem("api_token");
    var url=websiteApi+`user/profile/${user_id}`;       
    const data={
      api_token:api_token     
    }
    const config = {
      headers : {'content-type':'multipart/form-data'}
      }
      axios.post(url,data,config).then((response)=>{   
 
        setUser({
          ...user,
            name:name, 
            gender:response.data.gender,
            birth_date:response.data.birth_date,
            ocupation:response.data.ocupation,
            organization:response.data.organization,
            contact_number:response.data.contact_number, 
            mobile ,
            user_id        
        })

      }) 
   }

   const updateProfile=()=>{

    if(validation()){
    var update_profile_url=websiteApi+`user/profileUpdate/${user.user_id}`;   
    // gender:user.gender,
    // birth_date:user.birth_date,
    const data={
       name:user.name,
      ocupation:user.ocupation,
      organization:user.organization,
      contact_number:user.contact_number,           
    }
  axios.post(update_profile_url,data).then((response)=>{ 
      console.log(response)
        Toast.show({
            text: "Profile Updated Successfully",
            type: 'success',
             duration: 5000,
          }); 
      })
    }
       
   }

 
  
const validation=()=>{
    let valid=true;
     
  
    if(!user.name){
  
        Toast.show({
            text: "Enter Your Name",
            type: 'danger',
             duration: 5000,
          });
        valid=false;
    }
  
    if(!user.contact_number){
        Toast.show({
            text: "Please Enter Your Mobile Number",
            type: 'danger',
             duration: 5000,
          });
      
        valid=false;
    } else  if(isNaN(user.contact_number)){
      
        Toast.show({
            text: "Please Enter  Number in Mobile Field",
            type: 'danger',
             duration: 5000,
          });
      
        valid=false;
    }
    
    else  if(user.contact_number.length !=11){
        Toast.show({
            text: "Please Enter 11 digit Mobile Number",
            type: 'danger',
             duration: 5000,
          }); 
        valid=false;
    }
  
    // if(!profile.gender){
  
      
    //     valid=false;
    // }
    // if(!profile.birth_date){
  
      
    //     valid=false;
    // }
    return valid;
  
  }
  


     return (     
        <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right>
            <Button onPress={() => navigation.openDrawer()}  transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content style={{flex:10,margin:6,marginTop:10}} >
            

          <ListItem icon>
            <Left>
              <Button  transparent>
                <Icon active name="arrow-circle-right" type="FontAwesome5" />
              </Button>
            </Left>
            <Body>
              <Text>Basic Information</Text>
            </Body>
            
          </ListItem>
          <Form style={{borderWidth:2,borderColor:"#ddd",paddingTop:10}}>
          <Item >
            <Text style={styles.fontBold}>Login Mobile</Text>
            <Text style={styles.fontBold}>{user.mobile}</Text>   
             </Item>

         <Item >
            <Text style={styles.fontBold}>Full Name</Text>
            <Input   onChangeText={value=>setUser({...user,name:value})} value={user.name} placeholder="Enter Your Mobile Number"/>
         </Item>
         <Item >
            <Text style={styles.fontBold}>Contact Number</Text>
            <Input keyboardType= "number-pad"  value={user.contact_number} onChangeText={value=>setUser({...user,contact_number:value})} placeholder="Enter Your Contact Number"/>
         </Item>
         {/* <Item >
            <Text style={styles.fontBold}>Gender </Text>
            <Input keyboardType= "number-pad" onChangeText={value=>setRegistration({...registration,phone:value})} placeholder="Enter Your Mobile Number"/>
         </Item> */}
       
         {/* <Item >
            <Text style={styles.fontBold}>Date of Birth: </Text>
            <Input   onChangeText={value=>setRegistration({...registration,phone:value})} placeholder="Enter Your Mobile Number"/>
         
            <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={()=>this.setDate}
            disabled={false}
            />
         
         
         </Item>
         */}
         <Item >
            <Text style={styles.fontBold}>Organization :	 </Text>
            <Input value={user.organization}  onChangeText={value=>setUser({...user,organization:value})} placeholder="Enter Your Organization"/>
         </Item>
         <Item >
            <Text style={styles.fontBold}>Occupation :		 </Text>
            <Input  value={user.ocupation} onChangeText={value=>setUser({...user,ocupation:value})} placeholder="Enter Your Ocupation"/>
         </Item>

         <Item >
         <Button rounded   danger onPress={()=>navigation.goBack(null)} style={{margin:5}}>
            <Text>Cancel</Text>
          </Button>


            <Button  rounded  success onPress={()=>updateProfile()} style={{margin:5}}>
            <Text>Update</Text>
          </Button>


         </Item>

         

         


         
       </Form>
    
</Content> 
</Container>
     );
}


  

const styles = StyleSheet.create({
    fontBold: {
       fontWeight:"bold",
       color:"black",
       paddingLeft:15
       
      }
    
  })
   
 