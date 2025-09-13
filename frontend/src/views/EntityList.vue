<template>
    <div id="user-page">
      <!-- Sidebar -->
      <Sidebar />
  
      <!-- Contenu principal -->
      <div class="main-content">
        <div class="content-wrapper">
          <div class="header-section">
            <h2>Liste des entités</h2>
            <button class="btn-primary" @click="showCreateForm = true">
              <span>+</span> Ajouter une entité
            </button>
          </div>
  
          <EntiteForm v-if="showCreateForm" @saved="handleSaved" @cancel="showCreateForm = false"/>
  
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom de l'entité</th>
                  <th>Description</th>
                  <th>Détail</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entity in entities" :key="entity.id">
                  <td>{{ entity.id }}</td>
                  <td>{{ entity.name_entity }}</td>
                  <td>{{ entity.description }}</td>
                  <td>
                  <button class="btn" @click="detailEntity(entity.id)">
                    <span>👁</span> Détail
                  </button>
                </td>
                  <td>
                    <button class="btn-edit" @click="editEntity(entity)">
                      <span>✏️</span> Modifier
                    </button>
                    <button class="btn-delete" @click="deleteEntity(entity.id)">
                      <span>🗑️</span> Supprimer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <EntiteForm v-if="editingEntity" :user="editingEntity" @saved="handleSaved" @cancel="editingEntity = null"/>
        </div>
      </div>
  
      <!-- Footer -->
      <!-- <Footer /> -->
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import EntiteForm from "./EntityForm.vue";
  import Sidebar from "../components/Sidebar.vue";
  import Footer from "../components/Footer.vue";
  
  export default {
    components: { EntiteForm, Sidebar, Footer },
    data() {
      return {
        entities: [],
        showCreateForm: false,
        editingEntity: null
      };
    },
    methods: {
      detailEntity(id) {
      this.$router.push(`/api/entities/${id}`);
    },
      fetchEntities() {
        axios.get("http://localhost:3000/api/entities")
          .then(res => this.entities = res.data)
          .catch(err => console.error(err));
      },
      deleteEntity(id) {
        if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
          axios.delete(`http://localhost:3000/api/entities/${id}`)
            .then(() => this.fetchEntities())
            .catch(err => console.error(err));
        }
      },
      editEntity(user) {
        this.editingEntity = { ...user };
      },
      handleSaved() {
        this.showCreateForm = false;
        this.editingEntity = null;
        this.fetchEntities();
      }
    },
    mounted() {
      this.fetchEntities();
    }
  };
</script>  
   