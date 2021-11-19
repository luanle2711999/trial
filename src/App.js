import logo from './logo.svg';
import React from 'react'
import './App.css';
import Editable from './Components/Editable/Editable';


class App extends React.Component {
   render() {
     return (
       <div className="App">       
         <Editable />
       </div>
     )
   }
 }
export default App;
