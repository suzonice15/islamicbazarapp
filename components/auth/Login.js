import React,{useState,useContext,useEffect} from 'react';
import {View,Image,Animated,Modal,Pressable,StyleSheet,TextInput} from 'react-native'
import Style from '../global/Style'
import axios  from 'axios';
import { List,ListItem,Button,Form,Footer, FooterTab, Toast ,Title,Header,Body, Text ,Right,Left,Content, Item, Input, Icon } from 'native-base';
import { websiteApi } from '../global/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

import jwt_decode from "jwt-decode";
import { AuthContext } from '../global/Context';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function Login({navigation}) {
 const {setLoginAdminUser}= useContext(AuthContext)
  const [registration,setRegistration]=useState({
     name:"",
     phone:"",
     password:"",
     otp:"",
     user_otp:0,
     address:"",
     division_id:"",
     division_name:"----Select----",
    district_id:"",
     district_name:"Select Division",
    upazila_id:"",
      upazila_name:"Select District",
      divistions:[],
      districts:[],
      upazilas:[],    
     phone_active:true,
     otp_active:false,
     registration_active:false,
     otp_submit:"Next",
     confirm_submit:"Confirm"

   })
 const [divisionModal,setDivisionModal]  =useState(false)
 const [areaModal,setAreaModal]  =useState(false)
 const [districtModal,setDistrictModal]  =useState(false)
 
   useEffect(async()=>{  
    getDivistion()  
     
   },[])
   const getDivistion= async () => {
    var getDivistion_url=websiteApi+`getDivistion`; 
      const response=await fetch(getDivistion_url);
  var  divistion_data= await response.json(); 
  setRegistration({...registration,divistions:divistion_data,district_id:"",district_name:"----Select----"})      
  }
  const getDistrict= async (divistionId,division_name) => {
     var getDistrict_url=websiteApi+`getDistrict/${divistionId}`; 
      const response=await fetch(getDistrict_url);
  var  district_data= await response.json();   
  setRegistration({...registration,districts:district_data,division_id:divistionId,division_name:division_name})      
   
  }
  const getArea=async(district_id,district_name)=>{
    var getUpazila_url=websiteApi+`getUpazila/${district_id}`; 
    const response=await fetch(getUpazila_url);
var  upazila_data= await response.json();
setRegistration({...registration,upazilas:upazila_data,district_id,district_name,upazila_id:'',upazila_name:"---Select--"})      

  }

   const formSubmit=async() => {    
    if (registration.phone =='' ) {
      Toast.show({
       text: 'Enter Valid  Phone',
       type: 'danger',
        duration: 5000,
     });
    return false;
   }   
   if(registration.otp !=registration.user_otp)
   {
     Toast.show({
      text: 'Your OTP does not matched',
      type: 'danger',
      position:"top",
      duration: 5000,
    });
    return false;
   }  
        
        const data={
            phone:registration.phone,
          }

        axios.post(websiteApi+"user/login",data)
        .then(res=>{          
           if(res.data.success==false){         
            setRegistration({...registration,registration_active:true,phone_active:false,otp_active:false})           
          }  else {
            Toast.show({
                text: "Login Successfull",
                type: 'success',
                 duration: 5000,
              });            
                 setLoginAdminUser(true)
                const decoded = jwt_decode(res.data.api_token) ;             
                AsyncStorage.setItem('user_id', decoded.id)
                AsyncStorage.setItem('user_name', decoded.name)
                AsyncStorage.setItem('user_password', decoded.password)
                AsyncStorage.setItem('user_phone', decoded.phone)
                AsyncStorage.setItem('user_photo', decoded.picture)
                AsyncStorage.setItem('user_phone', decoded.phone)
                AsyncStorage.setItem('api_token', res.data.api_token)  
                
                // redirect route 
                navigation.navigate('AllProduct')
          }             
        })
        .catch(error=>{
            console.log(error)
        }) 
  }
 
  const OtpSubmitForLogin=()=>{
    if(registration.phone.length !=11){
      Toast.show({
        text: "Enter valid Bangladeshi Number",
        type: 'danger',
         duration: 5000,
      });
      return false;
    }

setRegistration({...registration,otp_submit:"Please Wait ...."})
    const data={
      phone:registration.phone,             
    }

    axios.post(websiteApi+"user/OtpSubmitForLogin",data)
  .then(res=>{ 
    if(res.data.success==false){
     
      Toast.show({
        text: res.data.result,
        type: 'danger',
         duration: 5000,
      });
    }  else { 
      setRegistration({...registration,phone_active:false,otp_active:true,otp:res.data.otp,otp_submit:"Next"}) 
      Toast.show({
        text: "Enter Your OTP",
        type: 'success',
        position:"top",
         duration: 5000,
      });
        
    }             
  })
  .catch(error=>{
      console.log(error)
  })

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
  const registrationSubmit=()=>{
    if(finalValidation()){
      const data={
        phone:registration.phone,
        name:registration.name,
        address:registration.address,
        upazila_id:registration.upazila_id,
        district_id:registration.district_id,
        division_id:registration.division_id
       }
       setRegistration({...registration,confirm_submit:"Please Wait ..."})

       axios.post(websiteApi+"user/successRegistration",data)
    .then(res=>{ 
       if(res.data.success==false){
        Toast.show({
          text: res.data.result,
          type: 'danger',
           duration: 5000,
        });
      }  else { 
        setLoginAdminUser(true)
        const decoded = jwt_decode(res.data.api_token) ;             
        AsyncStorage.setItem('user_id', decoded.id)
        AsyncStorage.setItem('user_name', decoded.name)
        AsyncStorage.setItem('user_password', decoded.password)
        AsyncStorage.setItem('user_phone', decoded.phone)
        AsyncStorage.setItem('user_photo', decoded.picture)
        AsyncStorage.setItem('user_phone', decoded.phone)
        AsyncStorage.setItem('api_token', res.data.api_token)   

          // redirect here
          navigation.navigate('AllProduct')
      }
     
    })
    .catch(error=>{
        console.log(error)
    })
    }  

  }

  
  const finalValidation=()=>{
    let valid_data=true;   
    if(registration.name ==''){    
      Toast.show({
        text:"Enter Your Name",
        type: 'danger',
         duration: 5000,
      });
        valid_data=false;
    }    
    if(registration.district_id ==''){    
      Toast.show({
        text:"Select District",
        type: 'danger',
         duration: 5000,
      });
        valid_data=false;
    }    
    if(registration.division_id ==''){    
      Toast.show({
        text:"Select Division",
        type: 'danger',
         duration: 5000,
      });
        valid_data=false;
    }
    if(registration.upazila_id ==''){    
      Toast.show({
        text:"Select Area",
        type: 'danger',
         duration: 5000,
      });
    }
    if(registration.address ==''){    
      Toast.show({
        text:"Enter Your Address",
        type: 'danger',
         duration: 5000,
      });
        valid_data=false;
    } 
    return valid_data;    
  }

 


     return (     
     
        <Content style={{flex:10,margin:6,flexDirection:"column",marginTop:50,borderColor:"#ddd",borderWidth:2}} >
            <View>
            {registration.registration_active==false ? 
            <Image
            source={{
              uri: "https://adminpanel.islamicbazaarbd.com/logo.png.webp"
            }}
            style={{
              height:150,
              width:300,
              resizeMode:"stretch",
              justifyContent:"center",
              alignSelf:"center"             
            }} /> :null}

            </View>
       <View style={Style.formSection}>

{registration.registration_active ? 
<Form>
       <Item>
 <Text style={{marginLeft:5,marginRight:5}}>Name :</Text>
<Input   onChangeText={value=>setRegistration({...registration,name:value})}  value={registration.name} placeholder="Enter Your Name"/>
 </Item>
 <Item>
 <Text style={{marginLeft:5,marginRight:5}}>Mobile :</Text>
<Input    value={registration.phone}  editable = {false}/>
 </Item>
 <List> 
            <ListItem >
              <Left>
                <Text>Division</Text>
              </Left>
              <Body>
              <Pressable  onPress={() => setDivisionModal(true)}     >
              <Text>{registration.division_name}</Text>
                </Pressable>
            
              </Body>
              <Right>
              <Pressable  onPress={() => setDivisionModal(true)}     >
                <Icon name="caretdown"  type="AntDesign" />
                </Pressable>
              </Right>
            </ListItem>

            <ListItem >
              <Left>
                <Text>District</Text>
              </Left>
              <Body>
              <Pressable  onPress={() => setDistrictModal(true)}     >
              <Text>{registration.district_name}</Text>
                </Pressable>
            
              </Body>
              <Right>
              <Pressable  onPress={() => setDistrictModal(true)}     >
                <Icon name="caretdown"  type="AntDesign" />
                </Pressable>
              </Right>
            </ListItem>

            <ListItem >
              <Left>
                <Text>Area</Text>
              </Left>
              <Body>
              <Pressable  onPress={() => setAreaModal(true)}  >
              <Text>{registration.upazila_name}</Text>
                </Pressable>            
              </Body>
              <Right>
              <Pressable  onPress={() => setAreaModal(true)}     >
                <Icon name="caretdown"  type="AntDesign" />
                </Pressable>
              </Right>
            </ListItem> 

            </List>
 <Item>
 <Text style={{marginLeft:5,marginRight:5}}>Address :</Text>
 </Item>
 
 <View style={styles.textAreaContainer}>
  <TextInput
      style={styles.textArea}
       placeholder="Enter Your Address"
      placeholderTextColor="grey"
      numberOfLines={2}
      multiline={true}
      value={registration.address}
      onChangeText={value=>setRegistration({...registration,address:value})}
    />


 </View>
 
 {registration.confirm_submit =="Confirm" ? 
 <Button full success onPress={registrationSubmit} style={{margin:5}}>
            <Text>{registration.confirm_submit}</Text>
          </Button>:  <Button full success  style={{margin:5}}>
            <Text>{registration.confirm_submit}</Text>
          </Button> }
</Form>:null}

<Form>
 

{ registration.phone_active ?
<>
  <Item>
  <Icon  name='phone' type="AntDesign"   />
<Input keyboardType= "number-pad" onChangeText={value=>setRegistration({...registration,phone:value})} placeholder="Enter Your Mobile Number"/>
 </Item>
 {registration.otp_submit =='Next' ? 
  <Button full success onPress={OtpSubmitForLogin} style={{margin:5}}>
            <Text>{registration.otp_submit}</Text>
          </Button> :  <Button full success   style={{margin:5}}>
            <Text>{registration.otp_submit}</Text>
          </Button>}

  </>  
  :null }

{ registration.otp_active ?
<>
  <Item>
  <Icon  name='key' type="AntDesign"   />
   <Input  keyboardType="number-pad" secureTextEntry={true}  onChangeText={value=>setRegistration({...registration,user_otp:value})} placeholder="Enter Your OTP"/>
  </Item>
  <Button full success onPress={formSubmit} style={{margin:5}}>
            <Text>Submit OTP</Text>
          </Button>

  <Item style={{flex:1,justifyContent:"center",marginTop:15}}>
   
   <CountdownCircleTimer
       isPlaying
       duration={60}
       onComplete={() => {
         setRegistration({...registration,phone_active:true,otp_active:false})
       }
      }
       colors={[
         ['#004777', 0.4],
         ['#F7B801', 0.4],
         ['#A30000', 0.2],
       ]}
     >
       {({ remainingTime, animatedColor }) => (
         <Animated.Text style={{ color: animatedColor }}>
          <Text >  {remainingTime}</Text>
          {/* <Text>{"\n"} Seconds</Text> */}
         </Animated.Text>
       )}
     </CountdownCircleTimer>
     
     </Item>
  </> : null
}
 

 </Form>
</View> 

{/* division modal */}
<Modal animationType="slide"  transparent={true}  visible={divisionModal} >
        <View style={styles.loginModalWrapper}>
        <Button transparent onPress={() => setDivisionModal(false)} >
            <Icon name='times' type='FontAwesome'  style={{color:"black",fontWeight:"bold"}}/>             
          </Button>
         <List>
           {registration.divistions.map((division,index)=>(          
            <ListItem>           
            <Left>
                <Text onPress={()=>{
                   getDistrict(division.id,division.division_name)
                  setDivisionModal(false)
                }}>{division.division_name}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
              </ListItem>  
             ))}         
          </List>
        </View>
        </Modal>

{/* district modal */}
<Modal  animationType="slide"      transparent={true}   visible={districtModal}     >
        <View style={styles.loginModalWrapper}>
        <Button transparent onPress={() => setDistrictModal(false)} >
            <Icon name='times' type='FontAwesome'  style={{color:"black",fontWeight:"bold"}}/>             
          </Button>
         <List>
           {registration.districts.map((district,index)=>(          
            <ListItem>           
            <Left>
                <Text onPress={()=>{
                   getArea(district.id,district.district_name) 
                  setDistrictModal(false)
                }}>{district.district_name}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
              </ListItem> 
             ))}         
          </List>
        </View>
        </Modal>

{/* area modal */}
<Modal  animationType="slide"      transparent={true}   visible={areaModal}     >
        <View style={styles.loginModalWrapper}>
        <Button transparent onPress={() => setAreaModal(false)} >
            <Icon name='times' type='FontAwesome'  style={{color:"black",fontWeight:"bold"}}/>             
          </Button>
         <List>
           {registration.upazilas.map((upazila,index)=>(          
            <ListItem>           
            <Left>
                <Text onPress={()=>{ 
                   setRegistration({...registration,upazila_id:upazila.id,upazila_name:upazila.upazilas_name})      
                   setAreaModal(false)
                }}>{upazila.upazilas_name}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
              </ListItem> 
             ))}         
          </List>
        </View>
        </Modal>


</Content>

     

            
     );
}


const styles = StyleSheet.create({
  loginModalWrapper: {
    flex: 1,     
    backgroundColor: "white"
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
    borderColor:"#ddd",
    borderWidth: 1,
  },
  textAreaContainer: {  
    borderWidth: 1,
    padding: 1,
    marginTop:10,
    marginBottom:10,
    marginLeft:15,
    marginRight:15,
  },
})
 