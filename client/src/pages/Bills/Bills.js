import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Bill from '../../components/Bill';
import './Bills.css';
import { Divider } from 'material-ui';

const Bills = (props)=>{
  const styles = {
    width:"40%",
    margin:"auto",
    "min-height":"350px"
  }
  return (
      <Paper className="bills-container" zDepth={2} style={styles}>

              <div className="header">
                    <h1>Bills</h1>
              </div>
              <Divider />

              {props.data ? props.data.map((bill, i)=>{
                return (
                  <Bill key={i} bill={bill} pay={props.pay} user={props.user} />
                )
              }):(<h1 style={{color:"rgb(237,187,0)"}}>Please Select Hive to View Bills</h1>)}
      
      
      </Paper>
  )
}

export default Bills;