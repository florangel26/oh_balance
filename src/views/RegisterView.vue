<template>
  <div>
    <h1 class="text-center mt-5">Ingresa tus datos para registrarte</h1>

    <v-form v-model="valid" ref="formRegister">
      <v-row justify="center">
        <v-col cols="8" md="4">
          <v-text-field v-model="user.name" label="Nombre" :rules="nameRules" />
          <v-text-field
            v-model="user.email"
            label="Email"
            :rules="emailRules"
          />
          <v-text-field
            v-model="user.password"
            label="Password"
            :rules="passwordRules"
          />
          <v-text-field
            v-model="user.repassword"
            label="Confirmpassword"
            :rules="repasswordRules"
          />
          <v-btn
            color="blue darken-1"
            rounded
            class="mr-2"
            :disabled="!valid"
            @click="registerUser"
            >Registrar</v-btn
          > 
    
          <v-btn color="black" normal dark rounded @click="reset">Borrar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default {
  data() {
    return {
      valid: false,
      user: {
        email: "",
        password: "",
        repassword: "",
        name: "",
      },
      emailRules: [
        (v) => (v && !!v.trim()) || "Escribe algo, no espacios!",
        (v) => !!v || "No existe",
        (v) =>
          /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) ||
          "Formato de email incorrecto",
      ],
      passwordRules: [
        (v) => (v && v.length > 5) || "Contraseña sobre 6 carácteres",
        (v) => !!v || "No existe",
      ],
      repasswordRules: [
        (v) => v === this.user.password || "No coinciden las contraseñas",
        (v) => !!v || "No existe",
      ],
      nameRules: [
        (v) => !!v || "No existe",
        (v) => (v && v.length > 5) || "Debe ser sobre 6 carácteres",
      ],
    };
  },
  methods: {
    async registerUser() {
      try {
      await createUserWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );
        confirm('Registrado correctamente!');
        this.$router.push('/ClassReserve');
      } catch (error) {
        console.log(error.message);
      }
    },

    reset() {
      this.$refs.formRegister.reset();
    },
  },
};
</script>