<template>
    <div class="result-panel">
        <breadcrumb :list="breadcrumb"></breadcrumb>
        <div id="table">
            <table class="am-table am-table-hover am-table-compact">
                <thead>
                <tr>
                    <th v-for="item in filterData.thead">{{item}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="tr in filterData.tbody" :class="{'am-danger':tr.type=='rebuilt'}">
                    <td v-for="td in tr.entry">{{td}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <pagination v-show="pageNum>1" :curPage="curPage" :pageNum="pageNum" :pageSize="pageSize"
                    v-on:next="next" v-on:pre="pre" v-on:jump="jump"></pagination>
    </div>
</template>
<style lang="less" src="./index.less" scoped></style>
<script src="./index.js"></script>
