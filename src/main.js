import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import router from './router';
import app from './app.vue';
import 'mint-ui/lib/style.css';
import './css/app.css';
import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
import footer from './components/footer.vue';
import VueResource from "vue-resource";
import moment from 'moment';
import VueLazyload from 'vue-lazyload';
import VuePreview from 'vue-preview';


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);
Vue.component(footer.name, footer);
Vue.component(Button.name, Button);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueLazyload, {
    loading: 'images/loading.gif',
    listenEvents: [ 'scroll' ]
});
Vue.use(VuePreview);

Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;

//时间格式化过滤器
Vue.filter('dataStr',function (value, dataFormat='YYYY-MM-DD hh:mm:ss') {
    return moment(value).format(dataFormat);
});

new Vue({
    el: '#app',
    data: {
        message: '哈哈哈'
    },
    render: c => c(app),
    router
});