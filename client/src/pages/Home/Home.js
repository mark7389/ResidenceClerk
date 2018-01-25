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
        currentHive: ""
      }
      componentDidMount(){
            APIUsers.IsAuth().then(res=>{
                  APIUsers.getHives().then(res=>{
                        this.setState({hives:res.data.hives,
                                      currentHive:res.data.hives[0]});
                        console.log(this.state.hives);
                  }).catch(err=>{

                  })
            }).catch(err=>{
              window.location.href="/"
            })
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
          this.setState({open:false,
                         currentHive:view,
                         view:"bills"})
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
      handleClose = (e)=>{
        if(e){
        const view = e.target.value;
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