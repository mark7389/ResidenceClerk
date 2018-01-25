import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Divider } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
const SideNav = (props)=>{
  return(
        <Drawer docked={false}
                width={200}
                open={props.open}
                onRequestChange={props.handleClose}
                >
                <MenuItem primaryText="Hives"
                rightIcon={<ArrowDropRight />}
                menuItems={props.hives.map(hive=>{
                          return <MenuItem onClick={props.handleClose} primaryText={hive} value={hive} />
                })}
                />
                <Divider />
                <MenuItem onClick={props.handleClose} primaryText="Add Bill" value={"BillForm"} />
                <MenuItem onClick={props.handleClose} primaryText="Add Roommate" value={"RoommatesForm"}/>
                <MenuItem onClick={props.handleClose} primaryText="View Roommates" value={"Roommates"}/>
                <MenuItem onClick={props.handleClose} primaryText="Home" value={"Bills"}/>
                
        </Drawer>
  )
}

export default SideNav;