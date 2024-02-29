<template>
  <v-app>
    <v-navigation-drawer app class="bright-purple-gradient" expand-on-hover rail permanent width="300px">
      <v-list dense >
        <div v-for="menuItem in menuItems" :key="menuItem.title">
          <!-- If it's a group -->
          <v-list-group v-if="menuItem.children" :value="menuItem.title" style="padding-right: 0">
            <template v-slot:activator="{ props }">
              <v-list-item :prepend-icon="menuItem.icon" v-bind="props" class="white--text">
                <v-list-item-title class="white--text">{{ menuItem.title }}</v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item v-for="child in menuItem.children" :key="child.title" :to="child.to"
                         :prepend-icon="child.icon">
              <v-list-item-title>{{ child.title }}</v-list-item-title>

            </v-list-item>
          </v-list-group>
          <!-- If it's not a group -->
          <v-list-item v-else :to="menuItem.to" :prepend-icon="menuItem.icon">
            <v-list-item-title class="white--text">{{ menuItem.title }}</v-list-item-title>

          </v-list-item>
        </div>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block onclick="router.push('story')">
            <v-icon icon="mdi-logout"></v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <slot></slot>
    </v-main>

  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const menuItems = ref([
  // { title: 'Ana Sayfa', icon: 'mdi-view-dashboard', to: { name: 'dashboard' } },
  {
    title: 'Kullanıcı',
    icon: 'mdi-account-multiple',
    children: [
      // { title: 'Listele', icon: 'mdi-list-box', to: { name: 'users' } },
      { title: 'Ekle', icon: 'mdi-account-plus', to: { name: 'external-signup' } },
      { title: 'Premium Ata', icon: 'mdi-account-star', to: { name: 'redeem-code' } },
    ],
  },
  // {
  //   title: 'Hikaye',
  //   icon: 'mdi-book',
  //   children: [
  //     { title: 'Listele', icon: 'mdi-list-box', to: { name: 'story' } },
  //     { title: 'Konular', icon: 'mdi-text-long', to: { name: 'story' } },
  //   ],
  // },
  {
    title: 'Referans Kodu',
    icon: 'mdi-ticket',
    children: [
      { title: 'Listele', icon: 'mdi-list-box', to: { name: 'ref-code' } },
    ],
  },
  // { title: 'Etkinlik', icon: 'mdi-calendar-check', to: { name: 'story' } },
  // { title: 'Referans Kodu', icon: 'mdi-key-variant', to: { name: 'story' } },
]);


</script>

<style scoped>

.v-list-group__items .v-list-item {
  padding-inline-start: 24px !important;
}

.white--text{

}

</style>
