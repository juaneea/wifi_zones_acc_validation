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
      <div
        v-if="errors.notSame && !successMessage"
        class="flex text-red-600 items-center justify-center mt-5"
      >
        {{ errors.notSame }}
        <!-- Agrega aquí el código del icono y el mensaje que deseas mostrar -->
      </div>
    </div>

    <div
      v-if="successMessage"
      class="flex text-green-600 items-center justify-center mt-5"
    >
      <svg
        class="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
      <span>{{ successMessage }}</span>
    </div>

    <div v-if="!successMessage" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" ref="form" @submit.prevent="handleSubmit">
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Contraseña</label
            >
          </div>
          <div class="mt-2 relative">
            <input
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
            />
            <span
              class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              @click="togglePasswordVisibility(0)"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-5a1 1 0 11-1-1 1 1 0 011 1zm1.64-4.17a4.5 4.5 0 00-6.36 0L10 9.7l1.64-1.64a4.5 4.5 0 000-6.36z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
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
          <div class="mt-2 relative">
            <input
              id="password"
              name="password"
              :type="showPasswordConfirmation ? 'text' : 'password'"
              v-model="form.passwordConfirmation"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
            />
            <span
              class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              @click="togglePasswordVisibility(1)"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-5a1 1 0 11-1-1 1 1 0 011 1zm1.64-4.17a4.5 4.5 0 00-6.36 0L10 9.7l1.64-1.64a4.5 4.5 0 000-6.36z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
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
      isLoading: false,
      successMessage: null,
      showPassword: false,
      showPasswordConfirmation: false,
      token: null,
      form: {
        password: "",
        passwordConfirmation: "",
      },
      errors: {
        password: null,
        passwordConfirmation: null,
        notSame: null,
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
    togglePasswordVisibility(type) {
      if (type === 0) {
        this.showPassword = !this.showPassword;
      } else {
        this.showPasswordConfirmation = !this.showPasswordConfirmation;
      }
    },
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
        this.successMessage = "Contraseña restablecida con éxito";
      } catch (e) {
        const errors = e.response.data;
        this.errors.passwordConfirmation = errors.password_confirmation
          ? errors.password_confirmation[0]
          : null;
        this.errors.password = errors.password ? errors.password[0] : null;
        if (errors.non_field_errors) {
          this.errors.notSame = errors.non_field_errors[0];
        }
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
