<template>
    <div class="user-form">
      <h3>{{ user && user.id ? 'Modifier' : 'Créer' }} un utilisateur</h3>
      <form @submit.prevent="submitForm">
        <div>
          <label>Nom d'utilisateur:</label>
          <input v-model="form.username" required/>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="form.email" required/>
        </div>
        <div>
          <label>Mot de passe:</label>
          <input type="password" v-model="form.password" :required="!user"/>
        </div>
        <button type="submit">Enregistrer</button>
        <button type="button" @click="$emit('cancel')">Annuler</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
      user: Object
    },
    data() {
      return {
        form: {
          username: "",
          email: "",
          password: ""
        }
      };
    },
    watch: {
      user: {
        immediate: true,
        handler(newUser) {
          if (newUser) {
            this.form.username = newUser.username;
            this.form.email = newUser.email;
            this.form.password = ""; 
          }
        }
      }
    },
    methods: {
      submitForm() {
        if (this.user && this.user.id) {
          axios.put(`http://localhost:3000/api/users/${this.user.id}`, this.form)
            .then(() => this.$emit('saved'))
            .catch(err => console.error(err));
        } else {
          axios.post("http://localhost:3000/api/users", this.form)
            .then(() => this.$emit('saved'))
            .catch(err => console.error(err));
        }
      }
    }
  };
  </script>
  <style scoped>
.user-form {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #e7dfdf;
  color: white; /* ✅ rend tout le texte en blanc */
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.user-form div {
  margin-bottom: 10px;
}
</style>

  