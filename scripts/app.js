// DOM query
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');


// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
      .then(() => newChatForm.reset())
      .catch(err => console.log(err));
  });

//add a new userName
newNameForm.addEventListener('submit', e =>{
    e.preventDefault();
    const newName= newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    updateMessg.innerText = `your name is updated to ${newName}`;
    setTimeout(() => updateMessg.innerText = "", 3000);
});
const username = localStorage.username ? localStorage.username : 'none';

// update the chat room
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
       }
  });
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);
chatroom.getChats(data => chatUI.render(data)
//   console.log(data);
);
