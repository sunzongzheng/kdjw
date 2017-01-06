<template>
    <ul class="score-inquiry-wrapper">
        <router-link tag="li" to="./choose">
            <a>
                <span class="am-danger am-icon-gg"></span>个人成绩查询
            </a>
        </router-link>
        <li>
            <a disabled>
                <span class="am-danger am-icon-gg"></span>平均学分绩点查询
            </a>
        </li>
    </ul>
</template>
<style lang="less" src="./index.less" scoped></style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {}
    }
</script>
