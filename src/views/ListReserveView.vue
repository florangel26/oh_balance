<template>
  <div>
    <h3 class="h3">Clases a Reservar</h3>
    <v-container>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12 sm4 md3 v-for="item in courses" :key="item.id">
          <v-card max-height="613px">
            <v-img
              max-height="297px"
              v-bind:src="
                item.url != ''
                  ? item.url
                  : 'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc='">
            </v-img>
            <v-card-title class="text-center">
              <h4> {{ item.name }}</h4>
            </v-card-title>
            <v-card-text>
              Profesor: <strong>{{ item.profesor }}</strong>
            </v-card-text>
            <v-card-text>
              Cupos: <strong>{{ item.cupos }}</strong>
            </v-card-text>
            <v-card-text>
              Fecha: <strong> {{ item.fecha }} </strong>
            </v-card-text>
            <v-card-text>
              Hora: <strong>{{ item.hora }}</strong>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="black" normal dark rounded 
                v-if="item.available"
                @click="ConfirmarReserva(item.id)"
              >
                Reservar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5"> ¿Confirmas tu reserva a la clase indicada? </v-card-title>
       
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" normal dark rounded @click="dialog = false">
            No
          </v-btn>
          <v-btn color="black" normal dark rounded  @click="Reservar()"> Sí </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="black">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ListReserveview",
  components: {},
  data() {
    return {
      courses: [],
      taken_courses: [],
      dialog: false,
      currentCurso: 0,
      snackbar: false,
      text: "",
      timeout: 500,
    };
  },
  methods: {
    ...mapActions(["reservarCurso", "get_courses", "get_all_taken_courses"]),
    ConfirmarReserva(cursoId) {
      this.currentCurso = cursoId;
      this.dialog = true;
    },
    Reservar() {
      var usuarioId = this.$store.state.userId;

      this.reservarCurso({
        cursoId: this.currentCurso,
        usuarioId: usuarioId,
      }).then(() => {
        this.dialog = false;
        this.text = "Clase Reservada!";
        this.snackbar = true;
      });
    },
    async loadCourses() {
      var usuarioId = this.$store.state.userId;

      this.get_courses().then((res) => {
        this.courses = this.$store.state.courses;

        // Recorremos los cursos para saber por cada uno cuantas reservas hay
        this.courses.forEach((course, index) => {
          
          course.cupos = this.getAvailableSpots(course.id, course.cupos);
        });

        // Recorremos los cursos para saber cuales ya ha tomado el usuario para bloquearle el boton de reserva
        this.courses.forEach((course, index) => {
          course.available = true;

          // Recorremos las reservas
          this.taken_courses.forEach((taken_course, index) => {
            // Aqui validamos si la reserva corresponde al mismo curso
            if (
              course.id == taken_course.CursosId &&
              taken_course.UserId == usuarioId
            ) {
              course.available = false;
            }
          });
        });
      });
    },
    async loadTakenCourses() {
      this.get_all_taken_courses().then((res) => {
        this.taken_courses = this.$store.state.all_taken_courses;
        this.loadCourses();
      });
    },
    getAvailableSpots(courseId, spots) {
      this.taken_courses.forEach((course, index) => {
        if (course.CursosId == courseId) {
          spots -= 1;
        }
      });

     
      return spots;
    },
  },
  mounted() {
    this.loadTakenCourses();
  },
};
</script>

<style>
.h3 {
  text-align: center;
  font-size: 50px;
  margin-top: 40px;
}

.flex {
  margin: 10px;
}
</style>
