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
                            v-on:click="showVerify">登录
                    </button>
                </div>
            </div>
        </div>
        <div class="am-modal" tabindex="-1" id="my-prompt">
            <div class="am-modal-dialog">
                <div class="am-modal-hd">程序猿不敢保证验证码识别成功率
                    <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a></div>
                <div class="am-modal-bd">
                    检查一下把～
                    <div class="verify_code">
                        <input v-model="vcode" id="vcode" @keyup.13="login"/>
                        <img v-on:click="getVerify" alt="从教务获取验证码" @load="analysis_verify">
                    </div>
                </div>
                <div class="am-modal-footer">
                    <span class="am-modal-btn" v-on:click="login">提交</span>
                </div>
            </div>
        </div>
        <div class="am-modal" tabindex="-1" id="login_info">
            <div class="am-modal-dialog">
                <div class="am-modal-bd">
                    {{loadding_info}}
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="./index.less" scoped></style>
<script src="./index.js"></script>
