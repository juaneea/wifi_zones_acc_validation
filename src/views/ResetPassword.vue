<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-auto w-auto"
        src="../assets/colmena.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Resetee su contraseña
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" ref="form" @submit.prevent="handleSubmit">
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Contraseña</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="form.password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
            />
            <span v-if="errors.password" class="text-red-600">{{
              errors.password
            }}</span>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Confirmación de contraseña</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="form.passwordConfirmation"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
            />
            <span v-if="errors.passwordConfirmation" class="text-red-600">{{
              errors.passwordConfirmation
            }}</span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-yellow-300 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      token: null,
      form: {
        password: "",
        passwordConfirmation: "",
      },
      errors: {
        password: null,
        passwordConfirmation: null,
      },
      rules: {
        password: [
          { required: true, message: "Please enter a password." },
          {
            minLength: 8,
            message: "Password must be at least 8 characters long.",
          },
        ],
        passwordConfirmation: [
          {
            required: true,
            message: "Please confirm your password.",
            validator: (value, callback) => {
              if (value !== this.form.password) {
                callback(new Error("Passwords do not match."));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.token = this.$route.query.token;
  },
  methods: {
    async handleSubmit() {
      const data = {
        token: this.token,
        password: this.form.password,
        password_confirmation: this.form.passwordConfirmation,
      };
      try {
        const response = await axios.post(
          "http://68.183.110.5:8000/users/reset-password/",
          data,
          {
            headers: { "Accept-Language": "es-VE" },
          }
        );
        console.log(response.data);
      } catch (e) {
        const errors = e.response.data;
        this.errors.passwordConfirmation = errors.password_confirmation
          ? errors.password_confirmation[0]
          : null;
        this.errors.password = errors.password ? errors.password[0] : null;
      }
    },
  },
};
</script>

<style>
input:focus {
  outline-color: yellow;
}
</style>
