<template>
    <div class="GoodsDesc_container">
        <header>{{ GoodsDesc.title }}</header>
        <div class="GoodsDesc_Content" v-html="GoodsDesc.content"></div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';


    export default {
        name: "GoodsDesc",
        data () {
            return {
                id: this.$route.query.id,
                GoodsDesc: {}
            }
        },
        created () {
            this.getGoodsDesc();
        },
        methods: {
            getGoodsDesc () {
                this.$http.get('api/goods/getdesc/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.GoodsDesc = result.body.message[0];
                    } else {
                        Toast('图文介绍加载失败');
                    }
                })
            }
        }

    }
</script>

<style lang="less">
    .GoodsDesc_container {
        padding: 5px;
        header {
            color: deepskyblue;
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
        }
        .GoodsDesc_Content {
            margin-top: 5px;
            img {
                width: 100%;
            }
        }
    }

</style>