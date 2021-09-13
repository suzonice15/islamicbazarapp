import React, { useState } from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, Footer,FooterTab,Text,Header,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, StyleSheet,View,ScrollView,FlatList } from 'react-native';
 
 const ChooseData = [
  {
    id: 1,
    title:"Ensure Quality",
    img: "ensurequality.webp",
  },
  {
      id: 2,
      title:"Faster Delivery",
      img: "fist-delevery.webp",
    },
    {
      id: 3,
      title:"Cash on Delivery",
      img: "cash-on-delevery.webp",
    },
    {
      id: 4,
      title:"Online Payments",
      img: "online-payment.webp",
    },
    {
      id: 5,
      title:"Easy Return",
      img: "easy-return.webp",
    },
    {
      id: 6,
      title:"Easy Refund",
      img: "easy-refund.webp",
    }, 
];
  export default function whyChoose() { 
 
 
    return (
         
          <View style={{flex:1}}>
          <View     style={{justifyContent:"center",flex:1,alignContent:"center"}}>
              <Text style={{color:"white",backgroundColor:"red" , margin:7,padding:5,textAlign:"center",flex:1}}>Why Choose JN Computer ?</Text>
            </View>
           <FlatList 
     numColumns={2}
        data={ChooseData}
        renderItem={({item})=>{  
        return (

        <View  style={{flex:6,flexDirection:"row",}}>
        <View style={{flex:2,justifyContent:"center"}}>
        <Image  style={{height: 40, width: null, flex: 1,margin:10}} source={{ uri: "https://jncomputerbd.com/images/"+""+item.img }} />
        </View>
        <View style={{flex:4,justifyContent:"center"}}>
        <Text style={{color:"black",fontSize:15}}>{item.title}</Text>   
        </View>
          </View>
        )
 

      }}
                
      />   
        </View> 
           
     );
 
}
 