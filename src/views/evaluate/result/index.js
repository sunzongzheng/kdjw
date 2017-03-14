import pagination from 'components/pagination.vue'
import appBreadcrumb from 'components/breadcrumb.vue'
import TABLE from 'filters/table'
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
    components: {pagination, appBreadcrumb},
    computed: {
        pageNum(){
            return Math.ceil(this.tbody.length / this.pageSize)
        },
        filterData(){
            return API.commonTb(this.thead, this.tbody, this.show_array, {
                curPage: this.curPage,
                pageSize: this.pageSize
            })
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
                let tb = TABLE.noInput(response._dom, "#tblHead tbody th", "#mxh tbody tr")
                self.thead = tb.thead
                self.tbody = self.tbody.concat(tb.tbody)
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