<template>
    <div class="GoodsList-container">
        <ul>
            <li v-for="item in GoodsList" :key="item.id">
                <router-link :to="'/home/GoodsInfo?id=' + item.id">
                    <div class="GoodsImg">
                        <img :src="item.img_url" alt="">
                        <h3 class="title">{{ item.title }}</h3>
                    </div>
                    <div class="GoodsSale">
                        <p class="price"><span>{{ '￥'+ item.sell_price }}</span>&nbsp;&nbsp;<span>{{ '￥'+ item.market_price}}</span> </p>
                        <p class="number"><span>热卖中</span><span>剩{{ item.stock_quantity}}件</span></p>
                    </div>
                </router-link>
            </li>
        </ul>
        <mt-button type="danger" size="large" @click="getMoreGoodsList">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: "GoodsList",
        data () {
            return {
                pageIndex: 1,
                GoodsList: {}
            }
        },
        created () {
            this.getGoodsList();
        },
        methods: {
            getGoodsList () {
                this.$http.get('api/getGoods?pageindex=' + this.pageIndex).then(result => {
                    if (result.body.status === 0) {
                        this.GoodsList = result.body.message;
                    } else {
                        Toast('商品列表加载失败');
                    }
                })
            },
            getMoreGoodsList () {
                this.pageIndex ++;
                this.$http.get('api/getGoods?pageindex=' + this.pageIndex).then(result => {
                    if (result.body.status === 0) {
                        this.GoodsList = this.GoodsList.concat(result.body.message);
                    } else {
                        Toast('商品列表加载失败');
                    }
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    .GoodsList-container {
        padding: 5px;
        ul {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 0;
            margin: 0;
            li {
                width: 49%;
                list-style: none;
                border: 1px solid #ccc;
                padding: 2px;
                margin-bottom: 5px;
                box-shadow: 0 -1px 5px #ccc;
                a {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                }
                img {
                    width: 100%;
                }
                h3 {
                    color: #000;
                    font-size: 14px;
                }
                .GoodsSale {
                    margin-top: 5px;
                    p {
                        margin-bottom: 0;
                    }
                    .price {
                        span {
                            &:first-child {
                                color: red;
                                font-weight: bolder;
                                font-size: 16px;
                            }
                            &:last-child {
                                color: #ccc;
                                font-size: 12px;
                                text-decoration: line-through;
                            }
                        }
                    }
                    .number {
                        font-size: 12px;
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
        }
    }
</style>