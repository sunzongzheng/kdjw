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
            ID: '',
            password: '',
            vcode: '',
            errorInfo: '',
            loadding_info: '',
            first_ident: true
        }
    },
    methods: {
        //获取验证码
        getVerify (){
            $(".verify_code img").attr("src", CONFIG.host +
                (parseInt(this.ID.toString().charAt(2)) < 5 ? '/kdjw' : '/xxjw') + '/verifycode.servlet?' + Math.random())
        },
        //弹出验证码输入框
        showVerify (){
            this.vcode = ''
            this.getVerify()
            this.loadding_info = ''
            if (!this.first_ident) {
                $("#my-prompt").modal("open")
                $("#vcode").focus()
            } else {
                this.loadding_info = "正在识别验证码...."
                $("#login_info").modal("open")
            }
        },
        //验证码识别
        analysis_verify(){
            let image = document.querySelector(".verify_code img");
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext("2d");
            let arr = {
                "c": "000000000000000000000000000000000000000011110000000111111000001110011000001100000000001100000000001100000000001110011000000111110000000011110000",
                "b": "001100000000001100000000001100000000001101110000001111111000001110011100001100001100001100001100001100001100001110011100001111111000001101110000",
                "m": "000000000000000000000000000000000000001101110011001111111111001110011100001100011000001100011000001100011000001100011000001100011000001100011000",
                "n": "000000000000000000000000000000000000001101111000001111111100001110001100001100001100001100001100001100001100001100001100001100001100001100001100",
                "1": "000001100000000011100000000111100000001101100000001001100000000001100000000001100000000001100000000001100000000001100000000001100000000001100000",
                "3": "000111110000001111111000011000011000000000011000000011110000000011110000000000111000000000011000011000011000011100111000001111110000000111100000",
                "2": "000111100000001111110000011100011000011000011000000000011000000000110000000001110000000011100000000111000000001100000000011111111000011111111000",
                "v": "000000000000000000000000000000000000001100011000001100011000001100011000000110110000000110110000000110110000000011100000000011100000000011100000",
                "x": "000000000000000000000000000000000000001100011000001110111000000110110000000011100000000011100000000011100000000110110000001110111000001100011000",
                "z": "000000000000000000000000000000000000001111111000001111111000000000110000000001110000000011100000000111000000000110000000001111111000001111111000"
            }
            let threshold = 127 //rgb二值化边界值
            let answer = "";
            let info = {
                offsetWidth: 2,
                offsetHeight: 4,
                wordNum: 4,
                wordWidth: 12,
                wordHeight: 12,
                wordSpace: -2
            }

            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);//图片写入canvas

            for (let i = 0; i < info.wordNum; i++) {
                let beginX = info.offsetWidth + (info.wordWidth + info.wordSpace) * i,
                    beginY = info.offsetHeight,
                    endX = info.wordWidth,
                    endY = info.wordHeight
                //获取验证码单个字符的数据
                let singleData = ctx.getImageData(beginX, beginY, endX, endY).data
                //二值化字符串
                var bString = "";
                for (let j = 0; j < singleData.length; j += 4) {
                    bString += singleData[j] > threshold ? '0' : '1';
                }
                //获取最大匹配的字符
                let maxCommon = {
                    key: "c",
                    num: -1
                };
                Object.keys(arr).map(function (value) {
                    let commons = bString.split("").filter(function (v, index) {
                        return arr[value][index] === v
                    }).length
                    if (commons > maxCommon.num) {
                        maxCommon = {
                            key: value,
                            num: commons
                        }
                    }
                });
                answer += maxCommon.key
            }
            this.vcode = answer
            if (this.first_ident)this.login()
        },
        //登录
        login (){
            let self = this
            self.errorInfo = ''
            self.loadding_info = "正在登陆...."
            $("#my-prompt").modal("close")
            $("#login_info").modal("open")
            this.$http.post('/Logon.do?method=logon', {
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
                        if (self.errorInfo.includes("验证码"))self.first_ident = false
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
            this.$http.get('/Logon.do?method=logonBySSO', {}).then((response) => {
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
                    self.errorInfo = "获取用户信息失败，请重新登陆"
                }
            })
        }
    }
}