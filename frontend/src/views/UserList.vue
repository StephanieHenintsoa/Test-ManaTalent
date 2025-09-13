<template>
  <div id="user-page">
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

        <UserForm v-if="showCreateForm" @saved="handleSaved" @cancel="showCreateForm = false"/>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom d'utilisateur</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
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

        <UserForm v-if="editingUser" :user="editingUser" @saved="handleSaved" @cancel="editingUser = null"/>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
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

<style scoped>
#user-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a192f 0%, #172a45 100%);
}

.main-content {
  flex: 1;
  margin-left: 270px; /* Largeur sidebar + marge */
  margin-bottom: 80px; /* Hauteur footer + marge */
  padding: 0;
  background: transparent;
  overflow-y: auto;
}

.content-wrapper {
  padding: 30px;
  max-width: calc(100vw - 320px); /* Largeur totale - sidebar - marges */
  min-height: calc(100vh - 160px); /* Hauteur écran - footer - marges */
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 25px 30px;
  background: rgba(17, 34, 64, 0.9);
  border-radius: 15px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(100, 255, 218, 0.1);
  border: 1px solid rgba(100, 255, 218, 0.1);
  backdrop-filter: blur(10px);
}

.header-section h2 {
  color: #64ffda;
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
  letter-spacing: -0.5px;
}

.btn-primary {
  background: linear-gradient(135deg, #64ffda 0%, #4fc3f7 100%);
  color: #0a192f;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 20px rgba(100, 255, 218, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 8px 35px rgba(100, 255, 218, 0.4),
    0 0 30px rgba(100, 255, 218, 0.3);
}

.btn-primary:active {
  transform: translateY(-1px) scale(0.98);
}

.table-container {
  background: rgba(17, 34, 64, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 4px 12px rgba(100, 255, 218, 0.1);
  border: 1px solid rgba(100, 255, 218, 0.15);
  backdrop-filter: blur(10px);
  position: relative;
}

.table-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #64ffda, #4fc3f7, #64ffda);
  opacity: 0.8;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
}

th {
  background: linear-gradient(135deg, #64ffda 0%, #4fc3f7 100%);
  color: #0a192f;
  padding: 20px 24px;
  text-align: left;
  font-weight: 700;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
}

th:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 1px;
  background: rgba(10, 25, 47, 0.3);
}

td {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
  color: #e6f1ff;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
}

tr:hover {
  background: linear-gradient(90deg, 
    rgba(100, 255, 218, 0.08), 
    rgba(79, 195, 247, 0.05),
    rgba(100, 255, 218, 0.08)
  );
  transform: translateX(5px);
}

tr:hover td {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
}

.btn-edit, .btn-delete {
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-right: 12px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
}

.btn-edit {
  background: rgba(79, 195, 247, 0.15);
  color: #4fc3f7;
  border: 1px solid rgba(79, 195, 247, 0.3);
}

.btn-edit:hover {
  background: rgba(79, 195, 247, 0.25);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(79, 195, 247, 0.3);
}

.btn-delete {
  background: rgba(255, 107, 107, 0.15);
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.btn-delete:hover {
  background: rgba(255, 107, 107, 0.25);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(255, 107, 107, 0.3);
}

/* Animation d'apparition des lignes */
tbody tr {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

tbody tr:nth-child(1) { animation-delay: 0.1s; }
tbody tr:nth-child(2) { animation-delay: 0.2s; }
tbody tr:nth-child(3) { animation-delay: 0.3s; }
tbody tr:nth-child(4) { animation-delay: 0.4s; }
tbody tr:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .main-content {
    margin-left: 80px;
  }
  
  .content-wrapper {
    max-width: calc(100vw - 130px);
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    margin-bottom: 60px;
  }
  
  .content-wrapper {
    padding: 20px 15px;
    max-width: 100vw;
    min-height: calc(100vh - 120px);
  }
  
  .header-section {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 20px;
  }
  
  .header-section h2 {
    font-size: 24px;
  }
  
  .table-container {
    border-radius: 15px;
    overflow-x: auto;
  }
  
  table {
    min-width: 600px;
  }
  
  th, td {
    padding: 15px 12px;
    font-size: 14px;
  }
  
  .btn-edit, .btn-delete {
    padding: 8px 14px;
    font-size: 12px;
    margin-bottom: 5px;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 15px 10px;
  }
  
  .header-section {
    padding: 15px;
  }
  
  .header-section h2 {
    font-size: 20px;
  }
  
  th, td {
    padding: 12px 8px;
    font-size: 13px;
  }
}

/* Scrollbar personnalisée */
.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: rgba(10, 25, 47, 0.5);
}

.main-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #64ffda, #4fc3f7);
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #4fc3f7, #64ffda);
}
</style>