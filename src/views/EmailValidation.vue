<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <div v-if="success === true" style="text-align: center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="green"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="200"
        height="200"
        style="margin: 0 auto"
      >
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
      <p>Su cuenta fue verificada exitosamente!</p>
    </div>
    <div v-else-if="success === false" style="text-align: center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="red"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="200"
        height="200"
        style="margin: 0 auto"
      >
        <path d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <p>
        Ocurrió un error al verificar su cuenta, por favor inténtelo de nuevo
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "EmailValidation",
  data() {
    return {
      token: null,
      success: null,
    };
  },
  created() {
    this.token = this.$route.query.token;
    this.verify();
  },
  methods: {
    async verify() {
      const data = {
        token: this.token,
      };
      try {
        const response = await axios.post(
          "http://68.183.110.5:8000/users/verify/",
          data,
          {
            headers: { "Accept-Language": "es-VE" },
          }
        );
        if (response.status === 200) {
          this.success = true;
        }
      } catch (e) {
        this.success = false;
      }
    },
  },
};
</script>
