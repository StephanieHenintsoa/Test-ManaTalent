<script>
import axios from "axios";

export default {
  name: "UserEntityDetail",
  props: ["id"],
  data() {
    return {
      searchId: this.id || "",
      userEntity: null,
      notFound: false,
    };
  },
  methods: {
    async fetchUserEntity() {
      try {
        const res = await axios.get(`http://localhost:3000/api/user-entities/${this.searchId}`);
        this.userEntity = res.data;
        this.notFound = false;
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.notFound = true;
          this.userEntity = null;
        } else {
          console.error("Erreur API:", err);
        }
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
  mounted() {
    if (this.searchId) {
      this.fetchUserEntity();
    }
  },
};
</script>
