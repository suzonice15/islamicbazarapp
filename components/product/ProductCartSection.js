import React, { useState,useEffect } from 'react';
import { Segment,Thumbnail,Card,CardItem,Content,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList ,TouchableWithoutFeedback} from 'react-native';
 
 import HTMLView from 'react-native-htmlview';
import RelatedProduct from  '../product/RelatedProduct';


    function ProductCartSection({navigation,products,BuyNow,addToWishList,addToCart,increment,decrement,count,product_title,sku,product_short_description,product_price,discount_price}) {
    
console.log("product_cart_section")
    return (
        <Content padder style={{marginTop:-15,flex:1,flexDirection:"column"}} >
       
        <Card>
      
        {/* <CardItem  cardBody style={{backgroundColor:"#efefef"}}>
        <Text style={{padding:5,marginLeft:5}} >{ product_title}</Text>
       </CardItem> */}

       <CardItem  cardBody style={{backgroundColor:"#efefef"}}>
        <Text style={{padding:10,backgroundColor:"#b5f7c4",marginLeft:5,borderRadius:50,width:"50%"}} >Product Code :{sku}</Text>
       
       </CardItem>

       { product_short_description ? 
       <><CardItem  cardBody style={{backgroundColor:"#efefef"}}>
<Text style={{padding:5,marginLeft:5}} >Key Features</Text>
</CardItem>
<CardItem  cardBody style={{backgroundColor:"#efefef"}}>
<View  style={{padding:5,marginLeft:5}}>
<HTMLView  value={product_short_description}     
    />
</View>
</CardItem></> :null }

<CardItem  cardBody style={{backgroundColor:"#efefef",marginLeft:5}}>

{ discount_price >0 ?  <Text style={{color:'black',textAlign:'center',height:40,fontSize:25}}>৳ {discount_price}</Text> : <Text style={{marginTop:5,color:'black',marginLeft:5,textAlign:'center',height:40,fontSize:15}}>৳ {product_price}</Text>		 
}
       
       { discount_price >0 ?  <Text style={{color:'red',textAlign:'center',marginLeft:5,height:40,fontSize:25}}>৳ {product_price}</Text> : null }
  
       </CardItem>

       <CardItem  cardBody style={{backgroundColor:"#efefef",marginLeft:5,flex:1,flexDirection:"row",justifyContent:"flex-start"}}>
       
        <View style={{backgroundColor:"#efefef",flex:1,flexDirection:"row",justifyContent:"flex-start"}}>
        <TouchableWithoutFeedback onPress={()=>decrement()}>
          <Text style={{width:60,padding:1,borderWidth:1,fontSize:25,textAlign:"center",fontWeight:"bold"}}>-</Text>
          </TouchableWithoutFeedback>
           <Text style={{width:60,padding:1,borderWidth:1,fontSize:25,textAlign:"center",fontWeight:"bold"}}>{count}</Text>
          <TouchableWithoutFeedback onPress={()=>increment()}>
          <Text style={{width:60,padding:1,borderWidth:1,fontSize:25,textAlign:"center",fontWeight:"bold"}}>+</Text>
          </TouchableWithoutFeedback>
        </View>

 </CardItem>    
              
      <CardItem   cardBody style={{backgroundColor:"#efefef",marginTop:8,flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
                
        <Button small iconLeft  onPress={()=>addToCart(product_title)}  success style={{width:"42%",}}>
        <Icon name='shoppingcart' type="AntDesign" />
          <Text>Add To Cart</Text>
        </Button>
       
        <Button onPress={()=>BuyNow(product_title)}  small iconLeft danger style={{width:"38%"}}>
        <Icon name='shopping-basket' type="FontAwesome5" />
          <Text>Buy Now</Text>
        </Button>
        <Button onPress={()=>addToWishList(product_title)}  small  info style={{width:"16%"}}>
          <Icon name="heart" />
          <Text>Favorite</Text>
        </Button>
       </CardItem>   

       {/* {products.map((product,index)=>{
         return (
          <Text>{product.product_title}</Text>
         )
        
         })} */}

          
          <FlatList      
       
        data={products}
        renderItem={({item})=><RelatedProduct 
        navigation={navigation} 
        folder={item.folder} 
        product_title={item.product_title} 
         product_id={item.product_id} 
         main_image={item.main_image} 
         product_price={item.product_price}
         discount_price={item.discount_price}
         />}
        keyExtractor={(item) => item.product_id}    
       
      /> 


</Card>
     </Content>
    );
 
}
export default   React.memo(ProductCartSection)