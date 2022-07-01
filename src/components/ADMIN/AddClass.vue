<template>
  <div class="container">
    <!-- tabla entera -->
    <v-data-table :headers="headers" :items="Class" class="elevation-1" >
      <!-- activador que muestra lo top de la tabla-->
      <template v-slot:top >
        <v-toolbar flat>
          <v-toolbar-title >Clases Activas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- Modal que activa el nueva clase-->
          <!-- v-model me hace la conexion para atrapar los datos-->
          <v-dialog v-model="dialog" max-width="500px" >
            <!-- v-slot me imprime el boton para agregar nueva clase y se coloca el v-bind y v-on-->
            <template v-slot:activator="{ on, attrs }" >
              <v-btn color="black" normal dark rounded v-bind="attrs" v-on="on">
                Agregar Clase
              </v-btn>
            </template>
            <v-card >
              <v-card-title >
                <span class="text-h5">Nueva Clase</span>
              </v-card-title>
              <v-card-text >
                <v-container >
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Clase"
                      ></v-text-field>
                    </v-col>
                     <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.url"
                        label="Url"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.teacher"
                        label="Profesor"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.enroll"
                        label="Inscritos"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.share"
                        label="Cupos"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.date"
                        label="Fecha"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.time"
                        label="Hora"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" normal dark rounded text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="black" normal dark rounded text @click="addClassForm()">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title
                >Estas seguro que quieres eliminar esta clase?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="black"
                  normal
                  dark
                  rounded
                  text
                  @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="black"
                  normal
                  dark
                  rounded
                  text
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    <!-- v-slot me imprime los iconos del editar y borrar-->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  
    {{addClass}}
  </div>
  
  
</template>

<script>
import{ mapActions, mapState}  from 'vuex';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
   
    headers: [
      {
        text: "Clase",
        align: "start",
        value: "name",
      },
      { text: "Profesor", value: "teacher" },
      { text: "Inscritos", value: "enroll" },
      { text: "Cupos", value: "share" },
      { text: "Fecha", value: "date" },
      { text: "Hora", value: "time" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    Class: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      teacher: "",
      enroll: 0,
      share: 0,
      date: "",
      time: 0,
      url: "",
    },
    defaultItem: {
      name: "",
      teacher: "",
      enroll: 0,
      share: 0,
      date: "",
      time: 0,
      url: "",
    },
  }),

  computed: {
      ...mapState(['addClass'])
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
      ...mapActions (['add_class']),
      addClassForm(){
          this.add_class(this.editedItem)
      },
     
    editItem(item) {
      this.editedIndex = this.Class.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.Class.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.Class.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.Class[this.editedIndex], this.editedItem);
      } else {
        this.Class.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
.container {
  margin-top: 50px;
}
</style>