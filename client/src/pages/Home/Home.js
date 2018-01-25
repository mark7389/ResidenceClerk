import React, {Component} from 'react';
import {default as APIUsers} from '../../util/APIUsers/API';
import {default as APIBills} from '../../util/APIbills/API';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../../components/NavBar/NavBar';
import SideNav from '../../components/SideNav';

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
          billdate:"",
          bees:{},
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
      handleInputChangeBill = (e)=>{
        const value=e.target.value;
        const name=e.target.name;
        let dummy = {...this.state.billform};
        dummy[name] = value;
        this.setState(dummy);
      }
      handleSelectionBill = (event)=>{
        const value=event.target.value;
        let dummy = {...this.state.billform};
        dummy.billcategory = value;
        this.setState(dummy);
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