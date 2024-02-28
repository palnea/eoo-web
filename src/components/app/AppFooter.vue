<script setup>

</script>

<template>
  <v-footer app style="background-color: transparent; bottom: -15px">
    <v-row>
      <v-col>
        <v-col class="text-center mt-4 flex-row-center justify-center custom-font  font-weight-thin" cols="12">
          <!--              <v-icon class="mr-2" color="#c7c7c7">mdi-copyright</v-icon>-->
          <img src="../../assets/logo.webp" width="60" style="margin-right: 8px; opacity: 0.7">
          {{ "|" }} &nbsp; {{ new Date().getFullYear() }} &nbsp;
        </v-col>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>

</style>
