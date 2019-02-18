<template>
    <div class="app-container">
        <mt-header fixed title="view商城"></mt-header>
        <transition>
            <router-view></router-view>
        </transition>
        <mui-footer></mui-footer>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="less" scoped>
    .app-container {
        padding-top: 40px;
        /*overflow-x: hidden;*/
        padding-bottom: 50px;
        .v-enter {
            opacity: 0;
            transform: translateX(100%);
        }
        .v-leave-to {
            opacity: 0;
            transform: translateX(-100%);
            position: absolute;
        }
        .v-enter-active,.v-leave-active {
            transition: all 0.5s ease;
        }
        .mint-header {
            z-index: 99;
        }
    }

</style>