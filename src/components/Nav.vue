<template>
    <header class="am-topbar am-topbar-inverse am-topbar-fixed-top"
            :class="{broad:!$store.state.sidebar_status,normal:$store.state.sidebar_status}"
            v-show="$route.path!='/login'">
        <h1 class="am-topbar-brand" v-if="!$store.state.sidebar_status">
            <a class="am-icon-navicon" @click="open"></a>
        </h1>
        <div class="am-topbar-right">
            <div class="am-dropdown" data-am-dropdown="{boundary: '.am-topbar'}">
                <img class="am-circle am-dropdown-toggle avatar" data-am-dropdown-toggle height="35" width="35"
                     :src="userInfo.avatar?(host+userInfo.avatar):''"/>
                <ul class="am-dropdown-content">
                    <li><a disabled>修改个人信息</a></li>
                    <li><a disabled>修改密码</a></li>
                    <li><a v-on:click="logout">退出</a></li>
                </ul>
            </div>
        </div>
    </header>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    header {
        background-color: #404040;
        border-color: #404040;
        margin-bottom: 0;
    }

    .am-topbar-brand {
        .am-icon-navicon {
            cursor: pointer;
        }
    }

    .am-topbar-right {
        .avatar {
            margin-top: 8px;
            @height: 35px;
            width: @height;
            height: @height;
            cursor: pointer;
        }
        .am-dropdown-content {
            a {
                cursor: pointer;
            }
        }
    }

    @media screen and(max-width: 767px) {
        .am-topbar-right {
            float: right;
            margin-right: 6px;
        }
    }
</style>
<script type="text/ecmascript-6">
    import CONFIG from '../utils/config'
    import filter from '../filters/user'
    export default{
        mounted: function () {
            let self = this
            this.$nextTick(function () {
                self.getUserInfo()
            })
        },
        data(){
            return {
                avatar: '',
                host: CONFIG.host
            }
        },
        computed: {
            userInfo(){
                return this.$store.state.user
            }
        },
        methods: {
            //获取用户信息
            getUserInfo (){
                let self = this
                layer.open({
                    content: "正在加载",
                    type: 2,
                    shadeClose: false
                })
                self.$http.get("/kdjw/xszhxxAction.do", {
                    params: {
                        method: "addStudentPic",
                        tktime: Date.parse(new Date())
                    }
                }).then((response)=> {
                    //已经登陆 则获取用户信息并跳转至Home
                    try {
                        //标题信息
                        let user = filter.getInfo(response._dom)
                        self.$store.commit('updateUser', user)
                        console.log(self.$route.path)
                        if (self.$route.path == "/login")self.$router.push("/home")
                        else layer.closeAll()
                    } catch (e) {
                        self.$router.push("/login")
                    }
                })
            },
            //注销
            logout (){
                let self = this
                this.$http.get("/kdjw/Logon.do", {
                    params: {
                        method: "logout"
                    }
                }).then((response)=> {
                    self.$router.push("/login")
                })
            },
            open(){
                console.log("open")
                this.$store.commit("toggleSidebar", true)
            }
        },
        components: {}
    }
</script>
