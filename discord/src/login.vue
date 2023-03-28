<template>
  <div class="login">
    <h1>Connexion</h1>
    <form submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" v-model="username" id="username">
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" v-model="password" id="password">
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      // ici, vous pouvez ajouter la logique de connexion en envoyant les données d'identification à un serveur.
      // Par exemple, vous pouvez utiliser Axios pour envoyer une requête POST avec les données d'identification :
      // axios.post('/api/login', { username: this.username, password: this.password })
      //   .then(response => {
      //     // si la connexion est réussie, vous pouvez stocker le jeton JWT dans un cookie ou un local storage
      //     // et rediriger l'utilisateur vers une autre page.
      //   })
      //   .catch(error => {
      //     // si la connexion échoue, vous pouvez afficher un message d'erreur à l'utilisateur
      //   });
      console.log('Envoyer les données d\'identification à un serveur ici');
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 24px;
}

.form-group {
  margin: 20px 0;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
}

button[type="submit"] {
  display: block;
  margin: 20px auto;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
</style>
