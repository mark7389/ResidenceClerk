import React, {Component} from 'react';
import {default as APIUsers} from '../../util/APIUsers/API';
import {default as APIBills} from '../../util/APIbills/API';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../../components/NavBar/NavBar';
import SideNav from '../../components/SideNav';
import BillForm from '../../components/BillForm/BillForm';
import Input from '../../components/Input';
import Bills from '../Bills';
import RoomMates from '../RoomMates/RoomMates';
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
        roommateform:"",
        roommateformResult:"",
        currentUser:""
          
      }
      componentDidMount(){
            APIUsers.IsAuth().then(res=>{
                 
                 APIUsers.getRoomMates(res.data.hives[0]).then(mates=>{
                          this.setState({
                              currentHive:res.data.hives[0],
                              hives:res.data.hives,
                              roommates:mates.data.roommates,
                              currentUser:mates.data.user
                          })
                 }).catch(err=>{

                 })
               
            }).catch(err=>{
              
              window.location.href="/"
            })
      }
      handleInputChangeRoomMate = (e)=>{
                const name = e.target.name;
                const value = e.target.value;
                this.setState({
                  [name]:value
                })
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
      handleSelectionBill = (e,status,roommate)=>{
            let dummy = this.state.billform;
            if(status){
              dummy.bees.push({name:roommate});
            }
            this.setState({billform:dummy});
            
      }
     
      getBills = ()=>{
        APIBills.findAll(this.state.currentHive).then(bills=>{
              this.setState({data:bills.data})
        }).catch(err=>{
          console.log(err);
        })
      }
      searchDone = ()=>{
          this.setView(this.state.currentHive);
      }
      addUser = ()=>{
              
            APIUsers.addRoommate(this.state.roommateform).then(res=>{
                  if(res.data.msg === "access granted")
                  {this.setState({
                    roommateformResult:"Roommate Account found, successfully added!",
                    roommateform:""
                  })}
                  else{
                    this.setState({
                      roommateformResult:"No Account Found",
                      roommateform:""
                    })
                  }
            }).catch(err=>{
                  
            })
      }
      createBill = () =>{
          let split = this.state.billform.bees.length;
          let share = ((this.state.billform.billvalue)/(split))/(this.state.billform.billvalue);
          let dummy = this.state.billform;

          let newBees=dummy.bees.map(bee=>{
            return {name:bee.name, share:share, paid:false}
          })
          dummy.bees = newBees;
          dummy.hive = this.state.currentHive;
          APIBills.create(dummy).then(res=>{
            console.log(res.data);
            
            this.setView(this.state.currentHive)
          }).catch(err=>{
            console.log(err);
          })
      }
      payBill = (billname) =>{
        let member;
        
        console.log(billname);
          const data = {
            billname:billname,
            hive:this.state.currentHive,
            member:this.state.currentUser
          }
          APIBills.pay(data).then(res=>{
            console.log(res);
            if(res){
                this.getBills();
            }
          }).catch(err=>{
            console.log(err)
          })
      }
      
      setView = (view)=>{
        if(view.indexOf("HIVE") > -1){
          APIUsers.getRoomMates(view).then(res=>{
            
            APIBills.findAll(view).then(bills=>{
                
                this.setState({open:false,
                  currentHive:view,
                  view:"bills",
                  billform:{
                    billname:"",
                    billcategory:"",
                    billdate:{},
                    bees:[],
                    billvalue:0
                  },
                  data:bills.data,
                  roommates:res.data.roommates,
                  currentUser:res.data.user});
            }).catch(err=>{

            })
            
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
                                            
                                            onRoommateSelect={this.handleSelectionBill}
                                            
                                            createBill={this.createBill}/>;
          case "bills": return <Bills data={this.state.data} pay={this.payBill} user={this.state.currentUser}/>;
          case "Add Roommate": return <RoomMates  done={this.searchDone} result={this.state.roommateformResult} addRoommate={this.addUser} InputChange={this.handleInputChangeRoomMate}/>;
          default: return <Bills data={this.state.data} pay={this.payBill} user={this.state.currentUser}/>;
        }
          
        
      }
      handleClose = (event)=>{
        
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