import React,{useState,useContext,useEffect} from 'react';
import {TouchableWithoutFeedback,View,Image,Animated,Modal,Pressable,StyleSheet,TextInput} from 'react-native'
import Style from '../global/Style'
import axios  from 'axios';
import { Container,List,ListItem,Button,Form,Footer, FooterTab, Toast ,Title,Header,Body, Text ,Right,Left,Content, Item, Input, Icon } from 'native-base';
import { websiteApi } from '../global/url';
 import { AuthContext } from '../global/Context';
import { getIsDrawerOpenFromState } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
export default function SingleOrder(props) {
 const {LoginAdminUser,setLoginAdminUser}= useContext(AuthContext)
 const {order_status}=props.route.params
 const  [order, setOrder] = useState({
    order_status:order_status,
    search:"",
    orders:[],
    activePage:1,
    total:"",
    
    

})
   
 useEffect(async()=>{        
    getData()     
   },[order_status]) 

   const getData=async()=>{  
    if(LoginAdminUser==false){
        navigation.navigate("login")
    }    
    let user_id= await AsyncStorage.getItem("user_id");
    let api_token= await AsyncStorage.getItem("api_token");
    getOrderByUserId(user_id,api_token)     
   }


   const getOrderByUserId =  (user_id,api_token) => {
    var url=websiteApi+`getOrderByUserId/${user_id}/${order_status}?page=1`;    
 const data={
   api_token:api_token   
            } 
 const config = {
   headers : {'content-type':'multipart/form-data'}
}
   axios.get(url).then((response)=>{      
     setOrder({
       ...order,
       orders:response.data.data,
       total:response.data.total,
       per_page:response.data.per_page,
          
     })
   }) 
 }
 
     return (     
        <Container>
        <Header>
          <Left>
            <Button onPress={() => props.navigation.goBack(null)} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{order_status} Order</Title>
          </Body>
          <Right>
            <Button onPress={() => props.navigation.openDrawer()}  transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content style={{flex:1,margin:6,marginTop:20,borderColor:"#ddd",borderWidth:2}} >
        
            <View style={{flex:2,flexDirection:"row",justifyContent:"space-between",borderBottomColor:"#ddd",borderBottomWidth:2,padding:8}}>
                <Text >Order ID</Text>
                <Text>Order Date</Text>
                <Text>Amount </Text>
                <Text>Status</Text>
                <Text>Payment</Text>  
            </View> 

             {order.orders.map((order,index)=>{

             return(
                <TouchableWithoutFeedback  
                underlayColor='none' onPress={()=>props.navigation.navigate('SingleOrderView', {         
                  order_id:order.order_id                          
                    })}
                    >
                <View key={index} style={{flex:2,flexDirection:"row",justifyContent:"space-between",padding:8}}>
                <Text style={styles.table_td}>{order.order_id} </Text>
                <Text style={styles.table_td}>{moment(order.created_time).format("DD-MM-YYYY, h:mm: a")} </Text>
                <Text style={styles.table_td}>{order.order_total} </Text>
                <Text style={styles.table_td}>{order.order_status}</Text>
                <Text style={styles.table_td}>{ order.paid_amount  < order.order_total ? 'Unpaid' :'Paid' }</Text>  
            </View> 
            </TouchableWithoutFeedback>
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
   
 