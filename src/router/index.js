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
import Users from "@/pages/Users.vue";
import Admin from "@/layouts/Admin.vue";

const adminRoutes = [
  {
    path: 'dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: 'users',
    name: 'users',
    component: Users,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: 'story',
    name: 'story',
    component: Story,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/school',
    name: 'school',
    component: Story,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reference-code',
    name: 'reference-code',
    component: Story,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/external-home',
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: adminRoutes,
    },
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
      path: '/external-home',
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
          next('/external-home');
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
