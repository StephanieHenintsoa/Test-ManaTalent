<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <p>&copy; {{ currentYear }} ManaTalent. Tous droits réservés.</p>
        </div>
        
        <div class="footer-section">
          <div class="footer-links">
            <a href="#" class="footer-link">Politique de confidentialité</a>
            <a href="#" class="footer-link">Conditions d'utilisation</a>
            <a href="#" class="footer-link">Support</a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    computed: {
      currentYear() {
        return new Date().getFullYear()
      }
    }
  }
  </script>
  
  <style scoped src="../css/footer.css"></style>