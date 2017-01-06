<template>
    <header class="am-topbar am-topbar-inverse am-topbar-fixed-top"
            v-show="$route.path!='/login'">
        <h1 class="am-topbar-brand">
            <a href="#">教务网 - 非IE解决方案</a>
        </h1>

        <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only"
                data-am-collapse="{target: '#doc-topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span
                class="am-icon-bars"></span></button>

        <div class="am-topbar-right">
            <div class="am-dropdown" data-am-dropdown="{boundary: '.am-topbar'}">
                <button class="am-btn am-btn-default am-topbar-btn am-btn-sm am-dropdown-toggle"
                        data-am-dropdown-toggle>其他 <span class="am-icon-caret-down"></span></button>
                <ul class="am-dropdown-content">
                    <li><a disabled>修改个人信息</a></li>
                    <li><a disabled>修改密码</a></li>
                    <li><a v-on:click="logout">退出</a></li>
                </ul>
            </div>
        </div>
    </header>
</template>
<style lang="less" scoped>
    header {
        background-color: #404040;
        border-color: #404040;
        margin-bottom: 0;
    }

    .am-dropdown-content {

    a {
        cursor: pointer;
    }

    }
</style>
<script>
    import CONFIG from '../utils/config'
    export default{
        mounted: function () {
            let self = this
            this.$nextTick(function () {
                //console.log(self.$route)
                if (self.$route.path != "/login" && $.AMUI.utils.cookie.get("kdjw_ID") === null) {
                    self.$router.push("/login")
                } else if (self.$route.path == "/login" && $.AMUI.utils.cookie.get("kdjw_ID") !== null) {
                    self.$router.push("/home")
                }
            })
        },
        data(){
            return {
                msg: 'hello vue'
            }
        },
        methods: {
            logout (){
                let self = this
                this.$http.get("/kdjw/Logon.do", {
                    params: {
                        method: "logout"
                    }
                }).then((response)=> {
                    self.$router.push("/login")
                })
            }
        },
        components: {}
    }
</script>
