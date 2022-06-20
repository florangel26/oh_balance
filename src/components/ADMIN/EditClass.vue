<template>
<div>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="ml-5">
                    Editar Clase
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
                                    v-model="name"
                                ></v-text-field>
                            </v-col>
                             <v-col cols="12">
                                <v-text-field
                                    label="Nombre Profesor"
                                    required
                                    v-model="name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="URL de la Imagen de la clase"
                                    required
                                    v-model="url"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Cupos de la clase"
                                    type="number"
                                    v-model.number="availableSpots"
                                    :rules="textRules"
                                    required
                                    min="0"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Inscritos en la clase"
                                    type="number"
                                    v-model.number="registeredUsers"
                                    :rules="studentRules"
                                    required
                                    min="0"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Fecha"
                                    type="number"
                                    required
                                    v-model="courseLength"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Hora"
                                    type="number"
                                    v-model="price"
                                ></v-text-field>
                            </v-col>
                            
                            <div id="formOptions">
                                <v-btn
                                    color="success"
                                    class="mr-4">
                                    Agregar
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

}
</script>

<style>

</style>