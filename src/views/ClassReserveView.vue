<template>
  <div>
    <h1 class="h3">Clases Reservadas</h1>
    <v-container>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12 sm4 md3 v-for="item in main_courses" :key="item.id">
          <v-card>
            <v-img
              max-height="297px"
              v-bind:src="
                item.url != ''
                  ? item.url
                  : 'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc='
              "
            >
            </v-img>
            <v-card-title class="text-center">
              <h5>{{ item.name }}</h5>
            </v-card-title>
            <v-card-text>
              Profesor: <strong>{{ item.profesor }}</strong>
            </v-card-text>

            <v-card-text>
              Fecha: <strong> {{ item.fecha }} </strong>
            </v-card-text>
            <v-card-text>
              Hora: <strong>{{ item.hora }}</strong>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="black"
                normal
                dark
                rounded
                @click="CancelClass(item.internal_id)"
              >
                Cancelar Reserva
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5">
          ¿Confirmas que deseas cancelar la clase?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" normal dark rounded @click="dialog = false">
            No
          </v-btn>
          <v-btn color="black" normal dark rounded @click="ConfirmCancel()">
            Sí
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="primary">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="black"
          normal
          dark
          rounded
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      main_courses: [],
      dialog: false,
      snackbar: false,
      cancelId: 0,
      text: "",
      timeout: 2000,
    };
  },
  methods: {
    ...mapActions(["get_taken_courses", "get_courses", "delete_reservation"]),
    async loadCourses() {
      var usuarioId = this.$store.state.userId;

      this.get_taken_courses(usuarioId).then((res) => {
        this.get_courses();
      });
    },
    loadReservations() {
      var user_courses = this.$store.state.taken_courses;
      var courses = this.$store.state.courses;
      var ids = [];

      user_courses.forEach((user_course) => {
        courses.forEach((course) => {
          if (course.id == user_course.CursosId) {
            if (!ids.includes(course.id)) {
              ids.push(course.id);
              course.internal_id = user_course.id;
              this.main_courses.push(course);
            }
          }
        });
      });
    },
    CancelClass(id) {
      this.cancelId = id;
      this.dialog = true;
    },
    ConfirmCancel() {
      this.delete_reservation(this.cancelId).then(() => {
        this.dialog = false;
        this.text = "Clase Cancelada!";
        this.snackbar = true;

        // Se limpia el listado antes de volver a cargar los datos
        this.main_courses = [];
        this.loadCourses();
      });
    },
  },
  mounted() {
    this.loadCourses();
  },
  watch: {
    "$store.state.courses": function () {
      this.loadReservations();
    },
  },
};
</script>

<style></style>
