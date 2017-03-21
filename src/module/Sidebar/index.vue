<template>
    <aside :class="{broad:$store.state.sidebar_status,normal:!$store.state.sidebar_status}">
        <a class="am-icon-navicon" @click="close"></a>
        <ul class="siderbar">
            <sidebarItem v-for="item in list" :data.sync="item">
            </sidebarItem>
        </ul>
    </aside>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    aside {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1001;
        background: url(../../assets/image/tumblr_static_sidebar.jpg) center no-repeat #333333;
        background-size: cover;
        width: 200px;
        height: 100%;
        transition: width 0.5s;
        overflow-x: hidden;;
        .am-icon-navicon {
            display: block;
            height: 50px;
            font-size: 1.8rem;
            padding-left: 12px;
            line-height: 50px;
            color: #dddddd;
            cursor: pointer;
        }
        .siderbar {
            color: #dddddd;
            margin-top: 0;
            list-style: none;
            padding-left: 0;
            overflow-y: auto;
            width: 200px;
        }
    }

    ::-webkit-scrollbar {
        width: 0px;
    }

    aside.broad {
        width: 200px;
    }

    aside.normal {
        width: 0;
    }
</style>
<script type="text/ecmascript-6">
    import sidebarItem from 'components/SidebarItem.vue'
    import CONFIG from 'utils/config'
    export default{
        mounted: function () {
            this.$nextTick(function () {
            })
        },
        components: {sidebarItem},
        data(){
            return {
                isopen: false,
                list: CONFIG.sidebar
            }
        },
        methods: {
            close (){
                this.$store.commit("toggleSidebar", false)
            }
        }
    }
</script>
