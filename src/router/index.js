import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../components/views/login')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/views/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/views/register')
  },
  {
    path: '/create-speise',
    name: 'create',
    meta: {
    requiresAuth: true //Authentifizierung erforderlich
    }, 
    component: () => import('../components/CreateComponent')
  },
  {
    path: '/view',
    name: 'view',
    meta: {
    requiresAuth: true //Authentifizierung erforderlich
      }, 
    component: () => import('../components/ListComponent')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../components/EditComponent')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: '/'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;