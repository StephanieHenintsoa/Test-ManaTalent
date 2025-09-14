<template>
  <div id="app">
    <div class="app-layout">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main Content -->
      <div class="main-content">
        <router-view />

        <!-- Footer -->
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

export default {
  name: "App",
  components: {
    Sidebar,
    Footer
  }
}
</script>

<style src="./css/app.css"></style>
