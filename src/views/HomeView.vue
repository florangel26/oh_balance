<template >
<div class="home">
    <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
  <br>
  <h1 class="color">Bienvenido al sistema de reservas</h1>
  <img src="@/assets/logogrande.png" class="fondo imagen">
  <div class="us">
     <h2>Mira el clima para que no te tome desprevenido </h2> 
  
      <div>{{ clima }}</div>
      <div>{{ icono}}</div>
  </div>

</div>
</template>


<script>
import axios from "axios";
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://img.freepik.com/foto-gratis/hermosa-joven-pareja-deportiva-trabajando-balon-medicinal-gimnasio_484651-17134.jpg?w=740',
          },
          {
            src: 'https://www.feda.net/wp-content/uploads/2017/09/funcional-training.jpg',
          },
          {
            src: 'https://img.freepik.com/foto-gratis/pareja-muscular-haciendo-tabla-ejercicio-juntos_13339-151107.jpg?w=740',
          },
          {
            src: 'https://as01.epimg.net/deporteyvida/imagenes/2020/08/21/portada/1597993555_784056_1597993862_noticia_normal.jpg',
          },
        ],
         clima: "",
         icono: "",
        prueba: "",
      }
    },
    methods: {
    getWeather() {
      axios
        .get("https://api.gael.cloud/general/public/clima/SCQN")
        .then((result) => {
          
          this.clima =
            "Temperatura: " +
            result.data.Temp +
            " con una humedad de: " +
            result.data.Humedad +
            "º";
        this.icono = "../assets/" + result.data.Icono;
        });
    },
  },
  mounted() {
    this.getWeather();
    this.prueba = localStorage.getItem("user");
  },

  }
  
</script>
<style>
*{
    font-family: 'Poppins', sans-serif;
}
.home{
    width: 100%;
    text-align: center;
}

.color{
    color:black;
    font-size: 50px;
}

.fondo{
    border-radius: 90%;
     max-width: 100%;
    display: inline-block;
    margin-top: 20px;

}
.imagen:hover {
box-shadow: 15px 15px 15px 15px black;

}
.us{
    margin-top: 70px;
}

</style>
