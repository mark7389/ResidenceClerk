import React, {Component} from 'react';
import {default as APIUsers} from '../../util/APIUsers/API';
import {default as APIBills} from '../../util/APIbills/API';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../../components/NavBar/NavBar';
import SideNav from '../../components/SideNav';
import BillForm from '../../components/BillForm/BillForm';

class Home extends Component {
      state = {
        signedIn: true,
        view:"bills",
        data:"",
        open:false,
        hives:[],
        currentHive: "",
        billform:{
          billname:"",
          billcategory:"",
          billdate:{},
          bees:[],
          billvalue:0
        },
        roommates:[],
        roommateform:""
          
      }
      componentDidMount(){
            APIUsers.IsAuth().then(res=>{
                 APIUsers.getHives().then(hives=>{
                   console.log(hives);
                        this.setState({hives:hives.data.hives});
                 }).catch(err=>{
                      console.log(err);
                 })
               
            }).catch(err=>{
              window.location.href="/"
            })
      }
      handleInputChangeRoomMate = (e)=>{

      }
      handleInputChangeBill = (e, date, payload)=>{
          if(e && !payload) { e.preventDefault();
            const value=e.target.value;
            const name=e.target.name;
            let dummy = {...this.state.billform};
            console.log(dummy);
          console.log(name);
          dummy[name]=value;
          console.log(dummy);
            this.setState({billform:dummy}
            );
          }
            else if(payload){
                let dummy= {...this.state.billform}
                dummy.billcategory = payload;
                this.setState({billform:dummy});
            }
            else{
              let dummy = {...this.state.billform}
              dummy.billdate=date
              this.setState({billform:dummy});
            }
      }
      handleSelectionBill = (event, key, payload)=>{
            const dummy = this.state.bees;
            payload.map(value=>{
              dummy.push({name:value.name});
            })
            this.setState({bees:dummy});
      }
      selectionRenderer = (values)=>{
        switch (values.length){
          case 0: return '';
          case 1: return this.state.bees[0].name;
          default: return `${values.length} roommates selected`;
        }
      }
      getBills = ()=>{

      }
      getBill = ()=>{

      }
      addUser = ()=>{

      }
      createBill = () =>{

      }
      getHiveMembers = ()=>{

      }
      
      setView = (view)=>{
        if(view.indexOf("HIVE") > -1){
          APIUsers.getRoomMates(view).then(res=>{
            console.log(res.data);
            this.setState({open:false,
              currentHive:view,
              view:"bills",
              roommates:res.data});
          }).catch(err=>{
            console.log(err);
          })
          
          
        }
        else{
          this.setState({open:false,
                          view:view})
        }
      }
      getCurrentView = ()=>{
        switch(this.state.view){
          case "Add Bill": return <BillForm onChange={this.handleInputChangeBill}
                                            {...this.state.billform}
                                            roommates={this.state.roommates} 
                                            selectionRenderer={this.selectionRenderer}
                                            onRoommateSelect={this.handleSelectionBill}/>;
        
        }
          
        
      }
      handleClose = (event)=>{
        event.preventDefault();
        if(event){
        const view = event.target.innerHTML;
        console.log(view);
        this.setView(view);
        }
        else{
          this.setState({open:false});
        }
        
      }
      openMenu = ()=>{
        this.setState({open:true});
      }
      render(){
        return(
            <MuiThemeProvider>
              <div>
                <NavBar rightIcon={<div/>}
                        signedIn={this.state.signedIn}
                        openMenu={this.openMenu}
                        />
                {this.getCurrentView()}
                <SideNav open={this.state.open}
                         rightIcon={<div />}
                         hives={this.state.hives}
                         handleClose={this.handleClose}/>
              </div>
            </MuiThemeProvider>
        )
      }

}

export default Home;