import React from 'react';
import './NavBar.css';
import AppBar from 'material-ui/AppBar';


const NavBar = (props)=>{
 return(
    <AppBar 
        style={{background:"rgb(237,187,0)"}}
        title={<span><h3 className="bee">BEE</h3><h3 className="hive">Hive</h3></span>}
        showMenuIconButton={props.signedIn}
    />)
  
}

export default NavBar;