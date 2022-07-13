import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ListReserveView from '../views/ListReserveView.vue'
import ClassReserveView from '../views/ClassReserveView.vue'
import AdminView from '../views/AdminView.vue'
import ForHome from '../views/ForHome.vue'
import PageNotFound from '../views/PageNotFound.vue'
import { currentUserPromise } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/forhome',
    name: 'forhome',
    component: ForHome,
  },
  {
    path: '/listreserve',
    name: 'listreserve',
    component: ListReserveView,
    meta:{
      auth :true,
    },
  },
  {
    path: '/classreserve',
    name: 'classreserve',
    component: ClassReserveView,
    meta:{
      auth :true,
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta:{
      auth :true,
    },
  },

    { path: "*", 
    component: PageNotFound, }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
//rutas protegidas
// esta trae la promesa creada en el firabse.js para evitar que el usuario al actualizar con sesion activa se vaya al login
router.beforeEach (async(to, from, next) => {
  const requireAuth = to.meta.auth;
  const user = await currentUserPromise()

  if (requireAuth) {
    if (user) {
      next();
    }
    else {
      next ("/login")
    }

  }else {
    next();
  }
});

export default router
