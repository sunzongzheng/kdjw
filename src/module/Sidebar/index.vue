<template>
    <aside :class="{broad:$store.state.sidebar_status,normal:!$store.state.sidebar_status}">
        <a class="am-icon-navicon" @click="close"></a>
        <ul class="siderbar">
            <sidebarItem v-for="item in list" :data.sync="item">
            </sidebarItem>
        </ul>
    </aside>
</template>
<style lang="less" src="./index.less" scoped></style>
<script type="text/ecmascript-6">
    import sidebarItem from 'components/SidebarItem.vue'
    import CONFIG from '../../utils/config'
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
