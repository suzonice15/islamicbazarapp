import React, { useState,useEffect,useCallback, useContext } from 'react';
import { Toast,Card,CardItem,Content,Container,Item,Badge,List, FooterTab,Text,Input, Left, Body, Right, Button, Icon, Title, ListItem } from 'native-base';
 import { FlatList,Image, Platform,View,ScrollView,TouchableWithoutFeedback,Alert,StyleSheet } from 'react-native';
import WhyChoose from '../global/whyChoose';
 import {API_Product_featured_Image_Url, websiteApi} from '../global/url'
 import HeaderComponent from '../global/Header';
import FooterComponent from '../global/Footer';
import axios from 'axios';
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';
import { useScrollToTop } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import LoadingActivator from '../global/LoadingActivator';
import ProductPicture from './ProductPicture';
import ProductCartSection from './ProductCartSection';
import ProductRender from '../brand/ProductRender';
import { AuthContext } from '../global/Context';
 

  export default function SingleProduct(props){
 
   const {setUserCartItem,setUserWishlistItem}= useContext(AuthContext)
    const {product_id,product_title}=props.route.params
     const [loading,setLoading]=useState(false) 
     const [specifications, setSpecification]=useState([])
     const [relatedProducts, setRelated]=useState([]);
     const [relatedProductsData,setRelatedProductIdData]=useState([])
     const ref = React.useRef(null);

     useScrollToTop(ref);
     const [count,setCount]=useState(1) 
     const [active,setActive]=useState({
        descriptionActive:true,
        specificationActive:false,
        videoActive:false,
        reviewActive:false,
     })

     const [mainPicture,setMainPicture]=useState({
       main_image:"",
       mainPicture:"",
       galary_image_1:"",
       galary_image_2:"",
       folder:""
     }) 
  const [products,setProduct]=useState({  
    products:[], 
  }) 

useEffect(() => {   
    getProduct()  
    getSpecification(product_id)
      getRelatedProduct(product_id)
      getRelatedProductIdData();
 
 }, [product_id])

 const getRelatedProductIdData=async()=>{
  const url=websiteApi+`relatedProductListById/${product_id}`;
 const  response=await fetch(url);
 var data=await response.json();  
 setRelatedProductIdData(data);
}

 const getRelatedProduct=()=>{
  var related_base_url=websiteApi+"related-product/"+product_id;
  axios.get(related_base_url).then((response)=>{  
    setRelated(response.data);
  }) 
  
}

const getProduct=()=>{   
  let product_url=websiteApi+"/mobileProductShow/"+product_id; 
  axios.get(product_url).then((response)=>{  
    setMainPicture({
      ...mainPicture,
      mainPicture:response.data.main_image,
      main_image:response.data.main_image,
      galary_image_1:response.data.galary_image_1,
      galary_image_2:response.data.galary_image_2,
      folder:response.data.folder,
    }) 
    setLoading(true)
    setProduct({       
          products:response.data,
    })  
  })       
} 
 const setMainPictureFunction=useCallback((picture)=>{   
  setMainPicture({...mainPicture,mainPicture:picture})

 },[mainPicture.mainPicture])
 const increment=useCallback(()=>{
   setCount((prevState)=>prevState+1)

 },[count])
 const decrement=useCallback(()=>{
   if(count >1){
    setCount((prevState)=>prevState-1)
   }
 
},[count])


const addToCart=useCallback((product_title)=>{ 
    Toast.show({
      text: product_title+"\n Added Successfully",       
      type: "success"
    })
var add_cart_url=websiteApi+"addCart/"+products.products.product_id+"/"+count
axios.get(add_cart_url).then(response=>{  
  setUserCartItem(response.data)
  AsyncStorage.setItem("cart_count",response.data);
})

 })

 
const BuyNow=useCallback((product_title)=>{    
  
  Toast.show({
    text: product_title+"\n added successfully to your cart",       
    type: "success"
  })
var add_cart_url=websiteApi+"addCart/"+products.products.product_id+"/"+count
axios.get(add_cart_url).then(response=>{
  setUserCartItem(response.data)
  AsyncStorage.setItem("cart_count",response.data);
})

})

 const addToWishList=useCallback((product_title)=>{ 
   
  Toast.show({
    text: product_title+"\n added to your wishlist",       
    type: "success"
  })     
var wishlistUrl=websiteApi+"addWishlist/"+products.products.product_id+"/"+count
axios.get(wishlistUrl).then(response=>{  
  setUserWishlistItem(response.data)
  AsyncStorage.getItem('wishlist_count',response.data)

})
})

const descriptionActiveFunction=useCallback((value)=>{
 
  if(value=='specification'){
    setActive({
      ...active,
      specificationActive:true,
      descriptionActive:false,
      reviewActive:false,
      videoActive:false

    })

  } else if(value=='description'){
    setActive({
      ...active,
      specificationActive:false,
      descriptionActive:true,
      reviewActive:false,
      videoActive:false

    })
   }
    else if(value=='review'){
      setActive({
        ...active,
        specificationActive:false,
        descriptionActive:false,
        reviewActive:true,
        videoActive:false
  
      })

  } else{
    setActive({
      ...active,
      specificationActive:false,
      descriptionActive:false,
      reviewActive:false,
      videoActive:true

    })
  }

},[active])

const getSpecification=async(product_id)=>{

  let product_url=websiteApi+"/getSpecification/"+product_id; 
  axios.get(product_url).then((response)=>{  
    setSpecification(response.data);    
})
}


const addToCartProduct=(cart_product_id,product_title)=>{    
        
  Toast.show({
   text: product_title+" Added to your Cart",
   type:"success"
   
 })
var add_cart_url=websiteApi+"addCart/"+cart_product_id+"/1"
let config={method:'GET'}
fetch(add_cart_url,config).then((result)=>result.json()). 
then((response)=>{    

  setUserCartItem(response.data)
  AsyncStorage.setItem("cart_count",response);
}).catch((error)=>{

})

}

const DescriptionDataLoad=()=>{
  if(active.descriptionActive){
    return (
      <CardItem cardBody > 
       <View ><HTMLView
        stylesheet={styles}
      
      value={products.products.product_description}
     
    /></View>
           </CardItem>

    )
  }else if(active.specificationActive){

    return(     
          <List>
          {specifications.map((row,index)=>
            (
              <ListItem >
              <Left><Text>{row.key}</Text></Left>
              <Body><Text>{row.value}</Text></Body>    
              </ListItem>
            )          
          )} 
          </List>
         
    )
  } else if(active.videoActive){
    return(
      <View style={{flex: 1,height:300}}>
        {products.products.product_video ? 
    <WebView
        style={ {  marginTop: (Platform.OS == 'ios') ? 20 : 0,} }
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: 'https://www.youtube.com/embed/'+products.products.product_video }}
     /> :<Text>There are no video to this product</Text>}
</View>
    )
  } else{
    return(
      <View>
        <Text>UnderConstruction</Text>
      </View>
    )
  }  
}
 
return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
      <Container>
         <HeaderComponent navigation={props.navigation} />  
        <ScrollView ref={ref} scrollEnabled style={{backgroundColor:"#fff"}}>  
        <View style={{flex:2,flexDirection:"row",padding:10,justifyContent:"center"}}>
  <View style={{flex:1,backgroundColor:"#2cb574",}}>
      <Text style={{textAlign:"center",padding:2,margin:5,color:"white",fontWeight:"bold"}}>{product_title}</Text>
</View>  
 </View>  

 { loading ?    
        <>
   <ProductPicture 
    setMainPictureFunction={setMainPictureFunction} 
    mainPicture={mainPicture.mainPicture} 
    folder={mainPicture.folder}
     galary_image_1={mainPicture.galary_image_1} 
     galary_image_2={mainPicture.galary_image_2} 
      main_image={mainPicture.main_image} />
      <ProductCartSection  
      count={count}
      increment={increment}
      decrement={decrement}
      addToCart={addToCart}
      BuyNow={BuyNow}
      addToWishList={addToWishList}
      product_title={products.products.product_title}
      product_price={products.products.product_price}
      discount_price={products.products.discount_price}
      product_short_description={products.products.product_short_description}
      sku={products.products.sku}
      products={relatedProductsData}
      navigation={props.navigation}
 
      
      /> 




<Content padder style={{marginTop:-25,}}>
          <Card>
          
            <CardItem cardBody >
       
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-between",borderRadius:50}}>
          <TouchableWithoutFeedback  onPress={()=>descriptionActiveFunction('description')}>
          <Text   style={active.descriptionActive ? {padding:7,color:"white",textAlign:"center",backgroundColor:"#323071",width:"30%"} :{padding:7,color:"white",textAlign:"center",backgroundColor:"#2cb574",width:"30%"}}>Description</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback  onPress={()=>descriptionActiveFunction('specification')}>
            <Text   style={active.specificationActive ? {padding:7,color:"white",textAlign:"center",backgroundColor:"#323071",width:"35%"} :{padding:7,color:"white",textAlign:"center",backgroundColor:"#2cb574",width:"35%"} }>Specifications</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback  onPress={()=>descriptionActiveFunction('review')}>
            <Text  style={active.reviewActive ? {padding:7,color:"white",textAlign:"center",backgroundColor:"#323071",width:"18.5%"}:{padding:7,color:"white",textAlign:"center",backgroundColor:"#2cb574",width:"18.5%"}}>Riview</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback  onPress={()=>descriptionActiveFunction('video')}>
            <Text  style={active.videoActive ? {padding:7,color:"white",textAlign:"center",backgroundColor:"#323071",width:"17.5%"}:{padding:7,color:"white",textAlign:"center",backgroundColor:"#2cb574",width:"17.5%"}}>Video</Text>
            </TouchableWithoutFeedback>
         </View>

            </CardItem>             
          </Card>
        </Content>  

        <Content padder>
          {DescriptionDataLoad()}
        </Content>
       <Text style={{flex:1,backgroundColor:"#2cb574",padding:8,margin:5,textAlign:"center",color:"white"}}> Related Products </Text> 

         <FlatList      
        numColumns={2}
        data={relatedProducts}
        renderItem={({item})=><ProductRender navigation={props.navigation}
         product_id={item.product_id}  main_image={item.main_image} 
         folder={item.folder} product_title={item.product_title} 
         discount_price={item.discount_price} product_price={item.product_price} 
         addToCart={addToCartProduct}
         />}
        keyExtractor={(item) => item.product_id}           
      />  

</> :<LoadingActivator  />}

      
     </ScrollView>
     <FooterComponent  navigation={props.navigation} />  
   
       </Container>
       </View>  
    );
 
}

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
  p:{
    lineHeight:15,
    fontSize:15,marginBottom:-25
  }
});