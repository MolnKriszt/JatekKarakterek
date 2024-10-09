import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta:{title: 'Home'}
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/TableView.vue'),
      meta:{title: 'Table'}
    },
    {
      path: '/cards',
      name: 'cards',
      component: () => import('../views/Cards.vue'),
      meta:{title: 'Cards'}
    }
  ]
})

router.beforeEach((to, from, next) =>{
  document.title = to.meta.title
  next();
    
})
export default router
