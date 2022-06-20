<template>
  <div>
     <add-class></add-class>
    <h3 class="h3">Clases a Reservar</h3>
     <v-container>
        <v-layout>
            <v-flex xs12 sm4 >
            <v-card>
               <v-img src="@/assets/example.jpg">
                
               </v-img>
               <v-card-title class="text-center">
                    <h5> REAL RYDER</h5>
                </v-card-title>
                <v-card-text>
                 Profesor: <strong>Juan Perez</strong>
                </v-card-text>
                <v-card-text>
                 Cupos: <strong>5/10</strong>
                </v-card-text>
                <v-card-text>
                 Fecha: <strong> 20/06/2022 </strong>
                </v-card-text>
                <v-card-text>
                 Hora: <strong>20:30 </strong>
                </v-card-text>
                <v-card-actions>
                 <v-btn
                color="indigo darken-4"
                text>
               Reservar
            </v-btn>
            </v-card-actions>
            </v-card>
            </v-flex>
        </v-layout>
        </v-container> 
  </div>
</template>


<script>
import AddClass from '@/components/ADMIN/AddClass.vue';

export default {
    name: 'ListReserveview',
    components:{
        AddClass,
    }
}
</script>

<style>
.h3 {
  text-align: center;
  font-size: 50px;
  margin-top: 40px;
}
</style>