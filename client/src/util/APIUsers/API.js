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
  }

};
