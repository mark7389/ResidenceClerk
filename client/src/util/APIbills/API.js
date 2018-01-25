import axios from 'axios';
export default {
      create: function(data){
        return axios.post("/api/bills/create", data);
      },
      findAll: function(hive){
        return axios.get(`/api/bills/all/${hive}`);
      },
      pay:function(data){
        return axios.put("/api/bills/updatepay", data);
      }
}