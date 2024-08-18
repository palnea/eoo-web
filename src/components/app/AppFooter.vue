<script setup>

</script>

<template>
  <v-footer app style=" height: 50px;">
    <v-row>
        <v-col class="text-center flex-row-center justify-center custom-font  font-weight-thin" cols="12">
          <!--              <v-icon class="mr-2" color="#c7c7c7">mdi-copyright</v-icon>-->
          <img src="../../assets/logo-white-bg.png" width="60" style="margin-right: 8px; opacity: 0.7">
          {{ "|" }} &nbsp; {{ new Date().getFullYear() }} &nbsp;
        </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>

</style>
