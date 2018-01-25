import React from 'react';
import Paper from 'material-ui/Paper'
import Input from '../Input';
import './BillForm.css';
import {default as catarray} from '../../util/categories';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker'
const BillForm = (props)=>{
  const array = catarray.categories;
  let items = array.map((category, i)=>{
    return <MenuItem  key={i+1} value={category} primaryText={category}/>
  })
  let roommates = props.roommates.map((roommate=>{

  }))
  const styles={
    border:"2px solid whitesmoke",
    width: "100%",
    background:"rgb(237,187,0)"
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
              
          </form>
        </Paper>
    </div>
  )
}
export default BillForm;