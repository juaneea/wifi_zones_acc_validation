<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-auto w-auto"
        src="../assets/colmena.png"
        alt="Logo"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Resetee su contraseña
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" ref="refs">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Contraseña</label
          >
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="body.password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div class="input-errors" v-if="v$.password.$error">Error</div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Confirmar contraseña</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            @click="submit()"
            class="flex w-full justify-center rounded-md bg-yellow-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "ResetPassword",
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      body: {
        password: null,
        confirm_password: null,
        token: null,
      },
      passwordRules: [
        (v) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,64}$/.test(
            v
          ) ||
          "La contraseña debe tener mínimo una mayúscula, una minúscula, un caracter especial y un número",
      ],
    };
  },
  validations() {
    return {
      password: { required },
    };
  },
  created() {
    this.token = this.$route.query.id;
    console.log(this.token);
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.body.password === this.body.confirm_password ||
        "Las contraseñas no coinciden";
    },
  },
  methods: {
    submit() {
      console.log(1);
    },
  },
};
</script>
<style></style>
