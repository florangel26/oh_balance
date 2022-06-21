<template>
  <span>
    <!-- inicio del navbar -->
    <v-overlay :value="drawer" z-index="4"> </v-overlay>
     <!-- navegacion -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      :style="{ top: $vuetify.application.top + 'px', zIndex: 7 }" >
      <v-list>
        <v-list-item @click="goToReserve()"> Reservar Clase </v-list-item>
        <v-list-item @click="goToMyReserve()"> Clases Reservadas </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="grey darken-4" dark>
      <v-btn text @click="drawer = !drawer"
        ><v-app-bar-nav-icon></v-app-bar-nav-icon
      ></v-btn>
      <v-toolbar-title class="hidden-sm-and-down"
        > <h1>Oh! Balance </h1>  </v-toolbar-title>
      <v-spacer></v-spacer>
       <!-- botones -->
      <v-btn rounded color="grey darken-1" class="btn btn-primary mr-2">Ingresa</v-btn>
      <v-btn  rounded color="grey darken-1" class="btn btn-primary mr-3" >Registrate</v-btn>
      <v-btn rounded color="grey darken-1 " dark>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </span>
</template>

<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    goToReserve() {
      this.$router.push("/ListReserve");
    },
    goToMyReserve() {
      this.$router.push("/ClassReserve");
    },
  },
};
</script>

<style>
*{  
    margin: 0;
    padding: 0;
    font-family: 'Courgette', cursive;
}
</style>