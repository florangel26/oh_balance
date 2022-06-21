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
  <h1 class="color">Bienvenido a la comunidad de reservas de</h1>
  <img src="@/assets/logogrande.png" class="fondo">
</div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://lasaludquequieres.cl/wp-content/uploads/2020/02/GettyImages-840886788.jpg',
          },
          {
            src: 'https://www.feda.net/wp-content/uploads/2017/09/funcional-training.jpg',
          },
          {
            src: 'https://www.musculaciontotal.com/wp-content/uploads/2017/10/funcional-vs-pesas.jpg',
          },
          {
            src: 'https://as01.epimg.net/deporteyvida/imagenes/2020/08/21/portada/1597993555_784056_1597993862_noticia_normal.jpg',
          },
        ],
      }
    },
  }
</script>
<style>
.home{
    width: 100%;
    text-align: center;
}

.fondo{
    margin-top: 40px;
    border-radius: 90%;
     max-width: 100%;
    display: inline-block;

}
.color{
    color:black;
    font-size: 50px;
}
</style>
