<template>
    <div class="GoodsComments_container">
        <GoodComments :id="id"></GoodComments>
    </div>
</template>

<script>
    import comments from '../subcomponents/comments.vue';

    export default {
        name: "GoodsComments",
        data () {
            return {
                id: this.$route.query.id
            }
        },
        components: {
            'GoodComments': comments
        }
    }
</script>

<style scoped>
.GoodsComments_container {
    padding: 5px;
}
</style>