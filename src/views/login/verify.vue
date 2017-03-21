<template>
    <div class="am-modal" tabindex="-1" id="my-prompt">
        <div class="am-modal-dialog">
            <div class="am-modal-hd">程序猿不敢保证验证码识别成功率
                <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a></div>
            <div class="am-modal-bd">
                检查一下把～
                <div class="verify_code">
                    <input v-model="vcode" id="vcode" @keyup.13="login"/>
                    <img @click="getVerify" alt="从教务获取验证码" @load="analysis_verify">
                </div>
            </div>
            <div class="am-modal-footer">
                <span class="am-modal-btn" @click="login">提交</span>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .am-modal {
        .am-modal-dialog {
            width: 300px;
            .verify_code {
                margin: 10px auto;
                input, img {
                    height: 24px;
                }
                input {
                    width: 100px;
                }
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    import CONFIG from 'utils/config'
    export default{
        props: ['first_ident', 'isShowVerify', 'ID'],
        data(){
            return {
                vcode: ''
            }
        },
        watch: {
            isShowVerify(val){
                if (val) {
                    this.showVerify();
                }
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
                this.$store.commit("updateLogin", {
                    info: ''
                });
                if (!this.first_ident) {
                    $("#my-prompt").modal("open")
                    $("#vcode").focus()
                } else {
                    this.$store.commit("updateLogin", {
                        info: '正在识别验证码...'
                    });
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
            login(){
                this.$emit('login', this.vcode);
            }
        }
    }
</script>
