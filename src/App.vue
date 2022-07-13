<template>
 <!-- navbar componente reutilizable -->
   <v-app>
       <app-navigation></app-navigation>
       <!-- organiza de manera adecuada los elementos dentro del home -->
        <v-main transition="slide-x-transition">
            <router-view></router-view>
        </v-main>
        </v-app>
    
    
</template>

<script>
 import AppNavigation from '@/components/AppNavigation.vue';


export default {
  name: 'App',
  components:{
   AppNavigation,
  
  }

};
</script>
<style>
 
</style>

