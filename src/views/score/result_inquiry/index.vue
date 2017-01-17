<template>
    <ul class="score-inquiry-wrapper">
        <router-link tag="li" to="./personal/choose">
            <a>
                <span class="am-danger am-icon-gg"></span>个人成绩查询
            </a>
        </router-link>
        <router-link tag="li" to="./average/choose">
            <a>
                <span class="am-danger am-icon-gg"></span>平均学分绩点查询
            </a>
        </router-link>
    </ul>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .score-inquiry-wrapper {
        list-style: none;
        li {
            margin: 2rem;
            a {
                color: #586165;
            }
        }
    }
</style>
