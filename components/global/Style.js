import { StyleSheet,Dimensions  } from 'react-native';
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  formSection: {
      flex:3,     
      flexDirection:"column",
      marginTop:80,

  },
  homePageProgaqmHeader:{
    alignSelf:"center",    
    color:"white",
    width:"100%",
    textAlign:"center",
     padding:5,
    backgroundColor:"#1d7e00"

  },
  signUpButton:{
    backgroundColor:"#1d7e00",
    color:"white",
    padding:5,
    borderRadius:10
  },
  formBottomSection: {
    flex:3,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"center",
    marginTop:150

},
loginSection:{
    flex:2,
    flexDirection:'column',
    padding:7
},
loginButton:{
    flex:2,      
   alignSelf:"center",  
  backgroundColor:"#1d7e00",
  color:"white",
  textAlign:"center",
  height:35,
  paddingTop:5,
  borderRadius:5
},
 
 
forgot:{
      padding:20,
     alignSelf:'flex-end'
},
SingleProgram_Title:{
  backgroundColor:"#1d7e00",
  color:"white",
   flex:1,
  textAlign:"center",
  padding:6,
  margin:3
  },
  homeProgramTitle:{
    backgroundColor:"#1d7e00",
  color:"white",
  textAlign:"center",
   padding:5

  },
  blogIconStyle :{
    color:"#1d7e00",fontSize:16,
  },
  salatTime:{
    padding:3,
    borderBottomWidth:1,
    borderBottomColor:"white",
    flex:1,flexDirection:"row",
    justifyContent:"space-around",
    backgroundColor:"#ddd"
  },
  segmentActive:{
    backgroundColor:"red", 
    color:"white",     
    height:35   
  },
  segmentInactive:{
    backgroundColor:"#1d7e00",   
    height:35   ,
    color:"white"
  },
  sidebarIconColor:{
    backgroundColor:"black",
    color:"white",
     padding:5
  },
  pullButtonColor:{
    marginTop:5,fontSize:16,width:'100%',textAlign:'center',padding:5,color:'white',backgroundColor:'#5a0000'
  },
  messageTime:{
	  textAlign:'center',
	  color:'black'
	 },
   userMessage:{
		backgroundColor:'green',
		color:'white',
		width:300,
		padding:10,
		margin:5,
		marginRight:0,
		borderRadius:10,
		marginLeft:35,
    height:"auto",	 
		 
	   },
     adminMessage:{
      backgroundColor:'red',
      color:'white',
      width:300,
      padding:10,
      marginLeft:0,
      margin:5,
      borderRadius:50,
   
      
     },

  
});

export default styles;
