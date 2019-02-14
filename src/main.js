import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import router from './router';
import app from './app.vue';
import 'mint-ui/lib/style.css';
import './css/app.css';
import { Header } from 'mint-ui';
import './lib/mui/css/mui.min.css';
import footer from './user/footer.vue';

Vue.component(Header.name, Header);
Vue.component(footer.name, footer);

Vue.use(VueRouter);

new Vue({
    el: '#app',
    data: {
        message: '哈哈哈'
    },
    render: c => c(app),
    router
});