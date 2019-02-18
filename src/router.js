import VueRouter from 'vue-router';
import homeContainer from './components/tabbar/homeContainer.vue';
import memberContainer from './components/tabbar/memberContainer.vue';
import shoppingCartContainer from './components/tabbar/shoppingCartContainer.vue';
import searchContainer from './components/tabbar/searchContainer.vue';
import newsList from './components/news/newsList.vue';
import newsInfo from './components/news/newsInfo.vue';
import photoList from './components/photoList/photoList.vue';
import photoInfo from './components/photoList/photoInfo.vue';
import GoodsList from './components/Goods/GoodsList.vue';
import GoodsInfo from './components/Goods/GoodsInfo.vue';
import GoodsDesc from './components/Goods/GoodsDesc.vue';
import GoodsComments from './components/Goods/GoodsComments.vue';

var router = new VueRouter ({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: homeContainer },
        { path: '/member', component: memberContainer },
        { path: '/shoppingCart', component: shoppingCartContainer },
        { path: '/search', component: searchContainer },
        { path: '/home/newsList', component: newsList },
        { path: '/home/newsInfo', component: newsInfo },
        { path: '/home/photoList', component: photoList },
        { path: '/home/photoInfo', component: photoInfo },
        { path: '/home/GoodsList', component: GoodsList },
        { path: '/home/GoodsInfo', component: GoodsInfo },
        { path: '/home/GoodsDesc', component: GoodsDesc },
        { path: '/home/GoodsComments', component: GoodsComments }
    ],
    linkActiveClass: ' mui-active'
});

export default router;