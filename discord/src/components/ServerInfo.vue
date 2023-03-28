<template>
  <div class="containerChat" v-if="server">
    <div>
    <div class="server-info">
      <h2>{{ server.name }}</h2>
      <p>admin  : {{ server.creator }}</p>
    </div>
    <div class="server-messages" ref="chatMessages">
      <h3>Messages:</h3>
      <ul>
        <li v-for="(message, messageKey) in messageChannel" :key="messageKey">
          <div class="message-chat">
            <div class="message-info">
              <p>{{ message.author }}</p>
              <p>{{ formatDate(message.timestamp) }}</p>
            </div>
            <p>{{ message.content.Text }}</p>
          </div>
        </li>
      </ul>
    </div>
    
    <div class="server-chat">
      <input placeholder="Envoyer un message" v-model="newMessage" type="text">
      <button @click="sendMessage">Send message</button>
    </div>
    </div>
    <div class="server-users">
      <h2>Utilisateurs</h2>
      <input v-model="valeurInput" type="text">
      <button @click="AddUser">Add user</button>
      <ul>
        <li v-for="(user, index) in server.users" :key="index">
          <button @click="deleteUser(user)">X</button>{{ user }}
        </li>
      </ul>
      <div className="deleteChannel">
        <button @click="deleteChannel">Delete channel</button>
      </div>
      <div className="update">
        <button @click="showModal = true">Update channel</button>
        <div class="modal" v-if="showModal">
          <div class="modal-content">
            <h1>Modifier le salon</h1>
            <form @submit.prevent="updateChannel">
              <label>Nom du channel:
                <input type="text" v-model="channelName" >
              </label>
              <label>image du channel
                <input type="text" v-model="img" >
              </label>
              <button type="submit">modifier</button>
            </form>
            <button @click="showModal = false">Fermer la modal</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Veuillez sélectionner un serveur</p>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  import {useAuthStore} from '../store.js';
  

  export default {
    props: {
        server: Object,
        messageChannel: Object,
      
  },
  data() {
    return {
      
      valeurInput: '',
      auth: useAuthStore(),
      showModal: false,
      channelName: '',
      img: '',
    }
  },
 
   methods: {
    
    formatDate(timestamp) {
    const date = new Date(timestamp);
    const jour = date.getDate();
    const mois = date.getMonth() + 1;
    const annee = date.getFullYear();
    return `${jour}/${mois}/${annee}`;
  },
  updateChannel() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const url = `https://edu.tardigrade.land/msg/protected/channel/${this.server.id}/update_metadata`;
    const data = { name: this.channelName, img: this.img};
    axios.post(url, data,{ headers })
      .then(response => {
        console.log('update channel !');
        this.auth.getServer()
      })
      .catch(error => {
        console.error('Erreur lors de modification de channel :', error);
        throw error;
      });
  },
    deleteChannel() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const url = `https://edu.tardigrade.land/msg/protected/channel/${this.server.id}`;
      
      axios.delete(url, { headers })
        .then(response => {
          console.log('delete channel !');
          this.auth.getServer()
        })
        .catch(error => {
          console.error('Erreur lors de suppression de channel :', error);
          throw error;
        });
    },
    loadMessages() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const url = `https://edu.tardigrade.land/msg/protected/channel/${server.id}/messages/0`;

      axios.get(url, { headers })
        .then(response => {
          console.log('Messages chargés !');
          messageChannel = response.data;
        })
        .catch(error => {
          console.error('Erreur lors du chargement des messages :', error);
          throw error;
        });
    },
    AddUser() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const url = `https://edu.tardigrade.land/msg/protected/channel/${this.server.id}/user/${this.valeurInput}`;
      console.log(this.server.id, this.valeurInput)
      const params = {
        id: this.server.id,
        user: this.valeurInput  
      }
      axios.put(url,params, { headers })
        .then(response => {
          console.log('add user !');
          this.server.users.push(this.valeurInput)
        }).then(
            this.auth.getServer()
          )
        .catch(error => {
          console.error('Erreur lors de ajout de user :', error);
          throw error;
        });
      },
    deleteUser(users) {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const url = `https://edu.tardigrade.land/msg/protected/channel/${this.server.id}/user/${users}`;
      
      axios.delete(url, { headers })
        .then(response => {
          console.log('delete user !');
          this.server.users.pop(users)
          this.auth.getServer()
        })
        .catch(error => {
          console.error('Erreur lors de suppression de user :', error);
          throw error;
        });
      },
    sendMessage() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const url = `https://edu.tardigrade.land/msg/protected/channel/${this.server.id}/message`;
      const data = { Text: this.newMessage };
      console.log(data)
      axios.post(url, data, { headers })
        .then(response => {
          console.log('Message envoyé !');
          console.log(this.messageChannel);
          this.messageChannel.push({content: {Text: this.newMessage}, timestamp: Date.now(), author: this.auth.user, channel_id: this.server.id})
          console.log("channel ac" , this.messageChannel);
          this.auth.getMessage(this.server)
          this.auth.getServer()
          this.$nextTick(() => {
            const chatMessages = this.$refs.chatMessages;
            chatMessages.scrollTop = chatMessages.scrollHeight;
          });
          
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi du message :', error);
          throw error;
        });
    }
  },    
};
  </script>

  <style scoped>
    .containerChat {
        display: flex;
        flex-direction: row;
        padding: 20px;
        height: 100%;
        background-color: aqua;
    }
    .containerChat >div {
        margin-right: 20px;
        width: 80%;
        display: flex;
        flex-direction: column;
        background-color: burlywood;
    }
    .containerChat >div:nth-child(2){
      display: flex;
      flex-direction: column;
      width: 20%;
    }
    
.message-info{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
}
.message-info p{
    padding-right: 10px;
}
.server-info {
  padding: 10px;
}

.server-messages {
  flex-grow: 1;
  overflow-y: scroll;
  height: 40vw;
  padding: 10px;
}

.server-messages h3 {
  font-size: 16px;
  font-weight: bold;
}

.server-messages ul {
  list-style: none;
  margin: 0px 0px;
  padding: 0;
}

.server-messages li {
  margin-bottom: 10px;
}

.server-users {
  padding: 10px;
}

.server-users h2 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.server-users input {
  margin-right: 10px;
}

.server-users button {
  background-color: #7289da;
  color: #fff;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

.server-users ul {
  list-style: none;
  margin: 20px 0px;
  padding: 0;
}

.server-users li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.server-users button {
  margin-right: 10px;
}

.server-chat {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;
}
.server-chat input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
}

.server-chat button {
  background-color: #7289da;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin-top: 0px;
  font-size: 16px;
  cursor: pointer;
}

  </style>