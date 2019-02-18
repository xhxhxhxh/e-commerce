<template>
    <div class="newsInfo-container">
        <header>
            <h3>{{ newsInfo.title }}</h3>
            <p><span>发表时间：{{ newsInfo.add_time | dataStr }}</span><span>点击：{{ newsInfo.click }}次</span></p>
        </header>
        <main class="newsInfo-content" v-html="newsInfo.content"></main>
        <newsComments :id="id"></newsComments>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import comments from '../subcomponents/comments.vue';

    export default {
        name: "newsInfo",
        data () {
            return {
                id: this.$route.query.id,
                newsInfo: {}
            }
        },
        created () {
            this.getNewsInfo();
        },
        methods: {
            getNewsInfo () {
                this.$http.get('api/getnew/'+this.id).then(result => {
                    console.log(result.body.message[0]);
                    if (result.body.status === 0) {
                        this.newsInfo = result.body.message[0];
                    } else {
                        Toast('新闻加载失败');
                    }
                })
            }
        },
        components: {
            'newsComments': comments
        }
    }
</script>

<style lang="less" scoped>
    .newsInfo-container {
        padding: 0 5px;
        header {
            h3 {
                text-align: center;
                font-size: 14px;
                color: red;
                margin-top: 10px;
            }
            p {
                margin: 12px 0 8px;
                font-size: 12px;
                color: deepskyblue;
                display: flex;
                justify-content: space-between;
            }
        }
        .newsInfo-content {
            border-top: 1px solid #ccc;
        }
    }

</style>