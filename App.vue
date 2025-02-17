<template>
  <Navbar :cartCount="cartCount" :isLogged="isLogged" :userName="userName" :isAdmin="isAdmin"
  style="height: 60px"/>
  <router-view v-if="categories && products" style="min-height: 70vh;"
    :baseURL="baseURL"
    :categories="categories"
    :products="products"
    @fetchData = "handleFetchData"
  >
  </router-view>

  <!-- footer -->
  <Footer>

  </Footer>

</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { mapMutations, mapState  } from 'vuex';
// router-view indica variavel global, nesse caso baseURL e categories estarao acessiveis para todos os components
export default {

  components: {Navbar, Footer},

  computed: {
    ...mapState({
      baseURL: state => state.baseURL,
      products: state => state.products,
      categories: state => state.categories,
      cartCount: state => state.cartCount,
      userName: state => state.userName,
      isLogged: state => state.isLogged,
      isAdmin: state => state.isAdmin
    })
  },
  methods: {
    ...mapMutations(['fetchData']),
    handleFetchData() {
      this.fetchData();
    }
  },
  
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchData();
  }

};

</script>

<style>
html {
  overflow-y: scroll;
}
</style>
