<template>
    <div class="GoodsInfo-container mui-clearfix">
        <!--购物车小球-->
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="seenBall" ref="ball"></div>
        </transition>
        <!--轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <!--轮播图-->
                <mt-swipe :auto="3000">
                    <mt-swipe-item v-for="item in bannerList" :key="item.src">
                        <img :src="item.src" alt="">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <!--商品购物区-->
        <div class="mui-card">
            <div class="mui-card-header" style="height: 62px">{{ GoodsInfo.title }}</div>
            <div class="mui-card-content">
                <p>市场价格：<del>&yen;{{ GoodsInfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="price">&yen;{{ GoodsInfo.sell_price }}</span></p>
                <span>购买数量：</span>
                <div class="mui-numbox" data-numbox-min="1" >
                    <button class="mui-btn mui-btn-numbox-minus" type="button" @tap="count--">-</button>
                    <input id="test" class="mui-input-numbox" type="number" v-model="count">
                    <button class="mui-btn mui-btn-numbox-plus" type="button" @tap="count++">+</button>
                </div>
                <br>
               <div class="sell">
                   <mt-button type="primary" size="small">立即购买</mt-button>
                   <mt-button type="danger" size="small" @click="addShoppingCart">加入购物车</mt-button>
               </div>
            </div>
        </div>
        <!--商品详情区-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <p>商品货号：{{ GoodsInfo.goods_no }}</p>
                <p>存货情况：{{ GoodsInfo.stock_quantity }}</p>
                <p>上架时间：{{ GoodsInfo.add_time | dataStr }}</p>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goGoodsDesc">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goGoodsComments">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import  mui from '../../lib/mui/js/mui.min';


    export default {
        name: "GoodsInfo",
        data () {
            return {
                id: this.$route.query.id,
                bannerList: [],
                GoodsInfo: {},
                seenBall: false,
                ballPosition: null,
                // firstScrollTop: 0,
                // scrollTop: 0
                ballFlag: true,
                count: 1
            }
        },
        created () {
            this.getBanner();
            this.getGoodsInfo();
        },
        mounted () {
            mui('.mui-numbox').numbox();
            // this.ballPosition = this.$refs.ball.getBoundingClientRect();
            // this.seenBall = false;
            // let that = this;
            // window.addEventListener('scroll',function () {
            //    that.scrollTop = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
            //    if (that.firstScrollTop == 0) {
            //        that.firstScrollTop = that.scrollTop;
            //    }
            //    console.log(that.scrollTop,that.firstScrollTop ,that.ballPosition);
            // })
        },
        watch: {
            count: {
                handler: function (val) {
                    if (val > this.GoodsInfo.stock_quantity) {
                        this.count = this.GoodsInfo.stock_quantity;
                    }
                    if (val < 1) {
                        this.count = 1;
                    }
                }
            }
        },
        methods: {
            getBanner () {
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.bannerList = result.body.message;
                    } else {
                        Toast('banner图加载失败');
                    }
                })
            },
            getGoodsInfo () {
                this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.GoodsInfo = result.body.message[0];
                        mui('.mui-numbox').numbox().setOption('max',this.GoodsInfo.stock_quantity);
                    } else {
                        Toast('商品详情加载失败');
                    }
                })
            },
            goGoodsDesc () {
                this.$router.push({ path: 'GoodsDesc', query: { id: this.id }});
            },
            goGoodsComments () {
                this.$router.push({ path: 'GoodsComments', query: { id: this.id }});
            },
            beforeEnter (el) {
                el.style.transform = 'translate(0,0)';
            },
            enter (el,done) {
                el.offsetWidth;
                const endPosition = document.getElementById('endPosition').getBoundingClientRect();
                this.ballPosition = this.$refs.ball.getBoundingClientRect();
                this.ballFlag = false;
                const distanceX = endPosition.left - this.ballPosition.left;
                // const distanceY = endPosition.top - this.ballPosition.top + this.scrollTop - this.firstScrollTop;
                const distanceY = endPosition.top - this.ballPosition.top;
                el.style.transform = `translate(${distanceX}px,${distanceY}px)`;
                el.style.transition = 'transform 0.5s cubic-bezier(.41,-0.28,.53,.94)';
                var that = this;
                this.$refs.ball.addEventListener('transitionend',function () {
                    that.ballFlag = true;
                });
                done();
            },
            afterEnter () {
                this.seenBall = false;
            },

            //添加购物车
            addShoppingCart () {
                this.ballFlag?this.seenBall = !this.seenBall:this.seenBall;
                let cartData = {
                    id: this.id,
                    price: this.GoodsInfo.sell_price,
                    count: this.count,
                    totalCount: this.GoodsInfo.stock_quantity,
                    flag: true
                };
                this.$store.commit('addCart',cartData);
            }
        }
    }
</script>

<style lang="less" scoped>
    .GoodsInfo-container {
        background-color: #eee;
        position: relative;
        .ball {
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            left: 157px;
            top: 432px;
            z-index: 999;
        }
        .mint-swipe {
            height: 250px;
            .mint-swipe-item {
                text-align: center;
                img {
                    height: 100%;
                }
            }
        }
        .mui-card {
            .mui-card-content {
                padding: 20px;
                p {
                    .price {
                        font-size: 16px;
                        color: red;
                        font-weight: bold;
                    }
                }
                span, .mui-numbox {
                    color: #8f8f94;
                }
                .sell {
                    margin-top: 10px;
                }
            }
            .mui-card-footer {
                flex-wrap: wrap;
                .mint-button {
                    margin: 10px 0;
                }
            }
        }

    }
</style>