<template>
  <div>
      <!-- AGREGAR CLASES AL LISTADO -->
      <v-row justify="center" class="mt-4">
        <v-dialog persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="ml-5">
                    Agregar clase
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Agregando clase</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Nombre"
                                    required
                                ></v-text-field>
                            </v-col>
                             <v-col cols="12">
                                <v-text-field
                                    label="Nombre Profesor"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="URL de la Imagen de la clase"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Cupos de la clase"
                                    type="number"
                                    required
                                    min="0"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Inscritos en la clase"
                                    type="number"
                                    required
                                    min="0"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Fecha"
                                    type="number"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Hora"
                                    type="number"
                                ></v-text-field>
                            </v-col>
                            
                            <div id="formOptions">
                                <v-btn
                                    color="success"
                                    class="mr-4">
                                    Agregar
                                </v-btn>
                                </div>
                                <div id="formOptions">
                                <v-btn
                                    color="success"
                                    class="mr-4"
                                    @click="back">
                                    Cancelar
                                </v-btn>
                        
                            </div>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>

  </div>
</template>

<script>
export default {
    name: 'AddClass',
    data() {
        return {
            menu: false,
        }},
        methods: {
            back() {
                this.$router.push('/ListReserveview');
            }
        },
}
</script>

<style>
    .admin{
        font-size: 40px;
        margin-top: 15px;
        text-align: center;
    }
</style>