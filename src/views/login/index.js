import CONFIG from '../../utils/config'
import filter from '../../filters/user'
export default{
    mounted: function () {
        let self = this
        this.$nextTick(function () {
        })
    },
    data(){
        return {
            ID: '1305030210',
            password: '206834',
            vcode: '',
            errorInfo: '',
            loadding_info: ''
        }
    },
    methods: {
        getVerify (){
            $(".verify_code img").attr("src", CONFIG.host + '/kdjw/verifycode.servlet?' + Math.random())
        },
        showVerify (){
            this.getVerify()
            this.vcode = ''
            this.loadding_info = ''
            $("#my-prompt").modal("open")
            $("#vcode").focus()
        },
        login (){
            let self = this
            self.errorInfo = ''
            self.loadding_info = "正在登陆...."
            $("#login_info").modal("open")
            this.$http.post('/kdjw/Logon.do?method=logon', {
                useDogCode: '',
                dlfl: 0,
                USERNAME: self.ID,
                PASSWORD: self.password,
                RANDOMCODE: self.vcode,
                x: 30,
                y: 4
            }).then((response) => {
                // 响应成功回调
                if (response._body !== null) {
                    let tr = $(response._dom).find(".login table tr")
                    if (tr.length === 7) {
                        self.errorInfo = $(tr).find("#errorinfo").html()
                        $("#login_info").modal("close")
                    }
                } else {
                    self.loadding_info = "正在进行SSO授权..."
                    self.sso_login()
                }
            }, (response)=> {
                $("#login_info").modal("close")
                self.errorInfo = "登陆失败，请重试"
            });
        },
        //sso授权
        sso_login (){
            let self = this
            this.$http.get('/kdjw/Logon.do?method=logonBySSO', {}).then((response) => {
                self.loadding_info = "正在获取用户信息..."
                self.getUserInfo()
            }, (response)=> {
                $("#login_info").modal("close")
                self.errorInfo = "SSO授权失败，请重新登录"
            })
        },
        //获取用户信息
        getUserInfo (){
            let self = this
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
                    $("#login_info").modal("close")
                    self.$router.push("/home")
                } catch (e) {
                    $("#login_info").modal("close")
                    self.errorInfo = "获取用户信息失败，请重新登陆"
                }
            })
        }
    }
}