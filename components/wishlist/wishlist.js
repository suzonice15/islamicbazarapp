import React, { useState,useEffect } from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Toast,ListItem, Header,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Pressable,StyleSheet,Modal,Image, View,ScrollView,TouchableWithoutFeedback } from 'react-native';
  import {websiteApi,API_Category_Image_Url, API_Product_featured_Image_Url} from '../global/url'

 import FooterComponent from '../global/Footer';
 import HomeCategory from '../home/HomeCategory'
import LoadingActivator from '../global/LoadingActivator';
import axios from 'axios';

  export default function Wishlist(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [subtotal, setSubtotal] = useState(0)
    const [loadding,setLoding]=useState(true)    
    const [wishlists,setWishlist]=useState([])   

    const getWishlists =  () => {
        var wishlist_url=websiteApi+"allWishlist"; 
        let config={method:'GET'}
      fetch(wishlist_url,config).then((result)=>result.json()). 
   then((response)=>{      
    setWishlist(response) 
   }).catch((error)=>{       }); 

           
      };      
     
      useEffect(()=>{         
        getWishlists()              
        setLoding(false)
      },[loadding])

      const addToCartFromWishlist=async(wishlist_id,product_title)=>{
        Toast.show({
          text:product_title +"\n Added successfully",       
          type: "success"
        }) 
        var addTocart=websiteApi+"addToCartFromWishlist/"+wishlist_id;   
        let config={method:'GET'}
        fetch(addTocart,config).then((result)=>result.json()). 
   then((response)=>{      
   
    
   }).catch((error)=>{       }); 

   getWishlists()
   
     
      }
      
      const allWishlistDelete=async()=>{
        Toast.show({
            text: "\n Deleted successfully",       
            type: "success"
          })          
        var cart_delete_url=websiteApi+"allWishDelete"; 
        const response=await fetch(cart_delete_url);
    var  cart= await response.json();   
    getWishlists()    
      } 

  const wishlistDelete=(cart_id,product_title)=>{
   
    

        Toast.show({
          text:  product_title+"\n Remove successfully",        
          type: "success"
        })  
    var wishlist_url=websiteApi+"removeWishlist/"+cart_id;    
let config={method:'GET'}
console.log(wishlist_url)

fetch(wishlist_url,config)
.then((result)=>result.json())
.then((response)=>{  
  console.log(response)    
  getWishlists() 
}).catch((error)=>{       }); 

}  


   

   const wishlistAllDelete=()=>{   

    Toast.show({
      text:  "\n Remove successfully",        
      type: "success"
    })  
var wishlist_url=websiteApi+"removeAllWishlist";    
let config={method:'GET'}
fetch(wishlist_url,config).then((result)=>result.json()). 
then((response)=>{  
  console.log(response)    
  getWishlists() 
}).catch((error)=>{       }); 

}
  


  const currencyFormat=num=> {
    return (
     <> <Icon tyle={{fontSize:10}} name="currency-bdt" type="MaterialCommunityIcons" /> {parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
    </>)
    } 
 
    return (
     
      <Container style={{flex:10,backgroundColor:'#ddd'}} >
      <Header>
          <Left>
            <Button onPress={() => props.navigation.goBack(null)}    transparent>
              <Icon style={{color:"#000"}} name='arrow-back' />
            </Button>
          </Left>

          <Body>
            <Title>Wishlist </Title>
          </Body>
          <Right>
            <Button onPress={() => setModalVisible(true)} transparent>
              <Icon style={{color:"#000"}} name='trash' />
            </Button>
          </Right>
        </Header>
        <View style={{flex:9}}>
        <View style={{flex:8}}>
        <ScrollView style={{marginTop:20}}>  
        {loadding && <LoadingActivator />}       

      {wishlists.map((cart)=>{

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
              <View style={{flex:1,flexDirection:"row",justifyContent:"space-around"}}> 
               
              <Button small success onPress={()=>addToCartFromWishlist(cart.wishlist_id,cart.product_name)}> 
                  <Text>Add To Cart</Text></Button>
                 
             <TouchableWithoutFeedback onPress={()=>wishlistDelete(cart.wishlist_id,cart.product_name)}>
              <Text>
                <Icon style={{color:"red"}} name="ios-trash-sharp" type="Ionicons" /></Text>
              </TouchableWithoutFeedback>
              </View>
             
          </View>

          
       </View>
     )
        
         })} 
      
     </ScrollView>   

          
</View>

<FooterComponent navigation={props.navigation}></FooterComponent>


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
          <Text style={{fontSize:18}}>Are you sure you want to delete all favorite products from the wishlist ?</Text>

<View style={{flexDirection:"row",marginTop:20,justifyContent:"space-evenly",alignItems:"center"}}>
 
<Pressable
              
              onPress={() => setModalVisible(!modalVisible)}
            >
  <Text style={{marginRight:20}}>Cancel</Text>
  </Pressable>

  <Pressable             
              onPress={() => {
                setModalVisible(!modalVisible)
                wishlistAllDelete()
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