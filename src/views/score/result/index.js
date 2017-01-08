import pagination from '../../../components/pagination.vue'
import breadcrumb from '../../../components/breadcrumb.vue'
export default{
    created() {
        let param = this.$store.state.score.inquiry_param
        this.query(param)
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
            pageSize: 15
        }
    },
    components: {pagination, breadcrumb},
    computed: {
        pageNum(){
            return Math.ceil(this.tbody.length / this.pageSize)
        },
        show_array(){
            if (this.$store.state.isPC) {
                return ["开课学期", "课程名称", "总成绩", "课程性质",
                    "课程类别", "学时", "学分", "考试性质"]
            } else {
                return ["开课学期", "课程名称", "总成绩", "考试性质"]
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
            //学期倒序
            answer.tbody.sort(function (a, b) {
                if (a.entry[0] > b.entry[0])return -1
                else if (a.entry[0] == b.entry[0])return 0
                else return 1
            })
            //分页
            answer.tbody = answer.tbody.slice((self.curPage - 1) * self.pageSize, self.curPage * self.pageSize)
            return answer
        }
    },
    methods: {
        query(params){
            let self = this
            layer.open({
                content: "正在获取数据",
                type: 2,
                shadeClose: false
            })
            this.$http.get("/kdjw/xszqcjglAction.do?method=queryxscj", {params}).then((response)=> {
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
                layer.closeAll()
            })
        },
        next(){
            this.curPage++
        },
        pre(){
            this.curPage--
        },
        jump(page){
            this.curPage = page
        }
    }
}