import { createRouter, createWebHistory } from 'vue-router';
import Books from '../views/AppBooks.vue';
import Authors from '../views/AppAuthors.vue';
import Publishers from '../views/AppPublishers.vue';
import Login from '../views/AppLogin.vue';

const routes = [
  { path: '/', redirect: '/books' },
  { path: '/login', name: 'login', component: Login },
  { path: '/books', name: 'books', component: Books },
  { path: '/authors', name: 'authors', component: Authors },
  { path: '/publishers', name: 'publishers', component: Publishers },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const sessionId = getCookie('session_id'); 
  if (to.path !== '/login' && !sessionId) {
    next('/login'); 
  } else {
    next(); 
  }
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default router;
