<template>
  <div class="container">
    <v-card>
      <v-card-title class="title">
        <span class="text-h4">CLASES ACTIVAS</span>
        <add-class></add-class>
      <router-view></router-view>
      </v-card-title>
      </v-card>
    </div>
</template>
<script>
import AddClass from "@/components/ADMIN/AddClass.vue";

export default {
  name: "AdminView",
  components: {
    AddClass,
  },
};
</script>

<style>
span{
display: block;
margin: 0 auto;
}
</style>
