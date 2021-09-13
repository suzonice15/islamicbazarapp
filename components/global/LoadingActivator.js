import React from 'react';
import {View,Text, ActivityIndicator } from 'react-native'
   

 function LoadingActivator() {
   

    return (    
     <View style={{ flex: 1,justifyContent:"center" ,alignItems:"center",marginTop:50}}>
     <View style={{justifyContent: 'center',flexDirection:"row", alignContent: 'center', flex: 1}}>
     <ActivityIndicator  color="#083D17" size="large"/>
     <Text style={{marginLeft:5,fontSize:18}}>Please Wait.....</Text>
     </View>
     </View> 
     );
}

export default React.memo(LoadingActivator)