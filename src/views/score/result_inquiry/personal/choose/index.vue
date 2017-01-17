<template>
    <form class="am-form am-form-horizontal">
        <legend>学生成绩查询</legend>
        <fieldset>
            <div class="am-form-group">
                <label for="start" class="am-u-sm-2 am-form-label">开课时间</label>
                <div class="am-u-sm-10">
                    <select id="start" v-html="start">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label for="nature" class="am-u-sm-2 am-form-label">课程性质</label>
                <div class="am-u-sm-10">
                    <select id="nature" v-html="nature">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label for="name" class="am-u-sm-2 am-form-label">课程名称</label>
                <div class="am-u-sm-10">
                    <input type="text" id="name" v-model="kcmc">
                </div>
            </div>
            <div class="am-form-group">
                <label for="nature" class="am-u-sm-2 am-form-label">显示方式</label>
                <div class="am-u-sm-10">
                    <select id="mode" v-html="mode">
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
