<template>
    <a-layout id="components-layout-demo-fixed-sider">
      <AsideUser/>
      <a-layout :style="{ marginLeft: '220px' }">
        <Header />
        <Main />
        <Footer />
      </a-layout>
    </a-layout>
  </template>
  
  <script>
  import AsideUser from "./AsideUser.vue";
  import Header from "@/layout/Header";
  import Main from "@/layout/Main";
  import Footer from "@/layout/Footer";
  
  export default {
  
    components: { Header, Main, Footer,AsideUser },
  
    mounted() {
      this.$message.success(
        '欢迎驾驶员 ' + this.$store.state.user.details.email,
        6,
      );
    }
  
  }
  </script>
  
  <style scoped>
  #components-layout-demo-fixed-sider .logo {
    padding: 10px 15px;
    height: 50px;
    font-size: 15px;
    margin: 16px;
    color: #ffffff;
    letter-spacing: 2px;
  }
  
  .logo img {
    width: 32px;
    height: 32px;
    margin-right: 5px;
  }
  
  .header {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  </style>
  