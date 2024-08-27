<template>
  <div id="app">
    <SideNav />
  </div>
</template>


<script>
import 'materialize-css/dist/css/materialize.css'
import SideNav from './layouts/SideNav'

export default {
  name: 'App',

  components: {
    SideNav
  }
}
</script>


<style>
@import './App.css';
</style>
