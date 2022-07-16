<template>
  <div class="container">
    <!-- tabla entera -->
    <v-simple-table >
      <!-- activador que muestra lo top de la tabla-->
      <template v-slot:top>
        <v-toolbar>
          <!-- Modal que activa el nueva clase-->
          <!-- v-model me hace la conexion para atrapar los datos-->
          <v-dialog v-model="dialog" max-width="500px">
            <!-- v-slot me imprime el boton para agregar nueva clase -->
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                block
                class="btn"
                color="black"
                normal
                dark
                rounded
                v-bind="attrs"
                v-on="on"
              >
                Agregar Clase
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Nueva Clase</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Clase"
                        :rules="textRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.url"
                        label="Url"
                        :rules="textRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.profesor"
                        label="Profesor"
                        :rules="textRules"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.cupos"
                        label="Cupos"
                        :rules="textRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.fecha"
                        label="Fecha"
                        :rules="textRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.hora"
                        label="Hora"
                        :rules="textRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn color="black" normal dark rounded text @click="close()">
                  Cancel</v-btn
                >
                <v-btn
                  color="black"
                  normal
                  dark
                  rounded
                  text
                  @click="addClassForm()"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-simple-table width="100%" >
          <template  v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Clase</th>
                <th class="text-left">Profesor</th>
                 <th class="text-left">Cupos</th>
                <th class="text-left">Fecha</th>
                <th class="text-left">Hora</th>
              </tr>
            </thead>
            
            <tbody>
              <tr v-for="editedItem in Class" :key="editedItem.item">
                <td>{{ editedItem.name }}</td>
                <td>{{ editedItem.profesor }}</td>
                <td>{{ editedItem.cupos }}</td>
                <td>{{ editedItem.fecha }}</td>
                <td>{{ editedItem.hora }}</td>
                <td class="text-center">
                  <v-btn
                    color="black"
                    normal
                    dark
                    rounded
                    text
                    @click="delete_Item(editedItem)"
                    >Borrar</v-btn
                  >
                  <v-btn
                    color="black"
                    normal
                    dark
                    rounded
                    text
                    @click="editClass(editedItem)"
                    >Editar</v-btn
                  >
                </td>
                <v-dialog v-model="dialogDelete" max-width="600px">
                  <v-card>
                    <v-card-title
                      >Estas seguro que quieres eliminar esta
                      clase?</v-card-title
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
                        darkrounded
                        text
                        @click="deleteItemConfirm()"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,

    Class: [],
    courses: [],
    editedIndex: -1,
    editedItem: {
      cupos: 0,
      fecha: "",
      hora: "",
      name: "",
      profesor: "",
      url: "",
      id: 0,
       textRules:"",
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
    textRules: [
        (v) => (v && !!v.trim()) || "Datos Necesarios",
    
      ],
  }),
  
  computed: {
    ...mapState(["addClass"]),
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
    ...mapActions(["addItem", "deleteItem", "get_courses", "editItem"]),
    addClassForm() {
      this.dialog = false;

      if (this.editedIndex > -1) {
        this.editItem(this.editedItem); // Es una edicion
      } else {
        this.addItem(this.editedItem); // Es una creacion
      }

      this.loadCourses();
    },
    delete_Item(item) {
      this.editedItem = item;
      this.dialogDelete = true;
    },

    editClass(item) {
      this.editedIndex = this.Class.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItemConfirm() {
      this.dialogDelete = false;
      this.deleteItem(this.editedItem.id);
      this.loadCourses();
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
        Object.assign(this.add_class[this.editedIndex], this.editedItem);
      } else {
        this.Class.push(this.editedItem);
      }
      this.close();
    },
    async loadCourses() {
      this.$store.state.courses = [];

      this.get_courses().then((res) => {
        this.Class = this.$store.state.courses;
      });
    },
  },
  mounted() {
    this.loadCourses();
  },
  watch: {
    "$store.state.courses": function () {
      this.Class = this.$store.state.courses;
    },
  },
};
</script>

<style>
.container {
  margin-top: 50px;
}
@media screen and (max-width: 600px) {
       table {
           width:100%;
       }
       thead {
           display: none;
       }
       tr:nth-of-type(2n) {
           background-color: inherit;
       }
       tr td:first-child {
           background: #f0f0f0;
           font-weight:bold;
           font-size:1.3em;
       }
       tbody td {
           display: block;
           text-align:center;
       }
       tbody td:before {
           content: attr(data-th);
           display: block;
           text-align:center;
       }
}
@media screen and (max-width: 320px) {
     table {
       display: block;
       overflow-x: auto;
     }
}
</style>
