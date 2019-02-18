<template>
    <div class="photoList-container">
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <ul>
                    <li :class="['mui-control-item', item.id == 0?'mui-active':'']"
                                 v-for="item in photoList" :key="item.id" @click="getPhotoListData(item.id)">
                        {{ item.title }}
                    </li>
                </ul>

            </div>
        </div>
        <div class="photoList-content">
            <ul>
                <router-link v-for="item in photoListData" :key="item.id" tag="li" :to="'/home/photoInfo?id=' + item.id">
                    <img v-lazy="item.img_url">
                    <div class="text">
                        <p>{{ item.title }}</p>
                        <p v-html="item.zhaiyao"></p>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    //载入mui.js
    import  mui from '../../lib/mui/js/mui.min';
    import { Toast } from 'mint-ui';
    // mui('body').on('tap','a',function(){document.location.href=this.href;});

    export default {
        name: "photoList",
        data () {
            return {
                photoList: [],
                photoListData: []
            }
        },
        created () {
            this.getPhotoList();
            this.getPhotoListData(0);
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005
            });
        },
        methods: {
            getPhotoList () {
                this.$http.get('api/getimgcategory').then(result => {
                    if (result.body.status === 0) {
                        this.photoList = result.body.message;
                        this.photoList.unshift({ title:'全部',id:0 });
                    } else {
                        Toast('图片分类加载失败');
                    }
                })
            },
            getPhotoListData (id) {
                this.$http.get('api/getimages/' + id).then(result => {
                    if (result.body.status === 0) {
                        this.photoListData = result.body.message;
                    } else {
                        Toast('图片详情加载失败');
                    }
                })
            }

        }
    }
</script>

<style lang="less" scoped>
    * {
        touch-action: pan-y;
    }
    p {
        color: #fff;
        text-align: left;
        margin: 0;
    }
    .photoList-container {
        ul, li {
            margin: 0;
            padding: 0;
        }
        .photoList-content {
            padding: 10px;
            li {
                list-style: none;
                text-align: center;
                position: relative;
                height: 300px;
                margin-bottom: 10px;
                box-shadow: 0 -3px 3px #ccc;
                img {
                    width: 100%;
                    height: 300px;
                }
                img[lazy=loading] {
                    width: 30px;
                    height: 30px;
                    position: absolute;
                    top: 50%;
                    margin-top: -15px;
                    /*background-color: red;*/
                }
                .text {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background-color: rgba(0,0,0,.3);
                    color: #fff;
                    max-height: 100px;
                    overflow: hidden;
                    p {
                        color: #fff;
                        text-align: left;
                        margin: 0;
                    }

                }
            }

        }
    }


</style>