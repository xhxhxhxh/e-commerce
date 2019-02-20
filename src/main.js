import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import router from './router';
import app from './app.vue';
import 'mint-ui/lib/style.css';
import './css/app.css';
import { Header, Swipe, SwipeItem, Button, Switch } from 'mint-ui';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
import footer from './components/footer.vue';
import VueResource from "vue-resource";
import moment from 'moment';
import VueLazyload from 'vue-lazyload';
import VuePreview from 'vue-preview';
import Vuex from 'vuex';


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);
Vue.component(footer.name, footer);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueLazyload, {
    loading: 'images/loading.gif',
    listenEvents: [ 'scroll' ]
});
Vue.use(VuePreview);
Vue.use(Vuex);

Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;

//时间格式化过滤器
Vue.filter('dataStr',function (value, dataFormat='YYYY-MM-DD hh:mm:ss') {
    return moment(value).format(dataFormat);
});

//获取购物车本地数据
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

//vuex
const store = new Vuex.Store({
   state: {
       cart: cart
   },
   mutations: {
       addCart (state,data) {
           let hasGoods = true;
           state.cart.forEach(item => {
               if (item.id == data.id) {
                   hasGoods = false;
                   item.count += data.count;
                   return true
               }
           });
           if (hasGoods) {
               state.cart.push(data);
           }
           localStorage.setItem('cart',JSON.stringify(state.cart));
       },
       updateCount (state,data) {
           let id = data[0];
           let value = parseInt(data[1]);
           // console.log(value,id);
           state.cart.forEach(item => {
               if (item.id == id) {
                   item.count = value;
                   console.log(state.cart);
                   localStorage.setItem('cart',JSON.stringify(state.cart));
                   return true
               }
           });

       },
       removeGoodsById (state,id) {
           state.cart.forEach((item,index) => {
               if (item.id == id) {
                   state.cart.splice(index,1);
                   localStorage.setItem('cart',JSON.stringify(state.cart));
                   return true
               }
           });
       },

       //商品选择情况更新
       updateGoodsChoose (state,data) {
           let id = data[0];
           let flag = data[1];
           state.cart.forEach(item => {
               if (item.id == id) {
                   item.flag = flag;
                   localStorage.setItem('cart',JSON.stringify(state.cart));
                   return true
               }
           });
       }
   },
    getters: {
       //获取总商品数
       cartTotalCount (state) {
           let totalCount = 0;
           state.cart.forEach(item => {
               if (item.flag) {
                   totalCount += item.count;
               }
           });
           return totalCount;
       },

       //计算总价格
        getTotalPrice (state) {
            let totalPrice = 0;
            state.cart.forEach(item => {
                if (item.flag) {
                    totalPrice += item.count * item.price;
                }
            });
            return totalPrice;
        }
    }
});

new Vue({
    el: '#app',
    data: {
        message: '哈哈哈'
    },
    render: c => c(app),
    router,
    store
});