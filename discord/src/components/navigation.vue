<script>
import axios from 'axios';
import ChatLayout from './ChatLayout.vue';
import ServerInfo from './ServerInfo.vue'
import {useAuthStore} from '../store.js';
import  Channel  from '../components/channel/channel.vue';
import { watch } from 'vue';
  const servers = JSON.parse(localStorage.getItem('servers'));
  const token = localStorage.getItem('token');
  
  export default {
    components: {
      ServerInfo,
      Channel
    },
    name: 'ServerList',
    data() {
      return {
    
        auth: useAuthStore(),
        selectedServer: null,
        messageChannel: Object,
        servers: servers || [],
      };
    },
    
   
    methods: {
     
      
      selectServer(server) {
        this.isConnected =false;
        this.selectedServer = server // Met à jour le serveur sélectionné
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const url = `https://edu.tardigrade.land/msg/protected/channel/${server.id}/messages/0`;
        // Charger les messages du canal spécifié à partir du backend
        axios.get(url, { headers })
          .then(response => {
            console.log('Messages chargés !');
            this.messageChannel = response.data;
            console.log(this.messageChannel)
            
          })
          
          .catch(error => {
            console.error('Erreur lors du chargement des messages :', error);
            throw error;
          });
      },
      
    }
  };
  </script>
<template>
  <div className="container">
    <div class="server-list">
      <Channel/>
      <h2>Servers</h2>
      <ul>
        <li  v-for="server in servers" :key="server.id"  @click="selectServer(server)">
          <img :src="server.im" />
          <div class="server-info">
            <h3>{{ server.name }}</h3>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="chat">
    <ServerInfo :server="selectedServer" :message-channel="messageChannel"  /> 
  </div>
  

  </template>
  


  
  <style scoped>
  .container{
    display:flex;
    flex-direction: column;
    width: 15%;
  }
  .server-list {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #36393f ;
  }
  .chat{
    display: flex;
    flex-direction: column;
    width: 85%;
    padding: 20px;
    background-color: #fff ;
    color: black;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50%;
  }
  
  .server-info {
    display: flex;
    flex-direction: column;
  }
  
  h3 {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }
  
  p {
    margin: 0;
  }
  </style>
  