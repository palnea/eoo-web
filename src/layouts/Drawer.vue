<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
<!--        <v-img :src=logo></v-img>-->
        <v-divider></v-divider>
        <v-list density="compact" nav>
<!--          <v-list-item prepend-icon="mdi-home" title="Dashboard" value="myfiles"></v-list-item>-->
<!--          <v-list-item prepend-icon="mdi-account-multiple" title="Kullanıcılar" value="shared"></v-list-item>-->
<!--          <router-link to="/external-signup">-->
<!--            <v-list-item prepend-icon="mdi-account-multiple" title="Premium Kullanıcı Kaydı"-->
<!--                         value="shared"></v-list-item>-->
<!--          </router-link>-->
          <router-link to="/story">
            <v-list-item prepend-icon="mdi-book" title="Hikayeler" value="starred"></v-list-item>
          </router-link>
<!--          <v-list-item prepend-icon="mdi-logout" title="Çıkış" value="starred" @click="logout"></v-list-item>-->
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>
<script setup>

</script>
