<script setup>
  import ChatLayout from './components/ChatLayout.vue';
  import navigation from './components/navigation.vue'
  import connexion from './connexion.vue';
  import channel from './components/channel/channel.vue'

  const token = localStorage.getItem('token');
  const servers = JSON.parse(localStorage.getItem('servers'));

  console.log(token)
  console.log(servers)
</script>

<template>
  <header>
    <div v-if="!token">
      <connexion/>
    </div>
  </header>
  <main>
    <div v-if="token">
      <div class="channel">
        <navigation />
      </div>
    </div>
  </main>
</template>

<style scoped>
header{
  position: absolute;
  z-index: 5;
}
main{
  height: 100vh;
  width: 100vw;
}
main > div{
  height: 100%;
  width: 100%;
}
.salon{
  background-color: #2f3136;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.channel{
  display: flex;
  flex-direction: row;
  height: 100%;
  background-color: #36393f ;
}
.chat{
  background-color: white;
}
.circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: red;
}
.nameserveur{
  color: white;
  font-size: 15px;
  width: 100%;
  text-align: center;
  padding: 1rem;
  
}
</style>
