<template>
    <div class="result-panel">
        <app-breadcrumb :list="breadcrumb"></app-breadcrumb>
        <div id="table">
            <table class="am-table am-table-hover am-table-compact"
                   :class="{PC:$store.state.isPC}">
                <thead>
                <tr>
                    <th v-for="item in filterData.thead"
                        :class="{courseName:item=='课程名称',term:item=='开课学期'}">{{item}}
                    </th>
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
<style lang="less" rel="stylesheet/less" scoped>
    #table {
        width: 100%;
        overflow: auto;
        .am-table.PC {
            white-space: nowrap;
        }
        th.courseName {
            width: 10rem;
        }
    }
</style>
<script type="text/ecmascript-6">
    import pagination from 'components/pagination.vue'
    import appBreadcrumb from 'components/breadcrumb.vue'
    import API from 'utils/api'
    export default{
        created() {
            this.query()
        },
        data(){
            return {
                breadcrumb: [
                    {
                        title: "学生预警信息列表",
                        active: true
                    }
                ],
                thead: [],
                tbody: [],
                curPage: 1,
                pageNum: 1,
                pageSize: 15,
                params: {}
            }
        },
        components: {pagination, appBreadcrumb},
        computed: {
            show_array(){
                if (this.$store.state.isPC) {
                    return ["预警学期", "预警名称", "预警条件", "指标值", "实际值"]
                } else {
                    return ["预警名称", "预警条件", "指标值", "实际值"]
                }
            },
            filterData(){
                return API.commonTb(this.thead, this.tbody, this.show_array, {
                    curPage: this.curPage,
                    pageSize: this.pageSize
                })
            }
        },
        methods: {
            query(){
                let self = this
                layer.open({
                    content: "正在获取数据",
                    type: 2,
                    shadeClose: false
                })
                this.$http.get("/xjyj.do?method=goXsyjxx", {params: this.params}).then((response)=> {
                    let thead = []
                    let tbody = []
                    $(response._dom).find("#tblHeadDiv table tbody th").each(function (i) {
                        let th = $(this).find("font").eq(1).html()
                        if (typeof th !== "undefined")thead.push(th)
                    })
                    $(response._dom).find("#mxhDiv table tbody tr").each(function () {
                        let tr = {}
                        tr.entry = []
                        $(this).find("td").each(function (i) {
                            if ($(this).html().indexOf("input") > -1)return
                            tr.entry.push($(this).html().trim().replace("&nbsp;", ""))
                        })
                        tbody.push(tr)
                    })
                    self.thead = thead
                    self.tbody = tbody
                    //本部 前端分页
                    if (this.$store.state.user.cadres) {
                        self.pageNum = Math.ceil(self.tbody.length / self.pageSize)
                    } else {    //潇湘 后端分页
                        self.pageSize = parseInt($(response._dom).find("input[name='printPageSize']").val())
                        self.pageNum = parseInt($(response._dom).find("input[name='totalPages']").val())
                    }
                    layer.closeAll()
                })
            },
            next(){
                let self = this
                self.curPage++
                if (!self.$store.state.user.cadres) {
                    self.params = $.extend(self.params, {PageNum: self.curPage})
                    self.query()
                }
            },
            pre(){
                let self = this
                self.curPage--
                if (!self.$store.state.user.cadres) {
                    self.params = $.extend(self.params, {PageNum: self.curPage})
                    self.query()
                }
            },
            jump(page){
                let self = this
                this.curPage = page
                if (!self.$store.state.user.cadres) {
                    self.params = $.extend(self.params, {PageNum: self.curPage})
                    self.query()
                }
            }
        }
    }
</script>
