<template>
    <form class="am-form am-form-horizontal">
        <legend>排考结果查询</legend>
        <fieldset>
            <div class="am-form-group">
                <label class="am-u-sm-2 am-form-label">学年学期</label>
                <div class="am-u-sm-10">
                    <select id="xnxqh" v-html="xnxq">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label class="am-u-sm-2 am-form-label">学期类别</label>
                <div class="am-u-sm-10">
                    <select id="xqlb" v-html="xqlb">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label class="am-u-sm-2 am-form-label">考试名称</label>
                <div class="am-u-sm-10">
                    <select id="kwmc" v-html="kwmc" multiple="multiple">
                    </select>
                </div>
            </div>
            <div class="am-form-group func">
                <button type="button" class="am-btn am-btn-success am-round" v-on:click="query">查询</button>
                <button type="button" class="am-btn am-btn-default am-round" v-on:click="reset">重置</button>
            </div>
        </fieldset>
    </form>
</template>
<style lang="less" src="./index.less" scoped></style>
<script src="./index.js"></script>
