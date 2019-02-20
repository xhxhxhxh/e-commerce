<template>
    <div class="photoInfo-container">
        <header>
            <h3>{{ photoInfo.title }}</h3>
            <p><span>发表时间：{{ photoInfo.add_time | dataStr }}</span><span>点击：{{ photoInfo.click }}次</span></p>
        </header>
        <div class="photoInfo-images">
            <!--<li v-for="(item,index) in images" :key="index">-->
                <!--<img :src="item.src" alt="">-->
            <!--</li>-->
            <vue-preview :slides="images"></vue-preview>
        </div>
        <main class="photoInfo-content" v-html="photoInfo.content"></main>
        <photoComments :id="id"></photoComments>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import comments from '../subcomponents/comments.vue';

    export default {
        name: "photoInfo",
        data () {
            return {
                id: this.$route.query.id,
                photoInfo: {},
                images: []
            }
        },
        created () {
            this.getphotoInfo();
            this.getImages();
        },
        methods: {
            getphotoInfo () {
                this.$http.get('api/getimageInfo/'+this.id).then(result => {
                    // console.log(result.body.message[0]);
                    if (result.body.status === 0) {
                        this.photoInfo = result.body.message[0];
                    } else {
                        Toast('图片资讯加载失败');
                    }
                })
            },
            getImages () {
                this.$http.get('api/getthumimages/'+this.id).then(result => {
                    // console.log(result.body.message[0]);
                    if (result.body.status === 0) {
                         result.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                            item.msrc = item.src;
                        });
                        this.images = result.body.message;
                    } else {
                        Toast('图片加载失败');
                    }
                })
            }
        },
        components: {
            'photoComments': comments
        }
    }
</script>

<style lang="less">
    .photoInfo-container {
        padding: 0 5px;
        header {
            border-bottom: 1px solid #ccc;
            h3 {
                text-align: center;
                font-size: 14px;
                color: deepskyblue;
                margin-top: 10px;
            }
            p {
                margin: 12px 0 8px;
                font-size: 12px;
                color: #666;
                display: flex;
                justify-content: space-between;
            }
        }
        .photoInfo-content {
            font-size: 14px;
        }
        .photoInfo-images {
            padding: 0;
            margin-top: 10px;
            margin-bottom: 10px;
            figure {
                display: inline-block;
                margin: 0;
                width: 100px;
                height: auto;
                margin-right: 20px;
                img {
                    width: 100%;
                }
            }
        }
    }

</style>