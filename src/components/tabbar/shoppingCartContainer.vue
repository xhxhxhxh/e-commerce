<template>
    <div class="shoppingCart-container">
        <div class="mui-card" v-for="item in shoppingCartList" :key="item.id">
            <div class="mui-card-content">
                <mt-switch v-model="GoodsFlag[item.id]" @change="$store.commit('updateGoodsChoose',[item.id,GoodsFlag[item.id]])"></mt-switch>
                <img :src="item.thumb_path" alt="">
                <div class="GoodsInfo">
                    <h3>{{ item.title }}</h3>
                    <div class="GoodsInfo-body">
                        <span class="price">&yen;{{ item.sell_price }}&nbsp;</span>
                        <div :class="'mui-numbox box' + item.id" data-numbox-min="1" >
                            <button class="mui-btn mui-btn-numbox-minus" type="button" @tap="counts[item.id]--">-</button>
                            <input id="test" class="mui-input-numbox" type="number" v-model="counts[item.id]" @change="updateCount($event,item.id)">
                            <button class="mui-btn mui-btn-numbox-plus" type="button" @tap="counts[item.id]++">+</button>
                        </div>
                        <a href="javaScript:;" class="delete" @tap="removeGoodsById(item.id)">&nbsp;删除</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="shoppingCart-settle">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div>
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span>{{ $store.getters.cartTotalCount }}</span> 件，总计：<span>&yen;{{ $store.getters.getTotalPrice }}</span></p>
                    </div>
                    <mt-button size="normal" type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { Toast } from 'mint-ui';
    import  mui from '../../lib/mui/js/mui.min';

    export default {
        name: "shoppingCart",
        data () {
            return {
                counts: {},
                totalCount: {},
                GoodsFlag: {},
                shoppingCartList: []
            }
        },
        created () {
            this.getShoppingCartList();
        },
        mounted () {
            mui('.mui-numbox').numbox();

        },
        updated () {
            for (let key in this.totalCount) {
                if (this.shoppingCartList.length == 0) return false;
                mui('.mui-numbox.box' + key).numbox().setOption('max',this.totalCount[key]);
            }
        },
        watch: {
            counts: {
                handler: function (val) {
                    for (let key in this.counts) {
                        if (this.counts[key] > this.totalCount[key]) {
                            this.counts[key] = this.totalCount[key];
                        }
                        if (this.counts[key] < 1) {
                            this.counts[key] = 1;
                        }
                    }
                },
                deep: true
            }
        },
        methods: {
            getShoppingCartList () {
                let cart = this.$store.state.cart;
                let id = [];
                let findCount = {};
                let findTotalCount = {};
                let findGoodsFlag = {};
                if (cart.length == 0) return false;
                cart.forEach(item => {
                    id.push(item.id);
                    findCount[item.id] = item.count;
                    findTotalCount[item.id] = item.totalCount;
                    findGoodsFlag[item.id] = item.flag;
                });
                this.counts = findCount;
                this.totalCount = findTotalCount;
                this.GoodsFlag = findGoodsFlag;
                this.$http.get('api/goods/getshopcarlist/' + id.join(',')).then(result =>{
                    if (result.body.status === 0) {
                        this.shoppingCartList = result.body.message;
                    } else {
                        Toast('购物车数据加载失败');
                    }
                })
            },

            //将改变的商品数量添加到store中
            updateCount (e,id) {
                this.$store.commit('updateCount',[id,e.target.value]);
            },

            //删除商品功能
            removeGoodsById (id) {
                this.shoppingCartList.forEach((item,index) => {
                    if (item.id == id) {
                        delete this.totalCount[id];
                        this.shoppingCartList.splice(index,1);
                    }
                });
                this.$store.commit('removeGoodsById',id);
            }
        }
    }
</script>

<style lang="less" scoped>
    .shoppingCart-container {
        .mui-card-content {
            display: flex;
            height: 80px;
            padding: 10px;
            justify-content: space-between;
            img {
                height: 100%;
            }
            .GoodsInfo {
                h3 {
                    font-size: 14px;
                    height: 20px;
                    line-height: 20px;
                    overflow: hidden;
                }
                .GoodsInfo-body {
                    .mui-numbox {
                        height: 30px;
                    }
                    span {
                        color: orangered;
                        font-weight: bold;
                    }
                    a {
                        color: deepskyblue;
                    }
                }
            }
            .mint-button {
                margin-top: 10px;
            }
        }
        .shoppingCart-settle {
            p {
                span {
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
            }
        }
    }


</style>