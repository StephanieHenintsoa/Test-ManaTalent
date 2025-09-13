<template>
  <div id="page">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Contenu principal -->
    <div class="main-content">
      <div class="content-wrapper">
        <div class="header-section">
          <h2>Liste des utilisateurs</h2>
          <button class="btn-primary" @click="showCreateForm = true">
            <span>+</span> Ajouter un utilisateur
          </button>
        </div>

        <!-- Formulaire création -->
        <UserForm v-if="showCreateForm" @saved="handleSaved" @cancel="showCreateForm = false" />

        <!-- Tableau des utilisateurs -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom d'utilisateur</th>
                <th>Email</th>
                <th>Détail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <button class="btn" @click="detailUser(user.id)">
                    <span>👁</span> Détail
                  </button>
                </td>
                <td>
                  <button class="btn-edit" @click="editUser(user)">
                    <span>✏️</span> Modifier
                  </button>
                  <button class="btn-delete" @click="deleteUser(user.id)">
                    <span>🗑️</span> Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Formulaire édition -->
        <UserForm v-if="editingUser" :user="editingUser" @saved="handleSaved" @cancel="editingUser = null" />
      </div>
    </div>

    <!-- Footer -->
    <!-- <Footer /> -->
  </div>
</template>

<script>
import axios from "axios";
import UserForm from "./UserForm.vue";
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";

export default {
  components: { UserForm, Sidebar, Footer },
  data() {
    return {
      users: [],
      showCreateForm: false,
      editingUser: null
    };
  },
  methods: {
    // Redirection vers UserDetail.vue
    detailUser(id) {
      this.$router.push(`/api/users/${id}`);
    },
    fetchUsers() {
      axios.get("http://localhost:3000/api/users")
        .then(res => this.users = res.data)
        .catch(err => console.error(err));
    },
    deleteUser(id) {
      if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
        axios.delete(`http://localhost:3000/api/users/${id}`)
          .then(() => this.fetchUsers())
          .catch(err => console.error(err));
      }
    },
    editUser(user) {
      this.editingUser = { ...user };
    },
    handleSaved() {
      this.showCreateForm = false;
      this.editingUser = null;
      this.fetchUsers();
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

