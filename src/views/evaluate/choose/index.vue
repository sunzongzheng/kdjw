<template>
    <form class="am-form am-form-horizontal">
        <legend>教学评价查询</legend>
        <fieldset>
            <div class="am-form-group">
                <label for="xnxq" class="am-u-sm-2 am-form-label">学年学期</label>
                <div class="am-u-sm-10">
                    <select id="xnxq" v-html="xnxq">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label for="pjpc" class="am-u-sm-2 am-form-label">评价批次名称</label>
                <div class="am-u-sm-10">
                    <select id="pjpc" v-html="pjpc">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label for="pjkc" class="am-u-sm-2 am-form-label">评价批次名称</label>
                <div class="am-u-sm-10">
                    <select id="pjkc" v-html="pjkc">
                    </select>
                </div>
            </div>
            <div class="am-form-group func">
                <button type="button" class="am-btn am-btn-success am-round" v-on:click="query">查询</button>
            </div>
        </fieldset>
    </form>
</template>
<style lang="less" src="./index.less" scoped></style>
<script src="./index.js"></script>
