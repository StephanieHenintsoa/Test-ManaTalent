<template>
    <div class="entity-form">
      <h3>{{ entity && entity.id ? 'Modifier' : 'Créer' }} une entité</h3>
      <form @submit.prevent="submitForm">
        <div>
          <label>Nom de l'entité:</label>
          <input v-model="form.name_entity" required/>
        </div>
        <div>
          <label>Description:</label>
          <input type="text" v-model="form.description" required/>
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
      entity: Object
    },
    data() {
      return {
        form: {
          name_entity:"",
          description:""
        }
      };
    },
    watch: {
      entity: {
        immediate: true,
        handler(newEntity) {
          if (newEntity) {
            this.form.name_entity = newEntity.name_entity;
            this.form.description = newEntity.description;
          }
        }
      }
    },
    methods: {
      submitForm() {
        if (this.entity && this.entity.id) {
          axios.put(`http://localhost:3000/api/entities/${this.entity.id}`, this.form)
            .then(() => this.$emit('saved'))
            .catch(err => console.error(err));
        } else {
          axios.post("http://localhost:3000/api/entities", this.form)
            .then(() => this.$emit('saved'))
            .catch(err => console.error(err));
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .user-form {
    margin-top: 15px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  .user-form div {
    margin-bottom: 10px;
  }
  </style>
  