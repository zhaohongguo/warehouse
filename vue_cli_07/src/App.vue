<template>
  <div id="app">
    <v-nav></v-nav>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from "./components/layout/header.vue";
import footer from "./components/layout/footer.vue";
import "../static/js/resp.js";

export default {
  components:{
    "v-nav":header,
    "v-footer":footer
  }
}
</script>

<style>
/*重置文件*/
@import "../static/css/reset.css";
/*全局css样式*/
@import "../static/css/index.css";

</style>
