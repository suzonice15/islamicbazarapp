import React, { useState,useEffect, useContext } from 'react';
import {List,Form, Thumbnail,Card,CardItem,Content,Container,Item,Toast,ListItem, Header,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { TextInput,Pressable,StyleSheet,Modal,Image, View,ScrollView,TouchableWithoutFeedback } from 'react-native';
  import {websiteApi,API_Category_Image_Url, API_Product_featured_Image_Url} from '../global/url'

 import FooterComponent from '../global/Footer';
 import HomeCategory from '../home/HomeCategory'
import LoadingActivator from '../global/LoadingActivator';
import { AuthContext } from '../global/Context';

  export default function Create(props) {
    
   const {setUserCartItem}= useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [subtotal, setSubtotal] = useState(0)
    const [loadding,setLoding]=useState(true)    
    const [carts,setCart]=useState([])  
    
 const [divisionModal,setDivisionModal]  =useState(false)
 const [areaModal,setAreaModal]  =useState(false)
 const [districtModal,setDistrictModal]  =useState(false)
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

    const getCartProduct =  () => {
         totalCalculation()
        var cart_url=websiteApi+"allCart"; 
        let config={method:'GET'}
      fetch(cart_url,config).then((result)=>result.json()). 
   then((response)=>{      
    setCart(response) 
   }).catch((error)=>{       }); 

           
      };

      const totalCalculation = async () => {
        var cart_subtotal_url=websiteApi+"subtotal"; 
          const response=await fetch(cart_subtotal_url);
      var  subtotal= await response.json();
       setSubtotal(subtotal)    
      };  
     
      useEffect(()=>{         
        getCartProduct()
              
        setLoding(false)
      },[loadding])

      const Increment=async(cart_id,product_title)=>{
        Toast.show({
            text: product_title+"\n updated successfully",       
            type: "success"
          })  
        
        var cart_increament_url=websiteApi+"incrementCart/"+cart_id; 
        const response=await fetch(cart_increament_url);
    var  cart= await response.json();

    
setUserCartItem(cart)
AsyncStorage.setItem("cart_count",cart);
    //setUserCartItem(cart)
    getCartProduct()
    //totalCalculation()
      }  
      const Decrement=async(cart_id,product_title)=>{   
        var cart_decreament_url=websiteApi+"decrementCart/"+cart_id; 
        const response=await fetch(cart_decreament_url);
    var  cart= await response.json();
    //setUserCartItem(cart)
     
setUserCartItem(cart)
AsyncStorage.setItem("cart_count",cart);
        Toast.show({
            text:  product_title+"\n updated successfully",        
            type: "success"
          })  
    
    getCartProduct()
    //totalCalculation()
    
      }
      const allCartDelete=async()=>{
        Toast.show({
            text: "\n Deleted successfully",       
            type: "success"
          })  
        
        var cart_delete_url=websiteApi+"allCartDelete/"; 
        const response=await fetch(cart_delete_url);
    var  cart= await response.json();   

    
setUserCartItem(cart)
AsyncStorage.setItem("cart_count",cart);
    getCartProduct()    
      } 

  const cartDelete=async(cart_id,product_title)=>{    

        Toast.show({
          text:  product_title+"\n Remove successfully",        
          type: "success"
        })  

    var cart_delete_url=websiteApi+"removeItem/"+cart_id; 
    const response=await fetch(cart_delete_url);
var  cart= await response.json();

setUserCartItem(cart)
AsyncStorage.setItem("cart_count",cart);
 getCartProduct()
//totalCalculation()
  }  
  const currencyFormat=num=> {
    return (
     <> <Icon tyle={{fontSize:10}} name="currency-bdt" type="MaterialCommunityIcons" /> {parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
    </>)} 
 
    return (
     
      <Container style={{flex:10,backgroundColor:'#ddd'}} >
      <Header>
          <Left>
            <Button onPress={() => props.navigation.goBack(null)}    transparent>
              <Icon style={{color:"#000"}} name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Checkout Information</Title>
          </Body>          
        </Header>
        <View style={{flex:9}}>

        <View style={{flex:8}}>
        <ScrollView style={{marginTop:2}}>  
        {loadding && <LoadingActivator />}   

        <Text style={{textAlign:"center",backgroundColor:"green",color:"white",padding:7,margin:2}}>Order Summary</Text>    

      {carts.map((cart)=>{

     return (
<View style={{flex:10,flexDirection:"row"}}>
          
          <View style={{flex:2,flexDirection:"row",margin:5}}>
          <Thumbnail  square large  source={{uri: API_Product_featured_Image_Url+"/"+cart.product_image}} />

          </View>
          <View style={{flex:4,flexDirection:"row",justifyContent:"center"}}>
              <Text style={{alignSelf:"center"}}>{cart.product_name}</Text>
              </View>
          <View style={{flex:4,flexDirection:"column",justifyContent:"center"}}>         
              <View>
              <Text style={{alignSelf:"center"}}>{cart.price}*{cart.qty}={cart.subtotal}</Text>
              </View> 
                          
          </View>

          
       </View>
     )
        
         })} 
         <View style={{alignItems:"flex-end",}}>
           <Text style={{borderTopColor:"black",borderTopWidth:2,color:"black",fontWeight:"bold",fontSize:20,marginRight:15}}>Total:{currencyFormat(subtotal)}</Text>
           </View>

           <Text style={{textAlign:"center",backgroundColor:"green",color:"white",padding:7,margin:2}}>Customer Information</Text>    



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
 <Button full success onPress={()=>registrationSubmit} style={{margin:5}}>
            <Text>{registration.confirm_submit}</Text>
          </Button>:  <Button full success  style={{margin:5}}>
            <Text>{registration.confirm_submit}</Text>
          </Button> }
</Form>
      
     </ScrollView>
          
</View>
 


<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {        
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{fontSize:18}}>Are you sure you want to delete the selected products from the cart ?</Text>

<View style={{flexDirection:"row",marginTop:20,justifyContent:"space-evenly",alignItems:"center"}}>
 
<Pressable
              
              onPress={() => setModalVisible(!modalVisible)}
            >
  <Text style={{marginRight:20}}>Cancel</Text>
  </Pressable>

  <Pressable             
              onPress={() => {
                setModalVisible(!modalVisible)
                allCartDelete()
              }
              
              }
            >
    <Text>Ok</Text>
    </Pressable>
</View>
          </View>

          
          </View>
      </Modal>



        </View>
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