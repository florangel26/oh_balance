<template>
  <div>
     
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
                 Profesor: <strong>PEDRO PEREZ</strong>
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
                color="grey darken-3"
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


export default {
    name: 'ListReserveview',
    components:{
        
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