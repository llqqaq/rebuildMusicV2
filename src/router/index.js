import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    meta: {
      title: '推荐页'
    },
    component: () => import('@/views/Recommend'),
    children: [{
      path: ':id',
      component: () => import('@/views/Disc')
    }]
  },
  {
    path: '/singer',
    name: 'singer',
    meta: {
      title: '歌手页'
    },
    component: () => import('@/views/Singer'),
    children: [{
      path: ':id',
      component: () => import('@/views/SingerDetail')
    }]
  },
  {
    path: '/rank',
    name: 'rank',
    meta: {
      title: '歌手页'
    },
    component: () => import('@/views/Rank'),
    children: [{
      path: ':id',
      component: () => import('@/views/TopList')
    }]
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      title: '歌手页'
    },
    component: () => import('@/views/Search'),
    children: [{
      path: ':id',
      component: () => import('@/views/SingerDetail')
    }]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;