<template>
  <div class="container">
    <!-- AGREGAR CLASES AL LISTADO -->
    <v-data-table
      :headers="headers"
      :items="addClasss"
      sort-by="class"
      class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Clases</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="black"
                normal
                dark
                rounded
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Nueva Clase
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <v-toolbar-title>Clases</v-toolbar-title>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Nombre"
                        required
                        v-model="editedItem.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Nombre Profesor"
                        v-model="editedItem.profesor"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="URL de la Imagen de la clase"
                        required
                        v-model="editedItem.url"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Cupos de la clase"
                        type="number"
                        required
                        :rules="addRules"
                        min="0"
                        v-model.number="editedItem.cupos"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Inscritos en la clase"
                        type="number"
                        :rules="textRules"
                        required
                        min="0"
                        v-model.number="editedItem.inscritos"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Fecha"
                        required
                        v-model="editedItem.fecha"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Hora"
                        v-model="editedItem.hora"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" normal dark rounded text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="black" normal dark rounded text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="650px">
            <v-card>
              <v-card-title>Esta seguro de que quiere eliminar esta clase?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn @click="initialize"> No hay clases activas </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
//para activar el index.js se utiliza metodos y computed
import { mapActions, mapState} from 'vuex';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
   
    headers: [
      {
        text: "Nombre de la clase",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Profesor", value: "profesor" },
      { text: "Cupos", value: "cupos" },
      { text: "Inscritos", value: "inscritos" },
      { text: "Fecha", value: "fecha" },
      { text: "Hora", value: "hora" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    addClasss: [],
    editedIndex: -1,
    editedItem: {
      profesor: "",
      cupos: 0,
      inscritos: 0,
      fecha: "",
      hora: "",
      url: "",
    },
    textRules: [(v) => !!v || 'Field is required'],
    addRules: [
                (v) => !!v || 'Field is required', ],
     
  }),

  computed: {
      ...mapState(["addClasss"]),

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
 
  created() {
    this.initialize();
  },
 
  methods: {
     ...mapActions( ["class_add", "deleteItem","editItem"]),
        classAddForm(){
        this.class_add({...this.addClass}) 
        }, 
        
       initialize() {
      this.addClasss = [];
   },
       editItem(item) {
      this.editedIndex = this.addClasss.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
      deleteItem(item) {
      this.editedIndex = this.addClasss.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
   

    deleteItemConfirm() {
      this.addClasss.splice(this.editedIndex, 1);
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
        Object.assign(this.addClasss[this.editedIndex], this.editedItem);
      } else {
        this.addClasss.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>