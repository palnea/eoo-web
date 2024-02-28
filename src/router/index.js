/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/pages/Dashboard.vue";
import ExternalSignUp from "@/pages/External/ExternalSignUp.vue";
import Login from "@/pages/Login.vue";
import NotFound from "@/pages/NotFound.vue";
import Story from "@/pages/Content/Story.vue";
import ExternalHome from "@/pages/External/ExternalHome.vue";
import ExternalSuccess from "@/pages/External/ExternalSuccess.vue";
import RedeemCode from "@/pages/External/RedeemCode.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/external-home',
    },
    {
      path: '/redeem-code',
      component: RedeemCode
    },
    {
      path: '/external-signup',
      component: ExternalSignUp
    },
    {
      path: '/external-home',
      component: ExternalHome
    },
    {
      path: '/success',
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
          next('/external-home');
        }
      },
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/story',
      component: Story,
      meta: {
        requiresAuth: true
      }
    },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = true
    if (token) {
      next();
    } else {
      next('/external-home');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
