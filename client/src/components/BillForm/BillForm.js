import React from 'react';
import Paper from 'material-ui/Paper'
import Input from '../Input';
import './BillForm.css';
import {default as catarray} from '../../util/categories';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const BillForm = (props)=>{
  const array = catarray.categories;
  let items = array.map((category, i)=>{
    return <MenuItem  key={i+1} value={category} primaryText={category}/>
  })
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
              <Input  />
              <Input />
              <Input />
              <SelectField value={props.billcategory}
                           onChange={props.CategorySelect}
                           floatingLabelText="Category"
                           >
                           {items}
                           </SelectField>
          </form>
        </Paper>
    </div>
  )
}