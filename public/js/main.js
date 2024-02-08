const socket=io();

const msgform=document.querySelector('.msgform');


//Get usename from query string

const {user} = Qs.parse(location.search,{ignoreQueryPrefix:true});


socket.emit("JoinRoom",user);

socket.on('message',(message)=>{
    outmessage(message);
})

// Get the users in the room

socket.on('roomusers',(roomusers)=>{
    
    outputusers(roomusers);
})


msgform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=e.target.elements.inputmsg.value;
    if(msg!=="")
    socket.emit('chatMessage',msg);
    e.target.elements.inputmsg.value="";
});

function outmessage(message){
    const msgbox=document.querySelector(".msgbox");
    const  div=document.createElement('div');
    const p=document.createElement('p');
    p.append(`${message.username}      ${message.time}`);
    div.append(p);
    div.append(`${message.text}`);
    msgbox.append(div);
    div.classList.add("realmsg")
}


function outputusers(roomusers){
    const usersContainer = document.querySelector('.allusers');
    
    // Clear existing user list
    usersContainer.innerHTML = '';

    for(let i of roomusers){
        const p=document.createElement('p');
        p.append(`${i.username}`);
        usersContainer.append(p);
        p.classList.add('userstyle');
    }
}
