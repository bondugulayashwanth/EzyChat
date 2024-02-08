const moment= require("moment");


function userinfo(username,text){
    return {
       username,
       text,
       time:moment().format("hh:mm a")
    }
}

module.exports=userinfo;