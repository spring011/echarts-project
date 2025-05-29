<template>
  <div class="wrapper">
    <div class="item">
      <MapChart></MapChart>
    </div>
  </div>
 
  
</template>

<script setup lang="ts">
import MapChart from './map/index.vue';


</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100%;
    padding-top:30px;
    overflow: auto;
  }
</style>
