import React, { useState,useEffect } from 'react';
import { Segment,Thumbnail,Card,CardItem,Content,Text,Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
 import { Image, View,ScrollView,FlatList ,TouchableWithoutFeedback} from 'react-native';
 
 import HTMLView from 'react-native-htmlview';
import RelatedProduct from  '../product/RelatedProduct';


    function ProductCartSection({navigation,products,BuyNow,addToWishList,addToCart,increment,decrement,count,product_title,sku,product_short_description,product_price,discount_price}) {
    

    return (
        <Content padder style={{marginTop:-15,flex:1,flexDirection:"column"}} >
       
       <Card>   
<FlatList    

numColumns={2}
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

        <Card>

            <View style={{flex:3,flexDirection:"row",justifyContent:"space-around",marginTop:8}}>
            
            <View style={{flex:1}}>
            <Text style={{padding:10,backgroundColor:"#b5f7c4",marginLeft:10,borderRadius:50}} >Code :{sku}</Text>

            </View>
             <View  style={{flex:1}}>
             { discount_price >0 ?   <Text style={{color:'black',marginLeft:20,textAlign:'left',height:40,fontSize:25}}>৳ {discount_price}</Text> : <Text style={{marginTop:5,color:'black',marginLeft:20,textAlign:'left',height:40,fontSize:25}}>৳ {product_price}</Text>	 
    }
              </View>
              <View  style={{flex:1}}>
              { discount_price >0 ?  <Text style={{color:'red',textAlign:'left',height:40,fontSize:25}}>৳ {product_price}</Text>: null }

              </View>

          </View>
       
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
       <CardItem  cardBody style={{backgroundColor:"#efefef",marginLeft:5,flex:1,flexDirection:"row",justifyContent:"flex-start"}}>
       
        <View style={{backgroundColor:"#efefef",flex:1,flexDirection:"row",justifyContent:"flex-start"}}>
        <TouchableWithoutFeedback onPress={()=>decrement()}>
          <Text style={{width:45,padding:1,borderWidth:1,fontSize:25,textAlign:"center",fontWeight:"bold"}}>-</Text>
          </TouchableWithoutFeedback>
           <Text style={{width:45,padding:1,borderWidth:1,fontSize:25,textAlign:"center",fontWeight:"bold"}}>{count}</Text>
          <TouchableWithoutFeedback onPress={()=>increment()}>
          <Text style={{width:45,padding:1,borderWidth:1,fontSize:25,textAlign:"center",fontWeight:"bold"}}>+</Text>
          </TouchableWithoutFeedback>
          <Button   iconLeft  onPress={()=>addToCart(product_title)}  success style={{marginLeft:4,height:40,marginTop:5}} >       
          <Text>Add To Cart</Text>
        </Button>       
        <Button onPress={()=>BuyNow(product_title)}  small iconLeft danger style={{marginLeft:2,height:40,marginLeft:4,marginTop:5}}>       
          <Text>Buy Now</Text>
        </Button>
        </View>

 </CardItem>   

</Card>
       </Content>
    );
 
}
export default   React.memo(ProductCartSection)