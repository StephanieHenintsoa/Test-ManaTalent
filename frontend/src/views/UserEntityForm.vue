<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">
        {{ isEdit ? "Modifier une association" : "Créer une nouvelle association" }}
      </h1>
  
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block font-medium">ID Utilisateur :</label>
          <input
            v-model="form.userId"
            type="number"
            class="border p-2 w-full"
            required
          />
        </div>
  
        <div>
          <label class="block font-medium">ID Entité :</label>
          <input
            v-model="form.entityId"
            type="number"
            class="border p-2 w-full"
            required
          />
        </div>
  
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          {{ isEdit ? "Mettre à jour" : "Créer" }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "UserEntityForm",
    data() {
      return {
        form: {
          userId: "",
          entityId: ""
        },
        isEdit: false,
        id: null
      };
    },
    async created() {
      this.id = this.$route.params.id;
      this.isEdit = !!this.id;
  
      if (this.isEdit) {
        const res = await axios.get(`http://localhost:3000/api/user-entities/${this.id}`);
        this.form.userId = res.data.id_user;
        this.form.entityId = res.data.id_entity;
      }
    },
    methods: {
      async handleSubmit() {
        if (this.isEdit) {
          await axios.put(`http://localhost:3000/api/user-entities/${this.id}`, this.form);
        } else {
          await axios.post("http://localhost:3000/api/user-entities", this.form);
        }
        this.$router.push("/user-entities");
      }
    }
  };
  </script>
  