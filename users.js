const users=[];



function userjoin(id,username){
    const user ={id,username};
    users.push(user);
    return user;
}


// Get current user

function curuser(id){
    return users.find(user=>user.id===id);
}


function userleave(id){
    const index=users.findIndex(user=>user.id===id)
    if(index!=-1){
        return users.splice(index,1);
    }
}

function roomuser(){
    return users;
}

module.exports={
    userjoin,
    curuser,
    userleave,
    roomuser
}


