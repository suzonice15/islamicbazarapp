
import React from 'react';
 import {Root} from 'native-base'
import 'react-native-gesture-handler';
 
import Route from './components/global/route';
import Context from './components/global/Context';
export default function App() { 
  
  return (
    <Root>
      <Context>
      <Route></Route>
      </Context>  
    </Root>
  );
}

