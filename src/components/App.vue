<template>
    <div>
        <navbar></navbar>
        <sidebar></sidebar>
        <div class="wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    /* 根组件就像是 AngularJS 的 $rootScope，同时也负责全局布局 */
    import navbar from './Nav.vue'
    import sidebar from '../module/Sidebar/index.vue'
    export default {
        // 路由会自动将该组件挂载到 #app 上
        // el: () => '#app',

        components: {navbar, sidebar},
        // 注意：顶级变量必须设置默认值方能引入 observer
        data () {
            return {
                userData: null
            }
        },
        events: {
            'query_score' (data){
                console.log(data)
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
    .wrapper {
        margin-left: 200px;
        padding: 1rem;
    }
</style>