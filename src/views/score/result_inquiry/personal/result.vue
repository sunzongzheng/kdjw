<template>
    <div class="result-panel">
        <breadcrumb :list="breadcrumb"></breadcrumb>
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
            width: 16rem;
        }
        th.term {
            width: 10rem;
        }
    }
</style>
<script type="text/ecmascript-6">
    import pagination from 'components/pagination.vue'
    import breadcrumb from 'components/breadcrumb.vue'
    import API from 'utils/api'
    import TABLE from 'filters/table'
    export default{
        created() {
            this.params = this.$store.state.score.inquiry_param
            this.query()
        },
        data(){
            return {
                breadcrumb: [
                    {
                        title: "查询选择",
                        url: "./choose"
                    },
                    {
                        title: "查询结果",
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
        components: {pagination, breadcrumb},
        computed: {
            show_array(){
                if (this.$store.state.isPC) {
                    return ["开课学期", "课程名称", "总成绩", "课程性质",
                        "课程类别", "学时", "学分", "考试性质"]
                } else {
                    return ["开课学期", "课程名称", "总成绩"]
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
                this.$http.get("/xszqcjglAction.do?method=queryxscj", {params: this.params}).then((response)=> {
                    let thead = TABLE.filter_th(response._dom, "#tblHeadDiv table tbody th")
                    let tbody = TABLE.filter_tr(response._dom, "#mxhDiv table tbody tr")
                    tbody.map((tr)=> {
                        if ($.inArray("重修", tr.entry) > -1)tr.type = "rebuilt"
                        else tr.type = "normal"
                        return tr
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
