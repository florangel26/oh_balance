<template>
  <div>
   <edit-class></edit-class>
  <router-view></router-view>
  </div>
</template>

<script>

import EditClass from '@/components/ADMIN/EditClass.vue';

export default {
    name: 'AdminView',
    components:{
   EditClass,
    }

}
</script>

<style>

</style>