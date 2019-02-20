<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsInfo?id='+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class="mui-ellipsis"><span>发表时间：{{ item.add_time | dataStr }}</span><span>点击：{{ item.click }}次</span></p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "newsList",
        data () {
            return {
                newsList: null
            }
        },
        created () {
            this.getNewsList();
        },
        methods: {
            getNewsList () {
                this.$http.get('api/getnewslist').then(result => {
                    // console.log(result);
                    if (result.body.status === 0) {
                        this.newsList = result.body.message;
                    } else {
                        Toast('新闻列表加载失败');
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .mui-media-body {
        h1 {
            font-size: 14px;
        }
        p {
            font-size: 12px;
            color: deepskyblue;
            display: flex;
            justify-content: space-between;
        }
    }
</style>