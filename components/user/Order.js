import React,{useState,useContext,useEffect} from 'react';
import {View,Image,Animated,Modal,Pressable,StyleSheet,TextInput,TouchableWithoutFeedback} from 'react-native'
import Style from '../global/Style'
import axios  from 'axios';
import { Container,List,ListItem,Button,Form,Footer, FooterTab, Toast ,Title,Header,Body, Text ,Right,Left,Content, Item, Input, Icon } from 'native-base';
import { websiteApi } from '../global/url';
 import { AuthContext } from '../global/Context';
import { getIsDrawerOpenFromState } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterComponent from '../global/Footer';

export default function order({navigation}) {
 const {LoginAdminUser,setLoginAdminUser}= useContext(AuthContext)


 const  [order, setOrder] = useState({
  order_status:'all',
  search:"",
  orders:[],
  activePage:1,
  total:"",
  per_page:5,
  

})
const  [orderStatus, setOrderStatus] = useState({

order_staus_all:"",
order_staus_Pending:"",
order_staus_Cancel:"",
order_staus_Confirm:"",
order_staus_Processing:"",
order_staus_Shipped:"",
order_staus_Delivered:"",
})
  
   useEffect(async()=>{ 
       
    getData()
     
   },[]) 

   const getData=async()=>{  
    if(LoginAdminUser==false){
        navigation.navigate("login")
    }   
      
    let user_id= await AsyncStorage.getItem("user_id");
    totalOrderStatus(user_id)
     
   }
   const totalOrderStatus=(user_id)=>{

    axios.get(websiteApi+"totalOrderStatus/"+user_id)
    .then(response => {  
      setOrderStatus({
        ...orderStatus,
        order_staus_all:response.data.all,
        order_staus_Pending:response.data.Pending,
        order_staus_Cancel:response.data.Cancel,
        order_staus_Confirm:response.data.Confirm,
        order_staus_Processing:response.data.Processing,
        order_staus_Shipped:response.data.Shipped,
        order_staus_Delivered:response.data.Delivered,        
           
      })
    })
  }
   
     return (     
        <Container>
        <Header>
          <Left>
            <Button onPress={() => navigation.goBack(null)} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Order</Title>
          </Body>
          <Right>
            <Button onPress={() => navigation.openDrawer()}  transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content style={{flex:10,margin:6,marginTop:20,borderColor:"#ddd",borderWidth:2}} >
        <ListItem icon>
            <Left>
              <Button  transparent>
                <Icon active name="arrow-circle-right" type="FontAwesome5" />
              </Button>
            </Left>
            <Body>
              <Text>Order Panel</Text>
            </Body>            
          </ListItem>
            <View style={{flex:2,flexDirection:"row"}}>
            <TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('SingleOrder', {         
        order_status:'all', 
                
          })}
          >
                <View style={styles.orderParent}  > 
        
                    <Text style={styles.orderStatus}>All Order</Text>
                    <Text style={styles.orderCount}>{orderStatus.order_staus_all}</Text>
                
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('SingleOrder', {         
        order_status:'Pending', 
                
          })}
          >
                <View style={styles.orderParent}>
               
                    <Text style={styles.orderStatus} >Pending Order</Text>
                    <Text style={styles.orderCount}>{orderStatus.order_staus_Pending}</Text>
                   
                </View>
                </TouchableWithoutFeedback>  
            </View>
            <View style={{flex:2,flexDirection:"row"}}>
            <TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('SingleOrder', {         
        order_status:'Confirm', 
                
          })}
          >
<View style={styles.orderParent}>
    <Text style={styles.orderStatus}>Confirm Order</Text>
    <Text style={styles.orderCount}>{orderStatus.order_staus_Confirm}</Text>
</View>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('SingleOrder', {         
        order_status:'Processing', 
                
          })}
          >
<View style={styles.orderParent}>
    <Text style={styles.orderStatus} >Processing Order</Text>
    <Text style={styles.orderCount}>{orderStatus.order_staus_Processing}</Text>
</View>
</TouchableWithoutFeedback>
</View>

<View style={{flex:2,flexDirection:"row"}}>
<TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('SingleOrder', {         
        order_status:'Shipped', 
                
          })}
          >
<View style={styles.orderParent}>
    <Text style={styles.orderStatus}>Shipped Order</Text>
    <Text style={styles.orderCount}>{orderStatus.order_staus_Shipped}</Text>
</View>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('SingleOrder', {         
        order_status:'Delivered', 
                
          })}
          >
<View style={styles.orderParent}>
    <Text style={styles.orderStatus} >Delevered Order</Text>
    <Text style={styles.orderCount}>{orderStatus.order_staus_Delivered}</Text>
</View>
</TouchableWithoutFeedback>
</View>
<View style={{flex:2,flexDirection:"row"}}>
<TouchableWithoutFeedback  
      underlayColor='none' onPress={()=>navigation.navigate('SingleOrder', {         
        order_status:'Cancel', 
                
          })}
          >
<View style={styles.orderParent}>
    <Text style={styles.orderStatus}>Cancel Order</Text>
    <Text style={styles.orderCount}>{orderStatus.order_staus_Cancel}</Text>
</View>
</TouchableWithoutFeedback>
</View>    
</Content> 
 <FooterComponent  navigation={navigation} />  

</Container>
     );
}


  

const styles = StyleSheet.create({
    orderStatus: {
       color:"white",
       fontWeight:"bold",
       fontSize:15,
       textAlign:"center"
       
      },
      orderCount: {
        color:"white",
        fontWeight:"bold",
        fontSize:15,
        textAlign:"center"
        
       },
       orderParent: {
        flex:1,backgroundColor:"#2cb574",color:"white",margin:5,padding:30,borderRadius:10
        
       }
    
  })
   
 