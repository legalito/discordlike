<template>
    <button @click="showModal = true">Ouvrir la modal</button>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h1>Créer un nouveau channel</h1>
        <form @submit.prevent="createChannel">
          <label>Nom du channel:
            <input type="text" v-model="channelName" required>
          </label>
          <label>Couleur du channel:</label>
          <div class="palette"  v-for="(palette, index) in palettes" :key="index">
            <div>{{ palette.name }}</div>
            <div v-for="(color, index) in palette.colors" :key="index">
              <div
                class="palette-color"
                :style="{ backgroundColor: color }"
                @click="img = color"
              ></div>
            </div>
          </div>
          <button type="submit">Créer</button>
        </form>
        <button @click="showModal = false">Fermer la modal</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  import { useAuthStore } from '../../store.js';

  export default {
    data() {
      return {
        showModal: false,
        name: 'Nom de l\'élément',
        img:'',
        channelName: '',
        auth: useAuthStore(),
        palettes: [
        {
          name: 'Palette 1',
          colors: ["#fef6e4", "#172c66", "#f582ae", "#8bd3dd", "#f3d2c1"],
        },
        {
          name: 'Palette 2',
          colors: ["#55423d", "#fffffe", "#ffc0ad", "#e78fb3", "#9656a1"],
        },
      ],
      };
    },
    methods: {
      
      createChannel() {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const url = 'https://edu.tardigrade.land/msg/protected/channel';
        const data = { name: this.channelName, img: this.img};
        console.log(data)
        axios.put(url, data, { headers })
          .then(response => {
            console.log('Channel créé !');
            console.log(response.data);
            this.showModal = false ;
            this.auth.getServer()
          })
          .catch(error => {
            console.error('Erreur lors de la création du channel :', error);
            throw error;
          });
      }
    }
  };
  </script>

<style>
.palette{
  display: flex;
  flex-direction: row;
}
.palette-color {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    display: inline-block;
  }
  
  .selected-color {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background-color: black;
  padding: 20px;
  height: 35vw;
  width: 35vw;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  text-align: center;
  color: #fff;
  border-radius: 25px;
  align-items: center;
}
.modal-content label{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.modal-content button {
  background-color: #7289da;
  color: #fff;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  width: fit-content;
  border-radius: 10px;
  transition: 0.5s;
  margin: 50px;
}
.modal-content button:hover {
  transition: 0.1s;
  background-color: #5f73bc;
  transform: translateY(-2px);
}

button {
  margin-top: 10px;
}
</style>
  