<template>
  <div>
    <add-class></add-class>
  
  <router-view></router-view>
   
        
    </div>
</template>
<script>
import AddClass from '@/components/ADMIN/AddClass.vue';

export default {
    name: 'AdminView',
 
    components:{

   AddClass
    },
    

}
</script>

<style>

</style>