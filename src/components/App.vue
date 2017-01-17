<template>
    <div id="main">
        <navbar></navbar>
        <sidebar></sidebar>
        <div class="wrapper"
             :class="{
             broad:!$store.state.sidebar_status,
             normal:$store.state.sidebar_status,
             mobile:!$store.state.isPC
             }">
            <transition name="slide-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <!-- mobile mask!-->
        <div class="wrapper-mask"
             v-show="$store.state.sidebar_status && !$store.state.isPC"
             @click="closeSiderbar"></div>
    </div>
</template>
<script>
    /* 根组件就像是 AngularJS 的 $rootScope，同时也负责全局布局 */
    import navbar from './Nav.vue'
    import sidebar from '../module/Sidebar/index.vue'
    export default {
        mounted: function () {
            let self = this
            this.$nextTick(function () {
                window.addEventListener('resize', ()=> {
                    this.$store.commit("toggleDevice", $(window).width() < 768 ? false : true)
                })
            })
        },
        components: {navbar, sidebar},
        methods: {
            closeSiderbar(){
                this.$store.commit("toggleSidebar", false)
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
    #main {
        .wrapper {
            width: 100%;
            min-height: 100%;
            background-color: white;
            transition: margin-left 0.5s, width 0.5s;
            padding: 1rem;
        }
        .wrapper.broad {
            width: 100%;
        }
        .wrapper.normal {
            width: calc(~"100% - 200px");
            margin-left: 200px;
        }
        .wrapper.normal.mobile {
            width: 100%;
            margin-left: 200px;
        }
        .wrapper-mask {
            position: fixed;
            top: 50px;
            left: 200px;
            width: calc(~"100% - 200px");
            height: 100%;
            opacity: 0;
        }
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateX(10px);
        opacity: 0;
    }
</style>