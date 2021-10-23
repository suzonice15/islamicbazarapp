import React,{useState,useContext,useEffect} from 'react';
import {View,Image,Animated,Modal,Pressable,StyleSheet,TextInput} from 'react-native'
import Style from '../global/Style'
import axios  from 'axios';
import { Container,List,ListItem,Button,Form,Footer, FooterTab, Toast ,Title,Header,Body, Text ,Right,Left,Content, Item, Input, Icon } from 'native-base';
import { API_Product_featured_Image_Url, websiteApi } from '../global/url';
 import { AuthContext } from '../global/Context';
import { getIsDrawerOpenFromState } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
export default function SingleOrderView(props) {
 const {LoginAdminUser,setLoginAdminUser}= useContext(AuthContext)
 const {order_id}=props.route.params
 const  [order, setOrder] = useState({     
    order_metaInfo:[],   
    order_dataInfo:"", 
    user_name:"",
    user_phone:"",
    timeline:[]

})
   
 useEffect(async()=>{        
    getData()     
   },[order_id]) 

   const getData=async()=>{  
    if(LoginAdminUser==false){
        navigation.navigate("login")
    }    
    let user_id= await AsyncStorage.getItem("user_id");
    let api_token= await AsyncStorage.getItem("api_token");
    let user_name= await AsyncStorage.getItem("user_name");
    let user_phone= await AsyncStorage.getItem("user_phone");




    const res_order_meta = await fetch(websiteApi+`getOrderMeta/${order_id}`)
    const data_order_meta = await res_order_meta.json();    
    const order_data_res = await fetch(websiteApi+`getOrderData/${order_id}`)
    const order_data = await order_data_res.json()
    const timeline_res = await fetch(websiteApi+`getTimeline/${order_id}`)
    const timeline = await timeline_res.json()
   
    
setOrder({...order,timeline,user_name:user_name,user_phone,order_metaInfo:data_order_meta,order_dataInfo:order_data})      
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
            <Title>Order Details   </Title>
          </Body>
          <Right>
            <Button onPress={() => props.navigation.openDrawer()}  transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content style={{flex:1,margin:6,marginTop:20,borderColor:"#ddd",borderWidth:2}} >

             
            <View   style={{marginTop:10,flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
           <View><Text style={{marginTop:10}}>Order ID:</Text></View>
            <View>
              <Button rounded success><Text>{order_id}</Text></Button>
            </View>
            <View>
            {order.order_dataInfo.payment_type=='online_payment'  ? 
              <Button   rounded><Text>Online Payment</Text></Button>
              :   <Button rounded success><Text>Cash   on delivery </Text></Button> }
            </View>
            
          </View>

         <View style={{marginTop:10,flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
           <View><Text>Order Date :</Text></View>
            <View>
            <Text >{moment(order.order_dataInfo.created_time).format("DD-MM-YYYY h:mm a")} </Text>

            </View>
           
          </View>

          <View style={{flex:2,flexDirection:"column",justifyContent:"space-evenly",padding:10}}>
           
               <Text>Ordered From :</Text>
               <Image
            source={{
              uri: "https://www.adminpanel.islamicbazaarbd.com/logo.png.webp"
            }}
            style={{
                       
              height: 80,
               width: 150, 
               flex: 1, 
               resizeMode: 'stretch',
              marginTop:10
            }} />
            <Text>+8801708-515822</Text>
            <Text>info@islamicbazarbd.com</Text>
            <Text>Address: 122/123,Block #taw</Text>
            <Text>Section: 06 Mirpur. Dhaka-1216</Text> 
           
          </View>

          <View>
                <View>
                <Text style={{marginLeft:10}}>Bills To :</Text> 
                </View>
            <View style={{flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
                    <View>
                    <Text style={styles.circle}>{order.user_name.substring(0,2)}</Text> 
                    </View>
                        <View>
                        <Text>{order.user_name}</Text> 
                        <Text>{order.user_phone}</Text> 
                        <Text>{order.order_dataInfo.customer_address}</Text> 
                        </View>
            </View>
             
            </View>

            <View style={{flex:2,flexDirection:"row",justifyContent:"space-between",borderBottomColor:"#ddd",borderBottomWidth:2,padding:8}}>
                <Text >Picture</Text>
                <Text>Name  </Text>
                <Text>Price </Text>
                <Text>Sub Total </Text>               
            </View> 
            {order.order_metaInfo.map((order,index)=>{
return(   
   <View key={index} style={{flex:2,flexDirection:"row",justifyContent:"space-between",padding:8}}>
      
    <Image
            source={{
              uri: API_Product_featured_Image_Url+""+order.product_picture
            }}
            style={{height: 40, width: null, flex: 1, resizeMode: 'stretch'}} />
    <Text style={styles.table_td}>{order.product_name.substring(0,20)}.. </Text>
    <Text style={styles.table_td}>{order.price} X {order.quantity} </Text>
    <Text style={styles.table_td}>{order.subtotal}</Text>
      
</View> 
 )
})}

            <View style={{flex:2,flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end", borderBottomColor:"#ddd",borderBottomWidth:2,padding:8}}>
                <Text style={{alignSelf:"flex-end"}} >Total Price :{order.order_dataInfo.order_total}</Text>
                <Text  style={{alignSelf:"flex-end"}}>Total Paid : {order.order_dataInfo.paid_amount} </Text>
                <Text  style={{alignSelf:"flex-end"}}>Due :{order.order_dataInfo.order_total-order.order_dataInfo.paid_amount}</Text>
                    
            </View>  

            <View style={{flex:2,flexDirection:"row",justifyContent:"space-between",borderBottomColor:"#ddd",borderBottomWidth:2,padding:8}}>
                <Text >Timeline</Text>
                        
            </View> 

            {order.timeline.map((row,index)=>{
return(   
   <View key={index} style={{flex:5,flexDirection:"row",justifyContent:"space-between",padding:8}}>
      
       <View style={{flex:1}}>
           {index==0 ? 
       <Icon  style={{color:"green"}} name='checkcircle' type="AntDesign"   />
       :  <Icon  name='checkcircleo' type="AntDesign"   />}
       </View>
      
       <View style={{flex:4}}>     
    <Text style={{color:"black",fontWeight:"bold",fontSize:25}}>{row.order_status}</Text>
    <Text style={styles.table_td_time_line}>{row.order_note} </Text>
    <Text style={styles.table_td_time_line}>{row.created_at}</Text>
    </View>
      
</View> 
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
      table_td_time_line: {
        fontSize:14,        
       padding:5,
        
      },
      circle: {
        width: 80,
        height: 80,
        borderRadius: 80/2,
        backgroundColor:"red",
        color:"white",
        fontSize:30,
        textTransform:"uppercase",
        fontWeight:'bold',
        paddingTop:20,textAlign:"center"
     } 
    
  })
   
 