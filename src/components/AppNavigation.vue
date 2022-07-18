<template>
  <div>
    <!-- navegacion -->
    <v-overlay :value="drawer" z-index="zIndex"> </v-overlay>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      dark
      :style="{ center: $vuetify.application.top + 'px', zIndex: 7 }"
    >
      <v-list max-height="100%">
        <v-list-item @click="goToReserve()">
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>
          Reservar Clase
        </v-list-item>
        <v-list-item @click="goToMyReserve()">
          <v-list-item-icon> <v-icon>mdi-bell</v-icon> </v-list-item-icon>Clases
          Reservadas
        </v-list-item>
        <v-list-item @click="goToMyHome()">
          <v-list-item-icon> <v-icon>mdi-home</v-icon> </v-list-item-icon>En
          Casa</v-list-item
        >
        <div class="center">
          <v-btn depressed to="/Admin" rounded color="black" v-if="esAdmin"
            >Administrador</v-btn
          >
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="grey darken-4" dark>
      <v-btn text @click="drawer = !drawer" v-if="user"
        ><v-app-bar-nav-icon></v-app-bar-nav-icon
      ></v-btn>
      <v-toolbar-title class="hidden-sm-and-down">
        <v-btn to="/" rounded color="black"> <h1>Oh! Balance</h1> </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- botones -->
      <v-btn
        rounded
        color="grey darken-3"
        class="btn btn-primary mr-2"
        to="/login"
        v-if="!user"
        >Ingresa</v-btn
      >
      <v-btn
        rounded
        color="grey darken-3"
        class="btn btn-primary mr-3"
        to="/register"
        v-if="!user"
        >Registrate</v-btn
      >

      <v-btn rounded @click="offLogout" color="grey darken-3 " dark v-if="user">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { mapActions } from "vuex";

export default {
  name: "AppNavigation",

  data() {
    return {
      drawer: false,
      user: null,
      esAdmin: false,
    };
  },
  methods: {
    ...mapActions(["saveUser"]),
    goToReserve() {
      this.$router.push("/ListReserve");
    },
    goToMyReserve() {
      this.$router.push("/ClassReserve");
    },
    goToMyHome() {
      this.$router.push("/ForHome");
    },
    async offLogout() {
      await signOut(auth);
      this.$router.push("/Login");
    },
  },
// usuario admin
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;

      if (user != null) {
        this.$store.state.userId = user.uid;
        this.saveUser(user.email ?? "");
        this.esAdmin = this.$store.getters.EsAdministrador;
      }
    });
  },
  // acceso al DOM
  mounted() {
    this.esAdmin = this.$store.getters.EsAdministrador;
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Courgette", cursive;
}
</style>
