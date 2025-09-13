<template>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">Assigner une entité à un utilisateur</h2>
      <form @submit.prevent="assignEntity">
        <div class="mb-3">
          <label>User ID</label>
          <input v-model="userId" class="border p-2 w-full" />
        </div>
        <div class="mb-3">
          <label>Entity ID</label>
          <input v-model="entityId" class="border p-2 w-full" />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2">Assigner</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "UserEntityAssign",
    data() {
      return {
        userId: "",
        entityId: "",
      };
    },
    methods: {
      async assignEntity() {
        try {
          await axios.post("http://localhost:3000/api/user-entity/assign", {
            userId: this.userId,
            entityId: this.entityId,
          });
          alert("Entité assignée avec succès !");
        } catch (err) {
          console.error("Erreur assignation :", err);
        }
      },
    },
  };
  </script>
  