import pagination from 'components/pagination.vue'
import breadcrumb from 'components/breadcrumb.vue'
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
            let self = this
            let answer = {
                thead: [],
                tbody: []
            }
            let thead_map = []
            self.thead.map(function (th, i) {
                if ($.inArray(th, self.show_array) > -1) {
                    answer.thead.push(th)
                    self.tbody.map(function (tr, j) {
                        if (typeof(answer.tbody[j]) !== "object") {
                            answer.tbody[j] = {
                                entry: []
                            }
                        }
                        answer.tbody[j].entry.push(tr.entry[i])
                        answer.tbody[j].type = tr.type
                    })
                }
            })
            if (self.$store.state.user.cadres) {
                //学期倒序
                answer.tbody.sort(function (a, b) {
                    if (a.entry[0] > b.entry[0])return -1
                    else if (a.entry[0] == b.entry[0])return 0
                    else return 1
                })
                //分页
                answer.tbody = answer.tbody.slice((self.curPage - 1) * self.pageSize, self.curPage * self.pageSize)
            }
            return answer
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
                    if ($.inArray("重修", tr.entry) > -1)tr.type = "rebuilt"
                    else tr.type = "normal"
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