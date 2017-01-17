import pagination from 'components/pagination.vue'
import breadcrumb from 'components/breadcrumb.vue'
export default{
    created() {
        let param = this.$store.state.exam.inquiry_param
        if (typeof param.xnxqh === "undefined") {
            this.$router.push("./arrange")
            return
        }
        this.query(param)
    },
    data(){
        return {
            breadcrumb: [
                {
                    title: "查询条件",
                    url: "./arrange"
                },
                {
                    title: "查询结果",
                    active: true
                }
            ],
            thead: [],
            tbody: [],
            show_array: ["考试场次", "课程名称", "起始时间", "结束时间", "考场"],
            curPage: 1,
            pageSize: 15
        }
    },
    components: {pagination, breadcrumb},
    computed: {
        pageNum(){
            return Math.ceil(this.tbody.length / this.pageSize)
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
            self.$http.post("/kwsjglAction.do?method=sosoXsFb", params).then((response)=> {
                let thead = []
                let tbody = []
                $(response._dom).find("#tblHead tbody th").each(function (i) {
                    let th = $(this).find("font").eq(1).html()
                    if (typeof th !== "undefined")thead.push(th)
                })
                $(response._dom).find("#mxh tbody tr").each(function () {
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
                console.log(tbody)
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