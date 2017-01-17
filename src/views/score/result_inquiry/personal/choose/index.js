export default{
    mounted: function () {
        let self = this
        this.$nextTick(function () {
            self.getData()
        })
    },
    data(){
        return {
            start: '',
            nature: '',
            mode: '',
            kcmc: ''
        }
    },
    methods: {
        getData (){
            let self = this
            layer.open({
                content: "正在请求数据...",
                type: 2,
                shadeClose: false
            })
            this.$http.get("/jiaowu/cjgl/xszq/query_xscj.jsp", {}).then((response)=> {
                self.start = $(response._dom).find("#search_values select").eq(0).html()
                self.nature = $(response._dom).find("#search_values select").eq(1).html()
                self.mode = $(response._dom).find("#search_values select").eq(2).html()
                layer.closeAll()
            })
        },
        query (){
            let self = this
            this.$store.commit("inquiry_score", {
                kksj: $("#start option:selected").val(),
                kcxz: $("#nature option:selected").val(),
                kcmc: self.kcmc,
                xsfs: $("#mode option:selected").val(),
                ok: ''
            })
            this.$router.push("./result")
        }
    }
}