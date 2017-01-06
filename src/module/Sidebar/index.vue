<template>
    <ul class="siderbar">
        <sidebarItem v-for="item in list" :data.sync="item">
        </sidebarItem>
    </ul>
</template>
<style lang="less" src="./index.less" scoped></style>
<script>
    import sidebarItem from '../../components/SidebarItem.vue'
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
            open (){

            }
        }
    }
</script>
