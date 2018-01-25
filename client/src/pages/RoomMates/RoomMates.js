import React from 'react';
import Paper from 'material-ui/Paper';
import { Divider } from 'material-ui';
import RoommateSearch from '../../components/RoommateSearch';
import FlatButton from 'material-ui/FlatButton/FlatButton';

const RoomMates = (props)=>{
  const styles = {
    width:"40%",
    margin:"auto",
    "min-height":"350px"
  }


  return(
    <Paper className="Roommates-container" zDepth={2} style={styles}>

              <div className="header">
                    <h1>Roommates</h1>
              </div>
              <Divider />
              <RoommateSearch onClick={props.addRoommate} onChange={props.InputChange} />
              <Divider />
              {(props.result === "") ? (<div />):(<h3>{props.result}</h3>)}
              <FlatButton onClick={props.done}>Done</FlatButton>
    </Paper>
  )
}
export default RoomMates;