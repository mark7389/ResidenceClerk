import React from 'react';
import './BIll.css';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import ProgressBar from 'material-ui/LinearProgress';
import { Divider } from 'material-ui';

const Bill = (props)=>{
      let paid = 0;
      console.log(props.bill.bees);
      props.bill.bees.map((bee)=>{
        console.log(bee.paid)
        console.log(bee.share);
        if(bee.paid){
          paid += bee.share*props.bill.value;
        }
      })
      console.log(paid);
      const renderButton = ()=>{
        let flag = false;
        props.bill.bees.map((bee,i)=>{
          console.log(bee.name);
          console.log(bee.paid);
          console.log(props.user);
          if((bee.name === props.user) && !bee.paid){
            flag = true;
          }
          
          })
          if(flag){
            return (<FlatButton backgroundColor="rgb(237,187,0)" style={{margin:"3px"}} value={props.bill.name} onClick={()=>{props.pay(props.bill.name)}}>Pay Share</FlatButton>);
          }
      }
      return (<div>
        <Divider />
        {renderButton()}
        
        <Divider />
        <ProgressBar mode="determinate" min={0} max={parseInt(props.bill.value)} value={paid} color="rgb(237,187,0)"/>
              <h3>{props.bill.name}</h3>
              <h5>Value: ${props.bill.value}</h5>
              <h5>Category: {props.bill.category}</h5>
              <h5>Due Date: {props.bill.date.split("T")[0]}</h5>
              
              <Divider />
             </div>)


}

export default Bill;