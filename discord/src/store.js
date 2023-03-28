import {defineStore} from 'pinia'
import axios from 'axios';

export const useAuthStore = defineStore("server",{
state : () => ({
    server: null,
    currentMessage: null,
}),
actions : {
    async getServer() {
        await fetch('https://edu.tardigrade.land/msg/protected/user/channels', {
            method : 'GET',
            headers: { 
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
          })
          .then(result => result.json())
          .then(async (servers) => {
            console.log(servers);
            this.server = servers;
            localStorage.setItem('servers', JSON.stringify(this.server));
        })
    },
    async getMessage(server) {
        this.selectedServer = server // Met à jour le serveur sélectionné
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const url = `https://edu.tardigrade.land/msg/protected/channel/${server.id}/messages/0`;
        // Charger les messages du canal spécifié à partir du backend
        axios.get(url, { headers })
          .then(response => {
            console.log('Messages chargés !');
            this.messageChannel = response.data;
            this.currentMessage = response.data;
            console.log(this.messageChannel)
          })
          
          .catch(error => {
            console.error('Erreur lors du chargement des messages :', error);
            throw error;
          });
  },
   
}
})
