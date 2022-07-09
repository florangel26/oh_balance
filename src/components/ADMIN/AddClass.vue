<template>
  <div class="container" >
    <!-- tabla entera -->
    <v-data-table class="elevation-1" >
      <!-- activador que muestra lo top de la tabla-->
      <template v-slot:top >
        <v-toolbar>
          <!-- Modal que activa el nueva clase-->
          <!-- v-model me hace la conexion para atrapar los datos-->
          <v-dialog v-model="dialog" max-width="500px" >
            <!-- v-slot me imprime el boton para agregar nueva clase y se coloca el v-bind y v-on-->
            <template v-slot:activator="{ on, attrs }" > 
              <v-btn block class="btn" color="black" normal dark rounded v-bind="attrs" v-on="on">
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
                      <v-text-field v-model="editedItem.name" label="Clase"></v-text-field>
                    </v-col>
                     <v-col cols="12">
                      <v-text-field v-model="editedItem.url" label="Url"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.teacher" label="Profesor"></v-text-field>
                    </v-col>
                  
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.share" label="Cupos"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.date" label="Fecha"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.time" label="Hora"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
               
                <v-btn color="black" normal dark rounded text @click="close()"> Cancel</v-btn>
                <v-btn color="black" normal dark rounded text @click="addClassForm()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        
        </v-toolbar>
 <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th >Clase</th>
                        <th >Profesor</th>
                        <th >Cupos</th>
                        <th>Fecha</th>
                        <th >Hora</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="editedItem in addClass" :key="editedItem.item">
                        <td>{{ editedItem.name }}</td>
                        <td>{{ editedItem.teacher }}</td>
                        <td>{{ editedItem.share }}</td>
                        <td>{{ editedItem.date }}</td>
                        <td>{{ editedItem.time }}</td>
                        <td class="text-center">
                            <v-btn
                                color="black" normal dark rounded
                                text
                                 @click="delete_Item()">Delete</v-btn>
                            <v-btn color="black" normal dark rounded text>Edit</v-btn>
                        </td>
                          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title>Estas seguro que quieres eliminar esta clase?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" normal dark rounded text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="black" normal darkrounded text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import{ mapActions, mapState}  from 'vuex';
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
   
    
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
      ...mapActions (['add_class' ,'delete_Item']),
      addClassForm(){
      this.dialog = true;
          this.add_class(this.editedItem)
      },
      delete_Item(item){
         this.editedItem = this.Class.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      },
      
    editItem(item) {
      this.editedIndex = this.Class.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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
        Object.assign(this.add_class[this.editedIndex], this.editedItem);
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

