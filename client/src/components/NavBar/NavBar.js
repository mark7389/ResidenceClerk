import React from 'react';
import './NavBar.css';
import AppBar from 'material-ui/AppBar';
import LoginButton from './LoginButton';

const NavBar = (props)=>{
 return(
    <AppBar 
        style={{background:"rgb(237,187,0)"}}
        title={<span><h3 className="bee">BEE</h3><h3 className="hive">Hive</h3></span>}
        showMenuIconButton={props.signedIn}
        iconElementRight={<LoginButton/>}
        iconStyleRight={{width:"10%", marginTop:"1%"}}
        onClick={props.onClick}
    />)
  
}

export default NavBar;