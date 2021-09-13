import React, { useState,useEffect } from 'react';
import { Thumbnail,Card,CardItem,Content,Container,Item,Badge, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList } from 'react-native';
  import {websiteApi,API_Category_Image_Url} from '../global/url'
 import HeaderComponent from '../global/Header';
import FooterComponent from '../global/Footer';
 import axios from 'axios';
 import HTMLView from 'react-native-htmlview';

import LoadingActivator from '../global/LoadingActivator';


  export default function Page(props) {
    const {pageLink}=props.route.params  
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState({
        pageTitle:"",
        pageDescription:""
    })

  

useEffect(() => { 
    getPage()
   
 
 }, [pageLink])
const getPage=()=>{   
  let pageLinkUrl=websiteApi+"/page/pageLink/"+pageLink; 
  let config={method:'GET'}
   fetch(pageLinkUrl,config).then((result)=>result.json()). 
   then((response)=>{    
       setPage({
           ...page,
        pageTitle:response.page_name,
        pageDescription:response.page_content.replace(/(<([^>]+)>)/gi, "")
       })    

    setLoading(false)
   }).catch((error)=>{
   
    });    
} 
    return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
      <Container>
         <HeaderComponent navigation={props.navigation} />  
        <ScrollView scrollEnabled> 

       { loading ? <LoadingActivator  /> : 
        <>        
        <Card>
            <CardItem header bordered>
              <Text >{page.pageTitle} </Text>
            </CardItem>
            <CardItem bordered>
              <Body>           
                
                <HTMLView
      value={page.pageDescription}    
    />      
              </Body>
            </CardItem>
           
           
          </Card>
     
     </>

    }

      
     </ScrollView>
     <FooterComponent  navigation={props.navigation} />    
       </Container>
       </View>  
    );
 
}