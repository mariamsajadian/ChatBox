class Chatroom {
     constructor(room, username){ 
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){

        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await this.chats.add(chat);
        console.log(response);
        return response;
    }
    //setting up a real-time listener to get new chats
    getChats(callback){
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => { 
                if(change.type === 'added'){
                    callback(change.doc.data());
                }
            });

        });
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
      }
      updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){
          this.unsub();
        }
      }
    }
   
