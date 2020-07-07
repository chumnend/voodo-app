import Vue from 'vue';
import VueRouter from 'vue-router';

import Todo from '@/views/Todo.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'todo',
    component: Todo,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true,
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(window.localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath,
        }
      });
    } else {
      next();
    }
  } else if(to.matched.some(record => record.meta.guest)) {        
    if(window.localStorage.getItem('jwt') == null){
      next();
    } else {
      next({ 
        name: 'Todo'
      });
    }
  } else {
    next();
  }
});

export default router;

