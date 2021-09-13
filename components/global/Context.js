import React,{ useState } from 'react';
 import { View ,useWindowDimensions } from 'react-native';
export const AuthContext=React.createContext()
 
const Context = ({ children }) => {
    const globalWidth = useWindowDimensions().width;
    const globalHeight = useWindowDimensions().height;

    const [loginStatus,setLoginStatus]=useState(false)
    const [menuShow,setMenuShow]=useState(true)
    const [userId,setUserId]=useState("")
    const [picture,setPicture]=useState("")
    
    
    return (       
          <AuthContext.Provider value={{ globalWidth,globalHeight,loginStatus,menuShow,setMenuShow,setLoginStatus,userId, setUserId,picture,setPicture}}>
          {children}
        </AuthContext.Provider>
    );
};

 
export default Context;