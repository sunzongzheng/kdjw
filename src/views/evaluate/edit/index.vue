<template>
    <div class="result-panel">
        <breadcrumb :list="breadcrumb"></breadcrumb>
        <div id="table">
            <table class="am-table am-table-hover am-table-compact">
                <tbody v-html="tbody"></tbody>
            </table>
            <div class="func">
                <button class="am-btn" @click="choose(80)">80分</button>
                <button class="am-btn am-btn-secondary" @click="validate">提交</button>
                <button class="am-btn" @click="choose(90)">90分</button>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="./index.less" scoped></style>
<script src="./index.js"></script>
