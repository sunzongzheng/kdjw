import pagination from 'components/pagination.vue'
import API from 'utils/api'
import TABLE from 'filters/table'
export default{
    created() {
        this.query()
    },
    data(){
        return {
            thead: [],
            tbody: [],
            curPage: 1,
            pageNum: 1,
            pageSize: 15,
            params: {}
        }
    },
    components: {pagination},
    computed: {
        show_array(){
            if (this.$store.state.user.cadres) {
                if (this.$store.state.isPC) {
                    return ["开课学期", "修读性质", "课程性质", "课程类别", "课程编码", "课程名称",
                        "学分", "总学时", "课堂学时", "实践课时", "专题讲座", "周学时", "开课单位", "考核方式",
                        "是否学位课", "学时单位", "录成绩学期"]
                } else {
                    return ["开课学期", "课程名称", "考核方式", "是否学位课"]
                }
            } else {
                if (this.$store.state.isPC) {
                    return ["学期", "课程类别", "课程性质", "修读性质", "课程编码", "课程名称",
                        "考试方式", "学位课", "集中实践", "上课院系", "上课专业", "开课单位", "学分", "总学时",
                        "讲课学时", "实践学时", "讲座学时"]
                } else {
                    return ["学期", "课程名称", "考试方式", "学位课"]
                }
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
            this.$http.get("/xsdPyfa.do?method=toJxjh", {params: this.params}).then((response)=> {
                let tb = TABLE.normal(response._dom, "#tblHead tbody th", "#mxh tbody tr")
                self.thead = tb.thead
                self.tbody = tb.tbody
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