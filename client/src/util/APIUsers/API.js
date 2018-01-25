import axios from 'axios';

export default {

  Login: function(username, password) {
       return axios.post("/api/bees/login", {username:username,password:password});
  },

  SignUp: function(username, password, nickname){
        return axios.post("/api/bees/create",{
          username:username,
          password:password,
          nickname:nickname
        });
  },
  IsAuth: function(){
    return axios.get("/api/bees/isAuth");
  },
  getHives: function(){
    return axios.get("/api/bees/getHives");
  },
  getRoomMates: function(currentHive){
   return axios.get(`/api/bees/roommates/${currentHive}`);
  },
  addRoommate: function(roommate){
    return axios.get(`/api/bees/grant/${roommate}`);
  } 
};
