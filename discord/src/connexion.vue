<script >
import axios from 'axios';
import { useAuthStore } from './store';
const token = localStorage.getItem('token');


export default {
  data() {
    return {
      username: '',
      password: '',
      token:'',
      servers:[],
    };
  },
  methods: {
    async onSubmit() {
      const url = 'https://edu.tardigrade.land/msg/login';
      const credentials = { username: this.username, password: this.password };
      console.log(credentials)

    
      await axios.post(url, credentials)
        .then(response => {
          console.log('Connexion réussie !');
          console.log(response.data);
          localStorage.setItem('token', response.data.token); 
        }).then(async() => {
          await this.getServer()
          console.log(this.servers)
        })
        },
        async getServer(){
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
            console.log(servers)
            localStorage.setItem('servers', JSON.stringify(servers));

          }
          )
        },
        logout(){
          localStorage.removeItem('token');
          localStorage.removeItem('servers');
          this.servers = [];
        },
        
  }
};

</script>

<template >
  <div >
    <form @submit.prevent="onSubmit">
    <label>
      Email:
      <input type="text" v-model="username" required>
    </label>
    <label>
      Mot de passe:
      <input type="password" v-model="password" required>
    </label>
    <button type="submit">Se connecter</button>
  </form>
  </div>
 
  

</template>


