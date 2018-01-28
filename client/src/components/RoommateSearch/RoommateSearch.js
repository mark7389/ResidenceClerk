import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Input from '../Input';
import { RaisedButton } from 'material-ui';

const RoommateSearch = (props)=>{
  return (
    <form>
     <Input type="text" floatingLabelText="Search for Roommate by email" onChange={props.onChange}
     name="roommateform"
     />
     <FlatButton
     onClick={props.onClick} backgroundColor="rgb(237,187,0)" style={{margin:"3px"}}>Add</FlatButton>
    </form>
  )
}
export default RoommateSearch;