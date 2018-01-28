import React from 'react';
import Paper from 'material-ui/Paper'
import Input from '../Input';
import './BillForm.css';
import {default as catarray} from '../../util/categories';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Toggle, Divider, FlatButton } from 'material-ui';
const BillForm = (props)=>{
  const array = catarray.categories;
  let items = array.map((category, i)=>{
    return <MenuItem  key={i+1} value={category} primaryText={category}/>
  })
  const roommates = ()=>{ }
  const styles={
    border:"2px solid whitesmoke",
    width: "100%",
    background:"rgb(237,187,0)"
  }
  const btnStyle = {
    color:"whitesmoke",
    textShadow:"0px 0.4px 0px rgb(73,81,91)",
    margin:0,
    padding:0,
    border:"none",
    boxShadow:"none"
  }
  return(
    <div className="addBill">
        <Paper style={styles} className="billform-container">
          <div className="addBillHeader">
              <h1>Bill Details</h1>
          </div>
          <form className="billforms">
              <Input  type="text"
                      floatingLabelText="Bill Name" 
                      name="billname"
                      onChange={props.onChange}
                                         />
              <Input type="number" 
              floatingLabelText="Amount"
              name="billvalue"
              onChange={props.onChange}/>
              <DatePicker hintText="Due Date"
                          onChange={props.onChange}
                          name="billdate"/>
              <SelectField 
                           onChange={props.onChange}
                           floatingLabelText="Category"
                           name="billcategory"
                           value={props.billcategory}
                           >
                           {items}
                           </SelectField>
               <Divider />
               <h5>Toggle Roommates responsible for this bill</h5>
                   {props.roommates.map((roommate, i)=>{
                    return <Toggle key={i} 
                    label={roommate} onToggle={(e,status)=>props.onRoommateSelect(e,status,roommate)} 
                            thumbSwitchedStyle={{backgroundColor:"rgb(237,187,0)"}} trackSwitchedStyle={{backgroundColor:"rgb(237,187,0)"}}/>
              })}
              <Divider />
                  <FlatButton fullWidth={true}
                  onClick={props.createBill}
                  backgroundColor="rgb(237,187,0)"
                  ><h3 style={btnStyle}>Submit</h3></FlatButton>
          </form>
        </Paper>
    </div>
  )
}
export default BillForm;