<!--<template>-->
<!--  <div id="app">-->
<!--    <router-view/>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import Router from "./router/routes";-->

<!--export default{-->
<!--  data(){-->
<!--    return {-->

<!--    }-->
<!--  },-->
<!--  components:{-->
<!--    Router-->
<!--  }-->
<!--}-->

<!--</script>-->


<!--<style>-->
<!--/*顶部进度条样式*/-->
<!--#nprogress .bar {-->
<!--  background: #1890ff !important;-->
<!--}-->

<!--body {-->
<!--  letter-spacing: 1px;-->
<!--  background: #f0f2f5 !important;-->
<!--}-->

<!--</style>-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Router from "./router/routes";

export default {
  name: 'App',
  components: {
    Router
  }
}
</script>

<style scoped>
/* 顶部进度条样式 */
#nprogress .bar {
  background: #1890ff !important;
}

body {
  letter-spacing: 1px;
  background: #f0f2f5 !important;
}
</style>