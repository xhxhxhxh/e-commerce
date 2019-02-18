<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in bannerList" :key="item.img">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <!--九宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newsList">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoList">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodsList">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></router-link></li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "homeContainer",
        data () {
            return {
                bannerList: null
            }
        },
        created () {
            this.getBanner();
        },
        methods: {
            getBanner () {
                this.$http.get('api/getlunbo').then(result => {
                    console.log(result)
                    if (result.body.status === 0) {
                        this.bannerList = result.body.message;
                    } else {
                        Toast('轮播图加载失败');
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.mint-swipe {
    height: 200px;
    .mint-swipe-item {
        /*&:nth-of-type(1) {*/
            /*background-color: pink;*/
        /*}*/
        /*&:nth-of-type(2) {*/
            /*background-color: skyblue;*/
        /*}*/
        /*&:nth-of-type(3) {*/
            /*background-color: yellowgreen;*/
        /*}*/
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    .mui-table-view-cell {
        border: none;
        .mui-media-body {
            font-size: 14px;
        }
        img {
            width: 60px;
        }
    }
}
</style>