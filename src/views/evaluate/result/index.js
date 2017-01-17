import pagination from '../../../components/pagination.vue'
import breadcrumb from '../../../components/breadcrumb.vue'
export default{
    created() {
        let param = JSON.parse(JSON.stringify(this.$store.state.evaluate.inquiry_param))
        console.log(param)
        if (typeof param.xnxq === "undefined" || param.xnxq === ""
            || param.pjpc === ""
            || param.pjkc.length <= 0) {
            this.$router.push("./choose")
            return
        }
        let pjkc_array = JSON.parse(JSON.stringify(param.pjkc))
        for (let i in pjkc_array) {
            this.query($.extend(param, {
                pjkc: pjkc_array[i]
            }))
        }
    },
    data(){
        return {
            breadcrumb: [
                {
                    title: "查询条件",
                    url: "./choose"
                },
                {
                    title: "课程列表",
                    active: true
                }
            ],
            thead: [],
            tbody: [],
            show_array: ["课程名称", "授课教师", "总评分",
                "已评", "是否提交"],
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
            self.$http.post("/jxpjgl.do?method=queryJxpj&type=xs", params).then((response)=> {
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
                self.tbody = self.tbody.concat(tbody)
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
        },
        edit(index){
            let self = this
            let str = self.tbody[index].entry[11].match(/w\/jxpjgl.do.*?'/)[0]
            str = str.substring(1, str.length - 1).replace(/&amp;/g, "&")
            self.$store.commit("up", {
                url: str
            })
            self.$router.push("./edit")
        }
    }
}