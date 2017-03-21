<template>
    <div class="login-wrapper">
        <div class="main">
            <div class="am-alert am-alert-danger" data-am-alert v-show="errorInfo">
                <button type="button" class="am-close">&times;</button>
                <p>{{errorInfo}}</p>
            </div>
            <img class="animated flip" src="../../assets/image/vue-logo.png"/>
            <div class="am-form animated fadeIn login-panel">
                <div class="am-form-group">
                    <input type="number" id="doc-ipt-3" placeholder="学号" v-model="ID"
                           @keyup.13="showVerify"
                           v-focus>
                </div>

                <div class="am-form-group">
                    <input type="password" id="doc-ipt-pwd-2" placeholder="密码"
                           v-model="password"
                           @keyup.13="showVerify">
                </div>
                <div class="am-form-group">
                    <button type="submit" class="am-btn am-btn-success am-u-sm-12 animated rubberBand"
                            @click="isShowVerify=true">登录
                    </button>
                </div>
            </div>
        </div>
        <verify @login="login"
                :first_ident="first_ident"
                :isShowVerify="isShowVerify"
                :ID="ID"></verify>
        <info></info>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .login-wrapper {
        .main {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 1100;
            text-align: center;
            background: linear-gradient(#142848, #334a71);
            .am-alert {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                margin: 0;
                padding: 0;
                width: 100%;
                button {
                    margin-top: 0px;
                }
            }
            img {
                margin-top: 7%;
                width: 135px;
            }
            .login-panel {
                width: 205px;
                margin: 0 auto;
                margin-top: 25px;
                text-align: center;
                animation-delay: 0.5s;
                label {
                    color: white;
                }
            }
            button[type='submit'] {
                animation-delay: 0.75s;
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    import filter from '../../filters/user'
    import verify from './verify.vue'
    import info from './info.vue'
    export default{
        components: {verify, info},
        mounted(){
            this.$nextTick(()=> {
                this.$store.commit("updateLogin", {
                    info: '',
                    error: ''
                })
            })
        },
        data(){
            return {
                ID: '',
                password: '',
                first_ident: true,
                isShowVerify: false
            }
        },
        computed: {
            errorInfo(){
                return this.$store.state.login.error
            }
        },
        methods: {
            //登录
            login (v_code){
                let self = this
                console.log(v_code)
                self.$store.commit('updateLogin', {
                    info: "正在登陆....",
                    error: ''
                });
                $("#my-prompt").modal("close")
                this.$http.post('/Logon.do?method=logon', {
                    useDogCode: '',
                    dlfl: 0,
                    USERNAME: self.ID,
                    PASSWORD: self.password,
                    RANDOMCODE: v_code,
                    x: 30,
                    y: 4
                }).then((response) => {
                    // 响应成功回调
                    if (response._body !== null) {
                        let tr = $(response._dom).find(".login table tr")
                        if (tr.length === 7) {
                            self.errorInfo = $(tr).find("#errorinfo").html()
                            if (self.errorInfo.includes("验证码"))self.first_ident = false
                            $("#login_info").modal("close")
                        }
                    } else {
                        this.$store.commit("updateLogin", {
                            info: '正在进行SSO授权...'
                        })
                        self.sso_login()
                    }
                }, (response)=> {
                    $("#login_info").modal("close")
                    this.$store.commit("updateLogin", {
                        error: '登陆失败，请重试'
                    })
                });
            },
            //sso授权
            sso_login (){
                let self = this
                this.$http.get('/Logon.do?method=logonBySSO', {}).then((response) => {
                    this.$store.commit("updateLogin", {
                        info: '正在获取用户信息...'
                    })
                    self.getUserInfo()
                }, (response)=> {
                    $("#login_info").modal("close")
                    this.$store.commit("updateLogin", {
                        error: 'SSO授权失败，请重新登录'
                    })
                })
            },
            //获取用户信息
            getUserInfo (){
                let self = this
                self.$http.get("/xszhxxAction.do", {
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
                        $("#login_info").modal("close")
                        self.$router.push("/home")
                    } catch (e) {
                        $("#login_info").modal("close")
                        this.$store.commit("updateLogin", {
                            error: '获取用户信息失败，请重新登陆'
                        })
                    }
                })
            }
        }
    }
</script>
