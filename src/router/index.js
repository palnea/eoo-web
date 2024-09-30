/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { createRouter, createWebHistory } from 'vue-router'
import ExternalSignUp from "@/pages/External/ExternalSignUp.vue";
import NotFound from "@/pages/NotFound.vue";
import ExternalHome from "@/pages/External/ExternalHome.vue";
import ExternalSuccess from "@/pages/External/ExternalSuccess.vue";
import RedeemCode from "@/pages/External/RedeemCode.vue";
import ExternalSignUpDigiturk from "@/pages/External/ExternalSignUpDigiturk.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/redeem-code',
      name: 'redeem-code',
      component: RedeemCode
    },
    {
      path: '/external-signup',
      name: 'external-signup',
      component: ExternalSignUp
    },
    {
      path: '/external-signup-digiturk',
      name: 'external-signup-digiturk',
      component: ExternalSignUpDigiturk
    },
    {
      path: '/r',
      name: 'external-signup-shorter',
      component: ExternalSignUp
    },
    {
      path: '',
      name: 'external-home',
      component: ExternalHome
    },
    {
      path: '/success',
      name: 'success',
      component: ExternalSuccess,
      props: (route) => ({
        title: route.query.title || 'İşlem Başarılı.',
        caption: route.query.caption || "Artık Funly Family dünyasına girmeye hazırsınız. \n Aşağıdaki  bağlantıya tıklayarak ya da QR kodunu okutarak Funly Family'i indirin ve hesabınızla giriş yapın."
      }),
      beforeEnter: (to, from, next) => {
        // Check if the route was pushed from another route
        if (from.name) {
          next();
        } else {
          next('/');
        }
      },
    },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

export default router
