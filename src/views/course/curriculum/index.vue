<template>
    <div class="curriculum">
        <div class="am-form-inline">
            <legend>课表查看</legend>
            <fieldset>
                <div class="am-form-group">
                    <label for="zc" class="am-form-label">周次</label>
                    <select id="zc" v-html="zc"></select>
                </div>
                <div class="am-form-group">
                    <label for="xnxqh" class="am-form-label">学期</label>
                    <select id="xnxqh" v-html="xnxqh"></select>
                </div>
                <button type="button" class="am-btn am-btn-xs am-btn-secondary" @click="getTable">查找</button>
                <div class="am-checkbox">
                    <label>
                        <input type="checkbox" v-model="showWeeks">
                        显示周次
                    </label>
                </div>
            </fieldset>
        </div>
        <table class="am-table am-table-bordered" v-html="table"></table>
    </div>
</template>
<style lang="less" scoped src="./index.less"></style>
<script src="./index.js"></script>